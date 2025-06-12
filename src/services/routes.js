// Arquivo de configuração centralizada de rotas
// Obtém todas as rotas das variáveis de ambiente

// Rotas da aplicação
export const ROUTES = {
  LOGIN: process.env.REACT_APP_LOGIN_ROUTE || '/',
  DASHBOARD: process.env.REACT_APP_DASHBOARD_ROUTE || '/dashboard',
  PACIENTES: process.env.REACT_APP_PACIENTES_ROUTE || '/pacientes',
  NOVO_PACIENTE: process.env.REACT_APP_NOVO_PACIENTE_ROUTE || '/pacientes/novo',
  EDITAR_PACIENTE: process.env.REACT_APP_EDITAR_PACIENTE_ROUTE || '/pacientes/editar/:id',
  VISUALIZAR_PACIENTE: process.env.REACT_APP_VISUALIZAR_PACIENTE_ROUTE || '/pacientes/visualizar/:id',
  SESSOES: process.env.REACT_APP_SESSOES_ROUTE || '/sessoes',
  AGENDAR_SESSAO: process.env.REACT_APP_AGENDAR_SESSAO_ROUTE || '/sessoes/agendar',
  EDITAR_SESSAO: process.env.REACT_APP_EDITAR_SESSAO_ROUTE || '/sessoes/editar/:id',
  PROFILE: process.env.REACT_APP_PROFILE_ROUTE || '/profile',
  SETTINGS: process.env.REACT_APP_SETTINGS_ROUTE || '/settings',
};

// Endpoints da API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: process.env.REACT_APP_AUTH_LOGIN_PATH || '/auth/login',
    CHECK: process.env.REACT_APP_AUTH_CHECK_PATH || '/auth/check',
    FORGOT_PASSWORD: process.env.REACT_APP_AUTH_FORGOT_PASSWORD_PATH || '/auth/forgot-password',
  },
  USERS: process.env.REACT_APP_USERS_PATH || '/users',
  DASHBOARD: process.env.REACT_APP_DASHBOARD_PATH || '/dashboard',
};

// URL base da API
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030/api';

export default { ROUTES, API_ENDPOINTS, API_BASE_URL };