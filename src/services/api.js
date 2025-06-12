import axios from 'axios';
import { API_ENDPOINTS } from './routes';

// Configuração da API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const SESSOES_API_URL = process.env.REACT_APP_SESSOES_API_URL || 'http://localhost:3002';

// Criação da instância do axios para a API principal
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Criação da instância do axios para a API de sessões
export const sessoesApi = axios.create({
  baseURL: SESSOES_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em todas as requisições
const addTokenToRequest = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(addTokenToRequest);
sessoesApi.interceptors.request.use(addTokenToRequest);

// Funções de autenticação
export const login = async (credentials) => {
  const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  return response.data;
};

export const checkAuth = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.AUTH.CHECK);
    return response.data.valid;
  } catch (error) {
    console.error('Erro na verificação de autenticação:', error);
    return false;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funções para a API de sessões
export const getSessoes = async (params = {}) => {
  try {
    // Remover parâmetros vazios
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key];
      }
    });
    
    const response = await sessoesApi.get('/api/sessoes', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar sessões:', error);
    throw error;
  }
};

export const getSessao = async (id) => {
  try {
    const response = await sessoesApi.get(`/api/sessoes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSessoesPaciente = async (pacienteId) => {
  try {
    const response = await sessoesApi.get(`/api/sessoes/paciente/${pacienteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSessao = async (sessaoData) => {
  try {
    const response = await sessoesApi.post('/api/sessoes', sessaoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSessao = async (id, sessaoData) => {
  try {
    const response = await sessoesApi.put(`/api/sessoes/${id}`, sessaoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSessao = async (id) => {
  try {
    const response = await sessoesApi.delete(`/api/sessoes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registrarEvolucao = async (id, evolucaoData) => {
  try {
    const response = await sessoesApi.post(`/api/sessoes/${id}/evolucao`, evolucaoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;