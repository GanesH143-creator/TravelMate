import React, { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('tm_user');
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('tm_token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('tm_token', token);
    else localStorage.removeItem('tm_token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('tm_user', JSON.stringify(user));
    else localStorage.removeItem('tm_user');
  }, [user]);

  const login = (payload) => {
    setToken(payload.token);
    setUser(payload.user);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('favorites');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
