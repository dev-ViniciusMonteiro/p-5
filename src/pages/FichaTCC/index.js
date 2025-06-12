import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import Footer from '../../components/Footer';
import { createFichaTCC, getFichaTCC, updateFichaTCC } from '../../services/avaliacoesApi';
import { getPaciente } from '../../services/pacientesApi';
import { getSessoesPaciente } from '../../services/api';
import { ROUTES } from '../../services/routes';
import './styles.css';

const FichaTCC = () => {
  const navigate = useNavigate();
  const { id, fichaId } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [paciente, setPaciente] = useState(null);
  const [sessoes, setSessoes] = useState([]);
  const [formData, setFormData] = useState({
    paciente_id: id,
    sessao_id: '',
    data: new Date().toISOString().split('T')[0],
    situacao_evento: '',
    pensamentos_automaticos: '',
    emocoes: '',
    comportamentos: '',
    reestruturacao_cognitiva: '',
    plano_acao: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        // Buscar dados do paciente
        const pacienteData = await getPaciente(id);
        setPaciente(pacienteData);
        
        // Buscar sessões do paciente
        const sessoesData = await getSessoesPaciente(id);
        if (sessoesData && sessoesData.data) {
          setSessoes(sessoesData.data);
        }
        
        // Se for edição, buscar dados da ficha
        if (fichaId) {
          setIsEditing(true);
          const fichaData = await getFichaTCC(fichaId);
          setFormData({
            ...fichaData,
            data: fichaData.data ? fichaData.data.split('T')[0] : new Date().toISOString().split('T')[0]
          });
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao carregar dados. Por favor, tente novamente.');
        navigate(-1);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [id, fichaId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isEditing) {
        await updateFichaTCC(fichaId, formData);
        alert('Ficha TCC atualizada com sucesso!');
      } else {
        await createFichaTCC(formData);
        alert('Ficha TCC criada com sucesso!');
      }
      navigate(`/pacientes/visualizar/${id}`);
    } catch (error) {
      console.error('Erro ao salvar ficha TCC:', error);
      alert('Erro ao salvar ficha TCC. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/pacientes/visualizar/${id}`);
  };

  if (loadingData) {
    return (
      <div className="page-wrapper">
        <DashboardHeader />
        <div className="content-area">
          <div className="container">
            <div className="loading-container">
              <p>Carregando dados...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <DashboardHeader />
      <div className="content-area">
        <div className="container">
          <div className="page-header">
            <div>
              <h1>{isEditing ? 'Editar Ficha TCC' : 'Nova Ficha TCC'}</h1>
              <p>Paciente: {paciente?.nome}</p>
            </div>
          </div>
          
          <form className="tcc-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="sessao_id">Sessão Relacionada</label>
              <select
                id="sessao_id"
                name="sessao_id"
                value={formData.sessao_id}
                onChange={handleChange}
              >
                <option value="">Selecione uma sessão...</option>
                {sessoes.map(sessao => {
                  const data = new Date(sessao.data_sessao).toLocaleDateString('pt-BR');
                  return (
                    <option key={sessao.id} value={sessao.id}>
                      {data} - {sessao.tipo_sessao}
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="data">Data <span className="required">*</span></label>
              <input
                type="date"
                id="data"
                name="data"
                value={formData.data}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="situacao_evento">Situação/Evento <span className="required">*</span></label>
              <textarea
                id="situacao_evento"
                name="situacao_evento"
                value={formData.situacao_evento}
                onChange={handleChange}
                placeholder="Descreva a situação ou evento que desencadeou os pensamentos"
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="pensamentos_automaticos">Pensamentos Automáticos <span className="required">*</span></label>
              <textarea
                id="pensamentos_automaticos"
                name="pensamentos_automaticos"
                value={formData.pensamentos_automaticos}
                onChange={handleChange}
                placeholder="Quais pensamentos surgiram na situação?"
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="emocoes">Emoções <span className="required">*</span></label>
              <textarea
                id="emocoes"
                name="emocoes"
                value={formData.emocoes}
                onChange={handleChange}
                placeholder="Quais emoções foram sentidas? (Ex: Ansiedade (80%), Medo (70%))"
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="comportamentos">Comportamentos <span className="required">*</span></label>
              <textarea
                id="comportamentos"
                name="comportamentos"
                value={formData.comportamentos}
                onChange={handleChange}
                placeholder="Como você reagiu? O que fez ou deixou de fazer?"
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="reestruturacao_cognitiva">Reestruturação Cognitiva</label>
              <textarea
                id="reestruturacao_cognitiva"
                name="reestruturacao_cognitiva"
                value={formData.reestruturacao_cognitiva}
                onChange={handleChange}
                placeholder="Pensamentos alternativos mais adaptativos"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="plano_acao">Plano de Ação</label>
              <textarea
                id="plano_acao"
                name="plano_acao"
                value={formData.plano_acao}
                onChange={handleChange}
                placeholder="O que pode ser feito para lidar com situações semelhantes no futuro?"
              ></textarea>
            </div>
            
            <div className="button-group">
              <button type="button" className="btn cancel" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit" className="btn save" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FichaTCC;