import React from 'react';
import './styles.css';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../services/routes';

const TopBar = ({ logoSrc }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return React.createElement(
    'div',
    { className: 'topbar' },
    React.createElement(
      'div',
      { className: 'logo-container' },
      React.createElement('img', { src: logoSrc, alt: 'Logo' })
    ),
    isAuthenticated && React.createElement(
      'div',
      { className: 'nav-links' },
      React.createElement(
        Link,
        { to: ROUTES.DASHBOARD, className: 'nav-link' },
        'Dashboard'
      ),
      React.createElement(
        Link,
        { to: ROUTES.PACIENTES, className: 'nav-link' },
        'Pacientes'
      )
    ),
    isAuthenticated && React.createElement(
      'div',
      { className: 'user-info' },
      React.createElement(
        'button',
        { 
          className: 'logout-button',
          onClick: handleLogout
        },
        'Sair'
      )
    )
  );
};

export default TopBar;