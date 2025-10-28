import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Auth
export const registerUser = (payload) => axios.post(`${BASE}/auth/register`, payload).then(r => r.data);
export const loginUser = (payload) => axios.post(`${BASE}/auth/login`, payload).then(r => r.data);

// Countries via backend
export const fetchAllCountries = () => axios.get(`${BASE}/countries`).then(r => r.data);
export const fetchCountryByName = (name) => axios.get(`${BASE}/countries/${encodeURIComponent(name)}`).then(r => r.data);
export const fetchCountryImages = (name) => axios.get(`${BASE}/countries/images/${encodeURIComponent(name)}`).then(r => r.data);

// Facts
export const fetchFactOfDay = () => axios.get(`${BASE}/facts/day`).then(r => r.data);
export const fetchRandomFacts = (limit = 5) => axios.get(`${BASE}/facts?limit=${limit}`).then(r => r.data);
export const fetchFactsByCountry = (cca3) => axios.get(`${BASE}/facts/country/${cca3}`).then(r => r.data);

// Proxy images & weather (alternative)
export const proxyImages = (q) => axios.get(`${BASE}/proxy/images?q=${encodeURIComponent(q)}`).then(r => r.data);
export const proxyWeather = (city) => axios.get(`${BASE}/proxy/weather?city=${encodeURIComponent(city)}`).then(r => r.data);

// User profile/favorites
export const saveFavorites = (token, favorites) => axios.put(`${BASE}/user/favorites`, { favorites }, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
export const getMe = (token) => axios.get(`${BASE}/user/me`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
