'use client';

export default function LikertScale({
  question, value, onChange, min = 1, max = 7,
}: {
  question: string; value?: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">{question}</div>
      <div className="flex gap-2">
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`w-10 h-10 rounded-lg border ${value === v ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}