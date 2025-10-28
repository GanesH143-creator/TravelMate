import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';

export default function Favorites() {
  const [favCountries, setFavCountries] = useState([]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavCountries(ids);
  }, []);

  const removeFavorite = (name) => {
    const updated = favCountries.filter(c => (c.name?.common || c.name) !== name);
    setFavCountries(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
      {favCountries.length === 0 ? (
        <div className="text-gray-500">No favorites yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favCountries.map(c => (
            <div key={c.cca3 || c.name} className="bg-white p-4 rounded shadow">
              <img src={c.flags?.png || (c.flags && c.flags.png) } alt={c.name?.common || c.name} className="h-40 w-full object-cover rounded mb-3"/>
              <h3 className="font-semibold">{c.name?.common || c.name}</h3>
              <div className="mt-2 flex justify-between">
                <a href={`/country/${encodeURIComponent(c.name?.common || c.name)}`} className="text-blue-500">View</a>
                <button onClick={() => removeFavorite(c.name?.common || c.name)} className="text-red-500">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
