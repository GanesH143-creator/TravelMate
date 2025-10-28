import React, { useState, useContext } from 'react';
import { registerUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ name, email, password, country });
      if (!data.token) throw new Error(data.message || 'Register failed');
      login({ token: data.token, user: data.user || { name: data.name, email: data.email } });
      navigate('/explore');
    } catch (err) {
      alert(err.message || 'Register error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded" placeholder="Name" />
        <input value={email} onChange={e=>setEmail(e.target.value)} className="p-2 border rounded" placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="p-2 border rounded" placeholder="Password" />
        <input value={country} onChange={e=>setCountry(e.target.value)} className="p-2 border rounded" placeholder="Country you belong to" />
        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Register</button>
      </form>
    </div>
  );
}
