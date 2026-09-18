'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sql } from '@/lib/supabase';
import { supportTexts } from '@/lib/materials';

export default function Support() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [text, setText] = useState('');
  const [label, setLabel] = useState('');
  const [condition, setCondition] = useState<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('condition');
    if (stored) setCondition(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!condition) return;
    const pid = localStorage.getItem('pid');
    if (condition.study === 1) {
      const source = step === 0 ? condition.firstSource : condition.secondSource;
      const strategy = condition.strategy;
      const role = 'COMPANION';
      setLabel(source === 'AI' ? '以下回应来自人工智能助手' : '以下回应来自人类心理咨询师');
      setText(supportTexts[source][role][strategy] || '');
      sql`INSERT INTO events (participant_id, event_type, payload) VALUES (${pid}, 'support', ${JSON.stringify({ step, source, strategy })})`;
    } else {
      const { role, order, source } = condition;
      setLabel(source === 'AI' ? `以下回应来自人工智能助手（角色：${role === 'COMPANION' ? '亲密陪伴型伙伴' : '问题解决型顾问'}）` : '以下回应来自人类咨询师');
      setText(supportTexts[source][role][order] || '');
      sql`INSERT INTO events (participant_id, event_type, payload) VALUES (${pid}, 'support', ${JSON.stringify({ role, order })})`;
    }
  }, [step, condition]);

  const next = () => {
    if (condition && condition.study === 1 && step === 0) {
      setStep(1);
    } else {
      router.push('/post-test');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="bg-white rounded-2xl shadow p-6 text-lg leading-relaxed whitespace-pre-wrap">{text}</div>
      <button onClick={next} className="bg-blue-600 text-white px-6 py-3 rounded-xl">继续</button>
    </div>
  );
}
