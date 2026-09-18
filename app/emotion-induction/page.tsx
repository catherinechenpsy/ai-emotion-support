'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sql } from '@/lib/supabase';
import { emotionInduction, crisisKeywords } from '@/lib/materials';
import LikertScale from '@/components/LikertScale';
import { panasNegative } from '@/lib/scales';

export default function EmotionInduction() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const submit = async () => {
    if (crisisKeywords.some(k => text.includes(k))) {
      router.push('/crisis');
      return;
    }
    const pid = localStorage.getItem('pid');
    await sql`
      INSERT INTO events (participant_id, event_type, payload)
      VALUES (${pid}, 'induction', ${JSON.stringify({ text })})
    `;
    await sql`
      INSERT INTO responses (participant_id, panas_pre)
      VALUES (${pid}, ${JSON.stringify(panasNegative.map(q => answers[q]))})
    `;
    router.push('/support');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">请阅读并回忆</h1>
      <div className="bg-white rounded-2xl shadow p-6 whitespace-pre-wrap">{emotionInduction.socialRejection}</div>
      <textarea className="w-full border rounded-xl p-4 h-40" value={text} onChange={(e) => setText(e.target.value)} placeholder="请写下你当时的感受和想法" />
      <h2 className="font-medium">请评估你当前的情绪</h2>
      {panasNegative.map(q => (
        <LikertScale key={q} question={q} value={answers[q]} onChange={(v) => setAnswers({ ...answers, [q]: v })} />
      ))}
      <button onClick={submit} className="bg-blue-600 text-white px-6 py-3 rounded-xl">继续</button>
    </div>
  );
}