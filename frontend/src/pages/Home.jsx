import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import CountryCard from '../components/CountryCard';
import FactCarousel from '../components/FactCarousel';
import { fetchAllCountries } from '../api/api';

export default function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(Array.isArray(data) ? data.sort((a,b)=> (a.name?.common || a.name).localeCompare(b.name?.common || b.name)) : []);
      } catch (err) {
        console.warn(err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <Hero />
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Discover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {countries.slice(0,9).map(c => <CountryCard key={c.cca3 || c.name.common || c.name} country={c} />)}
        </div>

        <FactCarousel limit={4} />

        <h2 className="text-2xl font-semibold mt-8 mb-4">Popular spots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {countries.slice(9,18).map(c => <CountryCard key={c.cca3 || c.name.common || c.name} country={c} />)}
        </div>
      </div>
    </div>
  );
}
