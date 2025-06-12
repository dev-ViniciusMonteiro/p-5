import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import NovoPaciente from './pages/NovoPaciente';
import EditarPaciente from './pages/EditarPaciente';
import VisualizarPaciente from './pages/VisualizarPaciente';
import Sessoes from './pages/Sessoes';
import AgendarSessao from './pages/AgendarSessao';
import EditarSessao from './pages/EditarSessao';
import FichaTCC from './pages/FichaTCC';
import { ROUTES } from './services/routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.DASHBOARD} element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path={ROUTES.PACIENTES} element={
              <PrivateRoute>
                <Pacientes />
              </PrivateRoute>
            } />
            <Route path={ROUTES.NOVO_PACIENTE} element={
              <PrivateRoute>
                <NovoPaciente />
              </PrivateRoute>
            } />
            <Route path="/pacientes/editar/:id" element={
              <PrivateRoute>
                <EditarPaciente />
              </PrivateRoute>
            } />
            <Route path="/pacientes/visualizar/:id" element={
              <PrivateRoute>
                <VisualizarPaciente />
              </PrivateRoute>
            } />
            <Route path="/pacientes/:id/ficha-tcc/nova" element={
              <PrivateRoute>
                <FichaTCC />
              </PrivateRoute>
            } />
            <Route path="/pacientes/:id/ficha-tcc/:fichaId" element={
              <PrivateRoute>
                <FichaTCC />
              </PrivateRoute>
            } />
            <Route path={ROUTES.SESSOES} element={
              <PrivateRoute>
                <Sessoes />
              </PrivateRoute>
            } />
            <Route path={ROUTES.AGENDAR_SESSAO} element={
              <PrivateRoute>
                <AgendarSessao />
              </PrivateRoute>
            } />
            <Route path="/sessoes/editar/:id" element={
              <PrivateRoute>
                <EditarSessao />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;