import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CountryCard({ country }) {
  const navigate = useNavigate();
  const name = country.name?.common || country.name || country;
  const flag = country.flags?.png || country.flag || '';

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
      <img src={flag} alt={name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-600">{country.capital ? `Capital: ${country.capital[0] || country.capital}` : 'Capital: —'}</p>
        <div className="mt-3 flex gap-2">
          <button onClick={() => navigate(`/country/${encodeURIComponent(name)}`)} className="px-3 py-1 border rounded">Explore</button>
        </div>
      </div>
    </div>
  );
}
