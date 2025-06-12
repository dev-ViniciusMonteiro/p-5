import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import Footer from '../../components/Footer';
import { getSessao, updateSessao } from '../../services/api';
import { getPacientes } from '../../services/pacientesApi';
import { ROUTES } from '../../services/routes';
import './styles.css';

const EditarSessao = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [pacientes, setPacientes] = useState([]);
  const [formData, setFormData] = useState({
    paciente_id: '',
    data_sessao: '',
    hora_inicio: '',
    hora_fim: '',
    tipo_sessao: '',
    resumo: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        // Buscar dados da sessão
        const sessaoData = await getSessao(id);
        
        // Buscar lista de pacientes
        const pacientesResponse = await getPacientes();
        if (pacientesResponse && pacientesResponse.data) {
          setPacientes(pacientesResponse.data);
        } else {
          setPacientes([]);
        }
        
        // Formatar data para o formato esperado pelo input type="date"
        const formattedData = {
          ...sessaoData,
          data_sessao: sessaoData.data_sessao ? sessaoData.data_sessao.split('T')[0] : ''
        };
        
        setFormData(formattedData);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao carregar dados da sessão. Por favor, tente novamente.');
        navigate(ROUTES.SESSOES);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateSessao(id, formData);
      alert('Sessão atualizada com sucesso!');
      navigate(ROUTES.SESSOES);
    } catch (error) {
      console.error('Erro ao atualizar sessão:', error);
      alert('Erro ao atualizar sessão. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.SESSOES);
  };

  const tiposSessao = [
    'Avaliação',
    'Terapia Individual',
    'Terapia em Grupo',
    'Terapia Familiar',
    'Terapia de Casal',
    'Terapia Neuropsicológica',
    'Orientação Vocacional',
    'Consulta de Retorno'
  ];

  if (loadingData) {
    return (
      <div className="editar-sessao-page">
        <DashboardHeader />
        <div className="content-area">
          <div className="container">
            <div className="loading-container">
              <p>Carregando dados da sessão...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="editar-sessao-page">
      <DashboardHeader />
      <div className="content-area">
        <div className="container">
          <h1>Editar Sessão</h1>
          <p className="subtext">Atualize os dados da sessão conforme necessário</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="paciente_id">
                Paciente <span className="required">*</span>
              </label>
              <select
                id="paciente_id"
                name="paciente_id"
                value={formData.paciente_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                {pacientes.map(paciente => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="data_sessao">
                Data da Sessão <span className="required">*</span>
              </label>
              <input
                type="date"
                id="data_sessao"
                name="data_sessao"
                value={formData.data_sessao}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hora_inicio">
                Hora de Início <span className="required">*</span>
              </label>
              <input
                type="time"
                id="hora_inicio"
                name="hora_inicio"
                value={formData.hora_inicio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hora_fim">Hora de Término</label>
              <input
                type="time"
                id="hora_fim"
                name="hora_fim"
                value={formData.hora_fim}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipo_sessao">
                Tipo da Sessão <span className="required">*</span>
              </label>
              <select
                id="tipo_sessao"
                name="tipo_sessao"
                value={formData.tipo_sessao}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                {tiposSessao.map(tipo => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="resumo">Anotações</label>
              <textarea
                id="resumo"
                name="resumo"
                value={formData.resumo || ''}
                onChange={handleChange}
                placeholder="Anotações sobre a sessão"
              />
            </div>

            <div className="button-group">
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Atualizando...' : 'Atualizar Sessão'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditarSessao;