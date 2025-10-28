import React, { useEffect, useState } from 'react';
import { proxyWeather } from '../api/api';

export default function WeatherBox({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;
    const load = async () => {
      try {
        const res = await proxyWeather(city);
        // res is OpenWeather response object
        setWeather(res);
      } catch (err) {
        console.warn('weather err', err);
      }
    };
    load();
  }, [city]);

  if (!weather) return <div className="text-gray-500 mt-2">No weather data</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Weather in {city}</div>
          <div className="text-xl font-semibold">{Math.round(weather.main?.temp)}°C</div>
          <div className="text-sm text-gray-600">{weather.weather?.[0]?.description}</div>
        </div>
        {weather.weather?.[0]?.icon && (
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" className="w-20 h-20"/>
        )}
      </div>
    </div>
  );
}
