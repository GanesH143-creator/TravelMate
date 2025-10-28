import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <img
          src="/images/logo.jpeg"
          alt="TravelMate Logo"
          className="w-10 h-10 rounded-full shadow-md"
        />
        <h1 className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-orange-400">
          TravelMate
        </h1>
      </div>

      {/* Search Bar + Favorites */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search countries..."
          className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
          Favorites
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
