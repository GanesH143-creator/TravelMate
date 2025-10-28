import React, { useEffect, useState } from 'react';
import { fetchRandomFacts } from '../api/api';

export default function FactCarousel({ limit = 4 }) {
  const [facts, setFacts] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const f = await fetchRandomFacts(limit);
        setFacts(f);
      } catch (err) {
        console.warn(err);
      }
    };
    load();
  }, [limit]);

  if (!facts.length) return null;
  const f = facts[idx];

  return (
    <div className="my-6">
      <div className="bg-white p-4 rounded shadow flex items-center gap-4">
        <div className="text-2xl">💡</div>
        <div className="flex-1">
          <div className="text-sm text-gray-500">{f.country}</div>
          <div className="font-semibold">{f.fact}</div>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => setIdx(i => (i - 1 + facts.length) % facts.length)} className="p-1">◀</button>
          <button onClick={() => setIdx(i => (i + 1) % facts.length)} className="p-1">▶</button>
        </div>
      </div>
    </div>
  );
}
