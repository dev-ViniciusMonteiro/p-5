import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import Footer from '../../components/Footer';
import TabNavigation from '../../components/TabNavigation';
import PersonalDataForm from '../../components/PersonalDataForm';
import AddressForm from '../../components/AddressForm';
import ClinicalDataForm from '../../components/ClinicalDataForm';
import AdditionalInfoForm from '../../components/AdditionalInfoForm';
import HistoricoForm from '../../components/HistoricoForm';
import TCCSection from '../../components/TCCSection';
import { getPaciente, getPacienteHistorico, updatePaciente } from '../../services/pacientesApi';
import { ROUTES } from '../../services/routes';
import './styles.css';

const VisualizarPaciente = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState('dados');
  const [menorIdade, setMenorIdade] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [historico, setHistorico] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: '',
    sexo_genero: '',
    rg: '',
    responsavel: '',
    telefone_responsavel: '',
    escolaridade: '',
    profissao: '',
    queixa_principal: '',
    cid: '',
    historico_desenvolvimento: '',
    encaminhamento: '',
    status_consentimento: 'Pendente',
    outras_informacoes: ''
  });

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const data = await getPaciente(id);
        setFormData(data);
        
        // Verifica se é menor de idade
        if (data.responsavel && data.telefone_responsavel) {
          setMenorIdade(true);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do paciente:', error);
        alert('Erro ao carregar dados do paciente. Por favor, tente novamente.');
        navigate(ROUTES.PACIENTES);
      } finally {
        setLoadingData(false);
      }
    };

    fetchPaciente();
  }, [id, navigate]);

  useEffect(() => {
    const fetchHistorico = async () => {
      if (activeTab === 'historico') {
        try {
          const data = await getPacienteHistorico(id);
          setHistorico(data);
        } catch (error) {
          console.error('Erro ao buscar histórico do paciente:', error);
          setHistorico({ sessoes: [], fichasTCC: [], testes: [] });
        }
      }
    };

    fetchHistorico();
  }, [id, activeTab]);

  const handleChange = (e) => {
    if (!editMode) return;
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    if (!editMode) return;
    setMenorIdade(e.target.checked);
    if (!e.target.checked) {
      setFormData(prev => ({
        ...prev,
        responsavel: '',
        telefone_responsavel: ''
      }));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editMode) {
      setEditMode(true);
      return;
    }
    
    setLoading(true);
    try {
      await updatePaciente(id, formData);
      alert('Paciente atualizado com sucesso!');
      setEditMode(false);
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      alert('Erro ao atualizar paciente. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (editMode) {
      // Recarregar os dados originais
      const fetchPaciente = async () => {
        try {
          const data = await getPaciente(id);
          setFormData(data);
          setEditMode(false);
        } catch (error) {
          console.error('Erro ao buscar dados do paciente:', error);
        }
      };
      fetchPaciente();
    } else {
      navigate(-1); // Volta para a página anterior
    }
  };

  const tabs = [
    { id: 'dados', label: 'Dados Pessoais' },
    { id: 'anamnese', label: 'Anamnese' },
    { id: 'historico', label: 'Histórico' },
    { id: 'tcc', label: 'Fichas TCC' }
  ];

  if (loadingData) {
    return (
      <div className="page-wrapper">
        <DashboardHeader />
        <div className="content-area">
          <div className="container">
            <div className="loading-container">
              <p>Carregando dados do paciente...</p>
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
              <h1>{formData.nome}</h1>
              <p>{editMode ? 'Edite os dados do paciente' : 'Visualize os dados do paciente'}</p>
            </div>
          </div>
          
          <TabNavigation 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
            tabs={tabs} 
          />
          
          <form className="form-grid" onSubmit={handleSubmit}>
            {/* Dados Pessoais Tab */}
            {activeTab === 'dados' && (
              <div className="form-columns-container">
                <PersonalDataForm 
                  formData={formData} 
                  onChange={handleChange} 
                  menorIdade={menorIdade} 
                  onMenorIdadeChange={handleCheckboxChange}
                  disabled={!editMode}
                />
                
                <AddressForm 
                  formData={formData} 
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            )}
            
            {/* Anamnese Tab */}
            {activeTab === 'anamnese' && (
              <div className="form-columns-container">
                <ClinicalDataForm 
                  formData={formData} 
                  onChange={handleChange}
                  disabled={!editMode}
                />
                
                <AdditionalInfoForm 
                  formData={formData} 
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            )}
            
            {/* Histórico Tab */}
            {activeTab === 'historico' && (
              <div className="form-columns-container">
                <HistoricoForm historico={historico} />
              </div>
            )}
            
            {/* Fichas TCC Tab */}
            {activeTab === 'tcc' && (
              <div className="form-columns-container">
                <TCCSection pacienteId={id} />
              </div>
            )}
            
            <div className="button-group">
              <button type="button" className="btn cancel" onClick={handleCancel}>
                {editMode ? 'Cancelar' : 'Voltar'}
              </button>
              {(activeTab === 'dados' || activeTab === 'anamnese') && (
                <button type="submit" className="btn save" disabled={loading}>
                  {loading ? 'Salvando...' : editMode ? 'Salvar' : 'Editar'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisualizarPaciente;