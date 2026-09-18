'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sql } from '@/lib/supabase';
import LikertScale from '@/components/LikertScale';
import { panasNegative, supportEffectiveness, liking, matching, beliefConsistency, manipulationCheck } from '@/lib/scales';

export default function PostTest() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [likingScore, setLikingScore] = useState<number>();

  const submit = async () => {
    const pid = localStorage.getItem('pid');
    await sql`
      INSERT INTO responses (participant_id, panas_post, support_effectiveness, liking, matching, belief_consistency, manipulation_check)
      VALUES (
        ${pid},
        ${JSON.stringify(panasNegative.map(q => answers[q]))},
        ${JSON.stringify(supportEffectiveness.map(q => answers[q]))},
        ${JSON.stringify([likingScore])},
        ${JSON.stringify(matching.map(q => answers[q]))},
        ${JSON.stringify(beliefConsistency.map(q => answers[q]))},
        ${JSON.stringify(manipulationCheck.map(q => answers[q]))}
      )
    `;
    router.push('/crisis');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">请根据你的真实感受作答</h1>
      <h2 className="font-medium">当前情绪</h2>
      {panasNegative.map(q => (
        <LikertScale key={q} question={q} value={answers[q]} onChange={(v) => setAnswers({ ...answers, [q]: v })} />
      ))}
      <h2 className="font-medium">支持评价</h2>
      {supportEffectiveness.map(q => (
        <LikertScale key={q} question={q} value={answers[q]} onChange={(v) => setAnswers({ ...answers, [q]: v })} />
      ))}
      <LikertScale question={liking[0]} value={likingScore} onChange={setLikingScore} />
      <h2 className="font-medium">匹配感</h2>
      {matching.map(q => (
        <LikertScale key={q} question={q} value={answers[q]} onChange={(v) => setAnswers({ ...answers, [q]: v })} />
      ))}
      <h2 className="font-medium">信念一致性</h2>
      {beliefConsistency.map(q => (
        <LikertScale key={q} question={q} value={answers[q]} onChange={(v) => setAnswers({ ...answers, [q]: v })} />
      ))}
      <h2 className="font-medium">操纵检验</h2>
      {manipulationCheck.map(q => (
        <LikertScale key={q} question={q} value={answers[q]} onChange={(v) => setAnswers({ ...answers, [q]: v })} />
      ))}
      <button onClick={submit} className="bg-blue-600 text-white px-6 py-3 rounded-xl">提交</button>
    </div>
  );
}