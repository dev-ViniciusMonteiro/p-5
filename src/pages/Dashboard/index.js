import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessoes } from '../../services/api';
import DashboardHeader from '../../components/DashboardHeader';
import SessionTable from '../../components/SessionTable';
import SearchForm from '../../components/SearchForm';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';
import './styles.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sessoes, setSessoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  const today = new Date().toISOString().split('T')[0];
  const [filters, setFilters] = useState({
    paciente_id: '',
    data_inicio: today,
    data_fim: ''
  });
  const { logout } = useAuth();

  const fetchSessoes = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      };
      
      const response = await getSessoes(params);
      
      if (response && response.data) {
        setSessoes(response.data);
        if (response.pagination) {
          setPagination(prev => ({
            ...prev,
            total: response.pagination.total || 0
          }));
        }
      } else {
        setSessoes([]);
      }
    } catch (error) {
      console.error('Erro ao buscar sessões:', error);
      setSessoes([]);
      // Deslogar o usuário quando a API retornar erro de autenticação
      if (error.response && error.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessoes();
  }, [pagination.page, pagination.limit, logout]);
  
  // Buscar sessões quando o componente é montado
  useEffect(() => {
    fetchSessoes();
  }, []);

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchSessoes();
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <main>
        <h1>Próximas sessões</h1>
        <SearchForm onSearch={handleSearch} initialFilters={filters} />
        <SessionTable sessoes={sessoes} loading={loading} />
        <a 
          href="#" 
          className="link-sessoes" 
          onClick={(e) => {
            e.preventDefault();
            navigate('/sessoes');
          }}
        >
          Ver todas as sessões
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;