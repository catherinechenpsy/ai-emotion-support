'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sql } from '@/lib/supabase';
import LikertScale from '@/components/LikertScale';
import { aiAttitude, individualPreference } from '@/lib/scales';

export default function Baseline() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const submit = async () => {
    const pid = localStorage.getItem('pid');
    await sql`
      UPDATE participants
      SET ai_attitude = ${JSON.stringify(aiAttitude.map(q => answers[q]))},
          individual_preference = ${JSON.stringify(individualPreference.map(q => answers[q]))}
      WHERE id = ${pid}
    `;
    router.push('/emotion-induction');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">基线问卷</h1>
      {[...aiAttitude, ...individualPreference].map(q => (
        <LikertScale key={q} question={q} value={answers[q]} onChange={(v) => setAnswers({ ...answers, [q]: v })} />
      ))}
      <button onClick={submit} className="bg-blue-600 text-white px-6 py-3 rounded-xl">继续</button>
    </div>
  );
}
