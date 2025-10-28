import React, { useEffect, useState } from 'react';
import { fetchFactOfDay } from '../api/api';

export default function FactWidget() {
  const [fact, setFact] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const f = await fetchFactOfDay();
        setFact(f);
      } catch (err) {
        console.warn(err);
      }
    };
    load();
  }, []);

  if (!fact) return null;

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <div className="text-sm text-gray-500">💡 Fact of the Day</div>
      <div className="font-medium mt-2">{fact.fact}</div>
      <div className="mt-2 text-xs text-slate-500">— {fact.country}</div>
    </div>
  );
}
