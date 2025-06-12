import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFichasTCCPaciente } from '../../services/avaliacoesApi';
import './styles.css';

const TCCSection = ({ pacienteId }) => {
  const navigate = useNavigate();
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFichas = async () => {
      try {
        const response = await getFichasTCCPaciente(pacienteId);
        setFichas(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar fichas TCC:', error);
        setFichas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFichas();
  }, [pacienteId]);

  const formatarData = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const handleNovaFicha = () => {
    navigate(`/pacientes/${pacienteId}/ficha-tcc/nova`);
  };

  const handleEditarFicha = (fichaId) => {
    navigate(`/pacientes/${pacienteId}/ficha-tcc/${fichaId}`);
  };

  if (loading) {
    return (
      <div className="form-column">
        <div className="tcc-header">
          <h2>Fichas TCC</h2>
          <button className="btn-add" onClick={handleNovaFicha}>Nova Ficha</button>
        </div>
        <p className="loading-message">Carregando fichas TCC...</p>
      </div>
    );
  }

  return (
    <div className="form-column">
      <div className="tcc-header">
        <h2>Fichas TCC</h2>
        <button className="btn-add" onClick={handleNovaFicha}>Nova Ficha</button>
      </div>
      
      {fichas.length === 0 ? (
        <p className="no-data">Nenhuma ficha TCC registrada.</p>
      ) : (
        <div className="fichas-list">
          {fichas.map(ficha => (
            <div key={ficha.id} className="ficha-card">
              <div className="ficha-header">
                <span className="ficha-data">{formatarData(ficha.data)}</span>
                <button 
                  className="btn-edit" 
                  onClick={() => handleEditarFicha(ficha.id)}
                >
                  Editar
                </button>
              </div>
              <div className="ficha-body">
                <div className="ficha-item">
                  <span className="item-label">Situação/Evento:</span>
                  <p>{ficha.situacao_evento}</p>
                </div>
                <div className="ficha-item">
                  <span className="item-label">Pensamentos:</span>
                  <p>{ficha.pensamentos_automaticos}</p>
                </div>
                <div className="ficha-item">
                  <span className="item-label">Emoções:</span>
                  <p>{ficha.emocoes}</p>
                </div>
                <div className="ficha-item">
                  <span className="item-label">Comportamentos:</span>
                  <p>{ficha.comportamentos}</p>
                </div>
                {ficha.reestruturacao_cognitiva && (
                  <div className="ficha-item">
                    <span className="item-label">Reestruturação Cognitiva:</span>
                    <p>{ficha.reestruturacao_cognitiva}</p>
                  </div>
                )}
                {ficha.plano_acao && (
                  <div className="ficha-item">
                    <span className="item-label">Plano de Ação:</span>
                    <p>{ficha.plano_acao}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TCCSection;