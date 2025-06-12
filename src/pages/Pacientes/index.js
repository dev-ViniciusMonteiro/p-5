import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pacientesApi, { getPacientes } from '../../services/pacientesApi';
import DashboardHeader from '../../components/DashboardHeader';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { ROUTES } from '../../services/routes';
import './styles.css';

const Pacientes = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleAddPaciente = () => {
    navigate(ROUTES.NOVO_PACIENTE);
  };
  
  const handleDeletePaciente = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        await pacientesApi.deletePaciente(id);
        setPacientes(pacientes.filter(p => p.id !== id));
        alert('Paciente excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir paciente:', error);
        alert('Erro ao excluir paciente. Por favor, tente novamente.');
      }
    }
  };

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
        // Dados de exemplo para desenvolvimento
        setPacientes([
          {
            id: 1,
            nome: 'João Silva',
            cpf: '123.456.789-00',
            email: 'joao.silva@exemplo.com',
            telefone: '(11) 98765-4321'
          },
          {
            id: 2,
            nome: 'Maria Santos',
            cpf: '987.654.321-00',
            email: 'maria.santos@exemplo.com',
            telefone: '(11) 91234-5678'
          },
          {
            id: 3,
            nome: 'Pedro Oliveira',
            cpf: '456.789.123-00',
            email: 'pedro.oliveira@exemplo.com',
            telefone: '(11) 95555-9999'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  return React.createElement(
    'div',
    { className: 'pacientes-container' },
    React.createElement(DashboardHeader),
    React.createElement(
      'main',
      null,
      React.createElement('div', { className: 'header-actions' },
        React.createElement('h1', null, 'Pacientes'),
        React.createElement(Button, { 
          onClick: handleAddPaciente, 
          className: 'add-button' 
        }, 'Adicionar Paciente')
      ),
      loading ? React.createElement('p', null, 'Carregando...') :
        pacientes.length === 0 ? 
          React.createElement('p', { className: 'no-data' }, 'Nenhum paciente cadastrado.') :
          React.createElement(
            'table',
            { className: 'pacientes-table' },
            React.createElement(
              'thead',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement('th', null, 'Nome'),
                React.createElement('th', null, 'CPF'),
                React.createElement('th', null, 'E-mail'),
                React.createElement('th', null, 'Telefone'),
                React.createElement('th', null, 'Ações')
              )
            ),
            React.createElement(
              'tbody',
              null,
              pacientes.map(paciente => (
                React.createElement(
                  'tr',
                  { key: paciente.id },
                  React.createElement('td', null, paciente.nome),
                  React.createElement('td', null, paciente.cpf),
                  React.createElement('td', null, paciente.email),
                  React.createElement('td', null, paciente.telefone),
                  React.createElement(
                    'td',
                    { className: 'actions' },
                    React.createElement('button', { 
                      className: 'icon-button', 
                      title: 'Ver detalhes',
                      onClick: () => navigate(`/pacientes/visualizar/${paciente.id}`)
                    }, '👁️'),
                    React.createElement('button', { 
                      className: 'icon-button', 
                      title: 'Editar',
                      onClick: () => navigate(`/pacientes/editar/${paciente.id}`)
                    }, '✏️'),
                    React.createElement('button', { 
                      className: 'icon-button', 
                      title: 'Excluir',
                      onClick: () => handleDeletePaciente(paciente.id)
                    }, '🗑️')
                  )
                )
              ))
            )
          )
    ),
    React.createElement(Footer)
  );
};

export default Pacientes;