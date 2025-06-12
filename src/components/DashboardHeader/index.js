import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../services/routes';
import './styles.css';

const DashboardHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="dashboard-header">
      <div className="logo">
        <Link to={ROUTES.DASHBOARD}>
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="header-right">
        <nav>
          <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
          <Link to={ROUTES.PACIENTES}>Pacientes</Link>
          <Link to={ROUTES.SESSOES}>Sessões</Link>
        </nav>
        <div className="topbar-actions">
          <div className="notification-icon"></div>
          <div className="avatar" onClick={handleLogout}>
            <img src="https://via.placeholder.com/32" alt="Avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;