import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import Footer from '../../components/Footer';
import TabNavigation from '../../components/TabNavigation';
import PersonalDataForm from '../../components/PersonalDataForm';
import AddressForm from '../../components/AddressForm';
import ClinicalDataForm from '../../components/ClinicalDataForm';
import AdditionalInfoForm from '../../components/AdditionalInfoForm';
import { getPaciente, updatePaciente } from '../../services/pacientesApi';
import { ROUTES } from '../../services/routes';
import './styles.css';

const EditarPaciente = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState('dados');
  const [menorIdade, setMenorIdade] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
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
    setLoading(true);
    
    try {
      await updatePaciente(id, formData);
      alert('Paciente atualizado com sucesso!');
      navigate(ROUTES.PACIENTES);
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      alert('Erro ao atualizar paciente. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.PACIENTES);
  };

  const tabs = [
    { id: 'dados', label: 'Dados Pessoais' },
    { id: 'anamnese', label: 'Anamnese' }
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
            <h1>Editar Paciente</h1>
            <p>Atualize os dados do paciente conforme necessário</p>
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
                />
                
                <AddressForm 
                  formData={formData} 
                  onChange={handleChange} 
                />
              </div>
            )}
            
            {/* Anamnese Tab */}
            {activeTab === 'anamnese' && (
              <div className="form-columns-container">
                <ClinicalDataForm 
                  formData={formData} 
                  onChange={handleChange} 
                />
                
                <AdditionalInfoForm 
                  formData={formData} 
                  onChange={handleChange} 
                />
              </div>
            )}
            
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

export default EditarPaciente;