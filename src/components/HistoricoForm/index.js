import React from 'react';
import './styles.css';

const HistoricoForm = ({ historico }) => {
  if (!historico) {
    return (
      <div className="form-column">
        <h2>Histórico</h2>
        <p className="loading-message">Carregando histórico...</p>
      </div>
    );
  }

  const formatarData = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const formatarHora = (horaString) => {
    if (!horaString) return '';
    return horaString.substring(0, 5);
  };

  return (
    <div className="form-column">
      <h2>Histórico</h2>
      
      <div className="historico-section">
        <h3>Sessões</h3>
        {historico.sessoes && historico.sessoes.length > 0 ? (
          <div className="sessoes-list">
            {historico.sessoes.map(sessao => (
              <div key={sessao.id} className="sessao-card">
                <div className="sessao-header">
                  <span className="sessao-data">{formatarData(sessao.data_sessao)}</span>
                  <span className="sessao-tipo">{sessao.tipo_sessao}</span>
                </div>
                <div className="sessao-body">
                  <div className="sessao-info">
                    <span className="info-label">Horário:</span>
                    <span>{formatarHora(sessao.hora_inicio)} - {formatarHora(sessao.hora_fim)}</span>
                  </div>
                  {sessao.resumo && (
                    <div className="sessao-info">
                      <span className="info-label">Resumo:</span>
                      <p>{sessao.resumo}</p>
                    </div>
                  )}
                  {sessao.evolucao && (
                    <div className="sessao-info">
                      <span className="info-label">Evolução:</span>
                      <p>{sessao.evolucao}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">Nenhuma sessão registrada.</p>
        )}
      </div>
      
      <div className="historico-section">
        <h3>Fichas TCC</h3>
        {historico.fichasTCC && historico.fichasTCC.length > 0 ? (
          <div className="fichas-list">
            {historico.fichasTCC.map(ficha => (
              <div key={ficha.id} className="ficha-card">
                <p>Ficha {ficha.id}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">Nenhuma ficha TCC registrada.</p>
        )}
      </div>
      
      <div className="historico-section">
        <h3>Testes</h3>
        {historico.testes && historico.testes.length > 0 ? (
          <div className="testes-list">
            {historico.testes.map(teste => (
              <div key={teste.id} className="teste-card">
                <p>Teste {teste.id}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">Nenhum teste registrado.</p>
        )}
      </div>
    </div>
  );
};

export default HistoricoForm;