import axios from 'axios';

// Configuração da API de avaliações
const AVALIACOES_API_URL = process.env.REACT_APP_AVALIACOES_API_URL || 'http://localhost:3003';

// Criação da instância do axios para a API de avaliações
export const avaliacoesApi = axios.create({
  baseURL: AVALIACOES_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em todas as requisições
avaliacoesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funções para a API de fichas TCC
export const getFichasTCC = async (params = {}) => {
  try {
    const response = await avaliacoesApi.get('/api/fichas-tcc', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar fichas TCC:', error);
    throw error;
  }
};

export const getFichaTCC = async (id) => {
  try {
    const response = await avaliacoesApi.get(`/api/fichas-tcc/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFichasTCCPaciente = async (pacienteId) => {
  try {
    const response = await avaliacoesApi.get(`/api/fichas-tcc/paciente/${pacienteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFichaTCC = async (fichaTCCData) => {
  try {
    const response = await avaliacoesApi.post('/api/fichas-tcc', fichaTCCData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFichaTCC = async (id, fichaTCCData) => {
  try {
    const response = await avaliacoesApi.put(`/api/fichas-tcc/${id}`, fichaTCCData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFichaTCC = async (id) => {
  try {
    const response = await avaliacoesApi.delete(`/api/fichas-tcc/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funções para a API de testes
export const getTestes = async (params = {}) => {
  try {
    const response = await avaliacoesApi.get('/api/testes', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar testes:', error);
    throw error;
  }
};

export const getTestesPaciente = async (pacienteId) => {
  try {
    const response = await avaliacoesApi.get(`/api/testes/paciente/${pacienteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCatalogoTestes = async () => {
  try {
    const response = await avaliacoesApi.get('/api/catalogo-testes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getFichasTCC,
  getFichaTCC,
  getFichasTCCPaciente,
  createFichaTCC,
  updateFichaTCC,
  deleteFichaTCC,
  getTestes,
  getTestesPaciente,
  getCatalogoTestes
};