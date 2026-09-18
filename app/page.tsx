'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sql } from '@/lib/supabase';
import { assignStudy1, assignStudy2 } from '@/lib/randomize';

export default function Home() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [study, setStudy] = useState<1 | 2>(1);

  const start = async () => {
    const cond = study === 1 ? assignStudy1() : assignStudy2();
    const result = await sql`
      INSERT INTO participants (condition)
      VALUES (${JSON.stringify(cond)})
      RETURNING id
    `;
    localStorage.setItem('pid', result.rows[0].id);
    localStorage.setItem('condition', JSON.stringify(cond));
    router.push('/baseline');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">AI情绪支持研究</h1>
      <div className="bg-white rounded-2xl shadow p-6 space-y-4 text-sm leading-relaxed">
        <p>感谢你参与本研究。本研究旨在了解AI提供情绪支持时的回应顺序效果。</p>
        <p>你将会阅读一段负性情境，并接受来自AI或真人心理咨询师的回应。所有回应文本均由大语言模型生成并标准化。</p>
        <p>你的数据将匿名保存，仅用于学术研究。你可随时退出。</p>
        <p>如果你感到不适，可立即停止，并联系华东师大心理咨询中心：021-62233062。</p>
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
        我已阅读并同意参与本研究
      </label>
      <div className="flex gap-4">
        <button onClick={() => setStudy(1)} className={`px-4 py-2 rounded ${study === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>研究一</button>
        <button onClick={() => setStudy(2)} className={`px-4 py-2 rounded ${study === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>研究二</button>
      </div>
      <button disabled={!agreed} onClick={start} className="bg-blue-600 text-white px-6 py-3 rounded-xl disabled:opacity-50">
        开始实验
      </button>
    </div>
  );
}
