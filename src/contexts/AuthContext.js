import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar se há um token no localStorage ao iniciar
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { isAuthenticated, setAuthenticated, logout } },
    children
  );
};

export const useAuth = () => useContext(AuthContext);