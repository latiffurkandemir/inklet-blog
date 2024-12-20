import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const expiredToken = setTimeout(() => {
      localStorage.removeItem('token');
    }, 86400000);

    return clearTimeout(expiredToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
