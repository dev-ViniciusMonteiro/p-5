import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import Footer from '../../components/Footer';
import TabNavigation from '../../components/TabNavigation';
import PersonalDataForm from '../../components/PersonalDataForm';
import AddressForm from '../../components/AddressForm';
import ClinicalDataForm from '../../components/ClinicalDataForm';
import AdditionalInfoForm from '../../components/AdditionalInfoForm';
import { createPaciente } from '../../services/pacientesApi';
import { ROUTES } from '../../services/routes';
import './styles.css';

const NovoPaciente = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setMenorIdade(e.target.checked);
    if (e.target.checked) {
      setFormData(prev => ({
        ...prev,
        responsavel: '',
        telefone_responsavel: ''
      }));
    } else {
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
      await createPaciente(formData);
      navigate(ROUTES.PACIENTES);
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      alert('Erro ao cadastrar paciente. Por favor, tente novamente.');
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

  return (
    <div className="page-wrapper">
      <DashboardHeader />
      <div className="content-area">
        <div className="container">
          <div className="page-header">
            <h1>Novo Paciente</h1>
            <p>Informe os campos abaixo para cadastrar seu novo paciente</p>
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

export default NovoPaciente;