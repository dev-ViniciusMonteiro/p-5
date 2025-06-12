import axios from 'axios';

// Configuração da API de pacientes
const PACIENTES_API_URL = process.env.REACT_APP_PACIENTES_API_URL || 'http://localhost:3001';

// Criação da instância do axios para a API de pacientes
export const pacientesApi = axios.create({
  baseURL: PACIENTES_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em todas as requisições
pacientesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funções para a API de pacientes
export const getPacientes = async (params = {}) => {
  try {
    const response = await pacientesApi.get('/api/pacientes', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    throw error;
  }
};

export const getPaciente = async (id) => {
  try {
    const response = await pacientesApi.get(`/api/pacientes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPacienteHistorico = async (id) => {
  try {
    const response = await pacientesApi.get(`/api/pacientes/${id}/historico`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPaciente = async (pacienteData) => {
  try {
    const response = await pacientesApi.post('/api/pacientes', pacienteData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePaciente = async (id, pacienteData) => {
  try {
    const response = await pacientesApi.put(`/api/pacientes/${id}`, pacienteData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePaciente = async (id) => {
  try {
    const response = await pacientesApi.delete(`/api/pacientes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getPacientes,
  getPaciente,
  getPacienteHistorico,
  createPaciente,
  updatePaciente,
  deletePaciente
};