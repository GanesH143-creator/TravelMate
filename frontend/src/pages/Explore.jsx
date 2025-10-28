import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryCard from '../components/CountryCard';
import FactWidget from '../components/FactWidget';

export default function Explore() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/countries`);
        setCountries(res.data);
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <h2 className="text-3xl font-semibold mb-4">Discover</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {countries.map(c => <CountryCard key={c.cca3 || c.name.common || c.name} country={c} />)}
          </div>
        </div>
        <aside>
          <FactWidget />
        </aside>
      </div>
    </div>
  );
}
