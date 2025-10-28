import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountryByName, fetchCountryImages, proxyWeather, saveFavorites } from '../api/api';
import WeatherBox from '../components/WeatherBox';
import FactWidget from '../components/FactWidget';
import Toast from '../components/Toast';
import { AuthContext } from '../context/AuthContext';

export default function CountryDetails() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [images, setImages] = useState([]);
  const [weather, setWeather] = useState(null);
  const [showAdd, setShowAdd] = useState(false); // hidden button toggled by touch
  const [toast, setToast] = useState({ show: false, message: '' });
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    const load = async () => {
      try {
        const c = await fetchCountryByName(name);
        setCountry(c);

        try {
          const imgs = await fetchCountryImages(name);
          // normalize: Unsplash response may be results array or simple array
          if (Array.isArray(imgs)) setImages(imgs);
          else if (imgs?.results) setImages(imgs.results);
          else setImages([]);
        } catch (err) {
          console.warn('images', err);
          setImages([]);
        }

        // weather: use capital if present
        const city = c.capital ? (Array.isArray(c.capital) ? c.capital[0] : c.capital) : name;
        try {
          const w = await proxyWeather(city);
          setWeather(w);
        } catch (err) {
          console.warn('weather', err);
          setWeather(null);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    load();
  }, [name]);

  // touch/click handler to reveal the hidden add button
  const handleRevealAdd = () => setShowAdd(true);

  // add to favorites logic
  const addToFavorites = async () => {
    // compose minimal country save object for localStorage
    const payload = {
      name: country.name?.common || country.name,
      flags: country.flags || { png: country.flag },
      cca3: country.cca3 || (country.cca2 || country.name).toUpperCase().slice(0,3)
    };

    const existing = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = existing.some(f => (f.name?.common || f.name) === payload.name || f.cca3 === payload.cca3);
    if (exists) {
      setToast({ show: true, message: 'Already in favorites' });
      return;
    }
    const updated = [ ...existing, payload ];
    localStorage.setItem('favorites', JSON.stringify(updated));

    // if user logged in, also persist to backend favorites (token required)
    if (token) {
      try {
        // backend expects an array of cca3 codes in /user/favorites route earlier
        const favCodes = updated.map(f => f.cca3);
        await saveFavorites(token, favCodes);
      } catch (err) {
        console.warn('save favorites to backend failed', err);
      }
    }

    setToast({ show: true, message: 'Added to favorites' });
  };

  if (!country) return <div className="p-6">Loading...</div>;

  const displayName = country.name?.common || country.name;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div onClick={handleRevealAdd} className="cursor-pointer">
            <img src={country.flags?.svg || country.flag || (country.flags && country.flags.png)} alt={displayName} className="w-full h-64 object-cover rounded" />
            <h2 className="text-3xl font-bold mt-4">{displayName}</h2>
            <p className="text-gray-600 mt-1">{country.region} — {country.subregion}</p>

            <div className="mt-4 bg-white p-4 rounded shadow">
              <h3 className="font-semibold">Info</h3>
              <p>Capital: {country.capital?.[0] || country.capital || '—'}</p>
              <p>Population: {country.population?.toLocaleString?.() || country.population || '—'}</p>
              <p>Languages: {country.languages ? (Array.isArray(country.languages) ? country.languages.join(', ') : Object.values(country.languages).join(', ')) : '—'}</p>
              <p>Currencies: {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : '—'}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Attractions & Photos</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {images && images.length ? images.slice(0,6).map((img, i) => (
                <img key={i} src={img.urls ? img.urls.small : (img || img.small || img.src)} alt="" className="h-40 w-full object-cover rounded" />
              )) : <div className="text-gray-500">No images found.</div>}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Facts</h3>
            <div className="mt-3">
              <FactWidget />
            </div>
          </div>

          {/* Hidden add button revealed after touch/click on the main area */}
          {showAdd && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
              <button onClick={addToFavorites} className="px-5 py-3 bg-yellow-400 rounded-full font-semibold shadow-lg hover:scale-105 transition transform">
                ❤️ Add to Favorites
              </button>
            </div>
          )}
        </div>

        <aside>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">Weather</h4>
            <div className="mt-2">
              <WeatherBox city={country.capital?.[0] || country.capital || country.name?.common || name} />
            </div>
          </div>

          <div className="mt-4 bg-white p-4 rounded shadow">
            <h4 className="font-semibold">Quick actions</h4>
            <div className="mt-2 flex flex-col gap-2">
              <button className="px-3 py-2 bg-sky-600 text-white rounded">Book</button>
              <button className="px-3 py-2 border rounded" onClick={() => setShowAdd(true)}>Show Add Favorite</button>
            </div>
          </div>
        </aside>
      </div>

      <Toast show={toast.show} onClose={() => setToast(s => ({ ...s, show: false }))} message={toast.message} />
    </div>
  );
}
