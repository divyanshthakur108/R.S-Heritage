import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('rs_heritage_token');
    const storedUser = localStorage.getItem('rs_heritage_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse stored user session:', err);
        localStorage.removeItem('rs_heritage_token');
        localStorage.removeItem('rs_heritage_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${baseUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('rs_heritage_token', data.token);
        localStorage.setItem('rs_heritage_user', JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Authentication failed' };
      }
    } catch (err) {
      console.error('Login request error:', err);
      return { success: false, error: 'Server unreachable. Please check backend.' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('rs_heritage_token');
    localStorage.removeItem('rs_heritage_user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
