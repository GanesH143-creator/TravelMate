import React from 'react';

export default function Hero() {
  return (
    <div className="py-16 bg-gradient-to-r from-sky-100 to-indigo-50">
      <div className="max-w-5xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Explore the world, one country at a time 🌍</h1>
        <p className="mt-3 text-gray-700">TravelMate is a travel discovery web app that allows users to explore countries, learn about their culture, and view beautiful destination images — all in one simple dashboard.</p>
        <div className="mt-6">
          <a href="/explore" className="px-6 py-3 bg-gradient-to-r from-teal-500 to-orange-400 text-white rounded-lg shadow">Discover</a>
        </div>
      </div>
    </div>
  );
}
