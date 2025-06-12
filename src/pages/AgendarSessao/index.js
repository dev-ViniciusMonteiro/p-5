import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import Footer from '../../components/Footer';
import { createSessao } from '../../services/api';
import { getPacientes } from '../../services/pacientesApi';
import { ROUTES } from '../../services/routes';
import './styles.css';

const AgendarSessao = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    const fetchPacientes = async () => {
      try {
        const response = await getPacientes();
        if (response && response.data) {
          setPacientes(response.data);
        } else {
          setPacientes([]);
        }
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
        setPacientes([]);
      }
    };

    fetchPacientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createSessao(formData);
      alert('Sessão agendada com sucesso!');
      navigate(ROUTES.SESSOES);
    } catch (error) {
      console.error('Erro ao agendar sessão:', error);
      alert('Erro ao agendar sessão. Por favor, tente novamente.');
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

  return (
    <div className="agendar-sessao-page">
      <DashboardHeader />
      <div className="content-area">
        <div className="container">
          <h1>Nova Sessão</h1>
          <p className="subtext">Informe os campos abaixo para agendar uma sessão com o paciente</p>

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
              <label htmlFor="resumo">Anotações Preliminares</label>
              <textarea
                id="resumo"
                name="resumo"
                value={formData.resumo}
                onChange={handleChange}
                placeholder="Descreva brevemente o objetivo da sessão"
              />
            </div>

            <div className="button-group">
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Agendando...' : 'Agendar Sessão'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AgendarSessao;