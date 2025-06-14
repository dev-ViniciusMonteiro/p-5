import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return React.createElement(Navigate, { to: "/", replace: true });
  }
  
  return children;
};

export default PrivateRoute;