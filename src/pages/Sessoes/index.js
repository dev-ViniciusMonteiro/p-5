import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import Footer from '../../components/Footer';
import { getSessoes } from '../../services/api';
import { ROUTES } from '../../services/routes';
import './styles.css';

const Sessoes = () => {
  const navigate = useNavigate();
  const [sessoes, setSessoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [ocultarRealizadas, setOcultarRealizadas] = useState(false);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  const fetchSessoes = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        paciente_id: searchTerm,
        data_inicio: dataInicio,
        data_fim: dataFim
      };
      
      const response = await getSessoes(params);
      
      if (response && response.data) {
        let filteredSessoes = response.data;
        
        // Filtrar sessões realizadas se a opção estiver marcada
        if (ocultarRealizadas) {
          const hoje = new Date();
          filteredSessoes = filteredSessoes.filter(sessao => {
            const dataSessao = new Date(sessao.data_sessao);
            return dataSessao >= hoje;
          });
        }
        
        setSessoes(filteredSessoes);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessoes();
  }, [pagination.page, pagination.limit]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOcultarRealizadas = (e) => {
    setOcultarRealizadas(e.target.checked);
  };

  const handleFiltrarPeriodo = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchSessoes();
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const formatarDataHora = (data, hora) => {
    if (!data) return '';
    const dataObj = new Date(data);
    const dataFormatada = dataObj.toISOString().split('T')[0];
    return `${dataFormatada}, ${hora ? hora.substring(0, 5) : ''}`;
  };

  const calcularDuracao = (horaInicio, horaFim) => {
    if (!horaInicio || !horaFim) return '';
    const inicio = new Date(`2000-01-01T${horaInicio}`);
    const fim = new Date(`2000-01-01T${horaFim}`);
    const diff = (fim - inicio) / (1000 * 60);
    return `${diff} min`;
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const pageNumbers = [];
  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="sessoes-page">
      <DashboardHeader />
      <div className="content-area">
        <div className="container">
          <header>
            <div>
              <h1>Sessões</h1>
              <div className="subtext">Visualize e gerencie todas as suas sessões com pacientes.</div>
            </div>
            <button className="btn" onClick={() => navigate(ROUTES.AGENDAR_SESSAO)}>Agendar Sessão</button>
          </header>

          <div className="search-filter">
            <input 
              type="text" 
              placeholder="🔍 Buscar por nome, CPF ou e-mail do paciente" 
              value={searchTerm}
              onChange={handleSearch}
            />

            <div className="date-filters">
              <input 
                type="date" 
                placeholder="Data Inicial"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />

              <input 
                type="date" 
                placeholder="Data Final"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />

              <button onClick={handleFiltrarPeriodo}>Filtrar</button>
            </div>

            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={ocultarRealizadas}
                onChange={handleOcultarRealizadas}
              />
              Ocultar sessões realizadas
            </label>
          </div>

          {loading ? (
            <p>Carregando sessões...</p>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Data e Hora</th>
                    <th>Duração</th>
                    <th>Tipo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sessoes.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center' }}>Nenhuma sessão encontrada</td>
                    </tr>
                  ) : (
                    sessoes.map(sessao => (
                      <tr key={sessao.id}>
                        <td>{sessao.nome_paciente || 'Nome não disponível'}</td>
                        <td>{formatarDataHora(sessao.data_sessao, sessao.hora_inicio)}</td>
                        <td><span className="duration">{calcularDuracao(sessao.hora_inicio, sessao.hora_fim)}</span></td>
                        <td><span className="type">{sessao.tipo_sessao}</span></td>
                        <td className="actions">
                          <button className="icon-button" title="Ver paciente" onClick={() => navigate(`/pacientes/visualizar/${sessao.paciente_id}`)}>👤</button>
                          <button className="icon-button" title="Editar sessão" onClick={() => navigate(`/sessoes/editar/${sessao.id}`)}>✏️</button>
                          <button className="icon-button" title="Excluir sessão" onClick={() => {
                            if (window.confirm('Tem certeza que deseja excluir esta sessão?')) {
                              // Implementar exclusão
                            }
                          }}>🗑️</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className="pagination">
                <span>{pagination.total} resultados encontrados — exibindo {pagination.limit} por página</span>
                <nav>
                  <button 
                    disabled={pagination.page === 1} 
                    onClick={() => handlePageChange(pagination.page - 1)}
                  >&lt;</button>
                  
                  {pageNumbers.map(number => (
                    <button 
                      key={number}
                      className={pagination.page === number ? 'active' : ''}
                      onClick={() => handlePageChange(number)}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button 
                    disabled={pagination.page === totalPages} 
                    onClick={() => handlePageChange(pagination.page + 1)}
                  >&gt;</button>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sessoes;