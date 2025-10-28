import React, { useState, useContext } from 'react';
import { loginUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      if (!data.token) throw new Error(data.message || 'Login failed');
      login({ token: data.token, user: data.user || { name: data.name, email: data.email } });
      navigate('/explore');
    } catch (err) {
      alert(err.message || 'Login error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} className="p-2 border rounded" placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="p-2 border rounded" placeholder="Password" />
        <button className="mt-2 px-4 py-2 bg-sky-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}
