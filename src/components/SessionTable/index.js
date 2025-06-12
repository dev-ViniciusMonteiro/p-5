import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import './styles.css';

const SessionTable = ({ sessoes, loading }) => {
  const navigate = useNavigate();
  
  const formatarDataHora = (data, hora) => {
    if (!data) return '';
    const dataObj = new Date(data);
    const dataFormatada = dataObj.toISOString().split('T')[0];
    return `${dataFormatada}, ${hora.substring(0, 5)}`;
  };

  const calcularDuracao = (horaInicio, horaFim) => {
    if (!horaInicio || !horaFim) return '';
    const inicio = new Date(`2000-01-01T${horaInicio}`);
    const fim = new Date(`2000-01-01T${horaFim}`);
    const diff = (fim - inicio) / (1000 * 60);
    return `${diff} min`;
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (sessoes.length === 0) {
    return <p className="no-sessions">Não há próximas sessões agendadas.</p>;
  }

  return (
    <table className="session-table">
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Data e Hora</th>
          <th>Duração</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {sessoes.map(sessao => (
          <tr key={sessao.id}>
            <td>{sessao.nome_paciente || 'Nome não disponível'}</td>
            <td>{formatarDataHora(sessao.data_sessao, sessao.hora_inicio)}</td>
            <td>{calcularDuracao(sessao.hora_inicio, sessao.hora_fim)}</td>
            <td>
              <span className="badge">{sessao.tipo_sessao}</span>
            </td>
            <td className="actions">
              <Button 
                className="icon-button" 
                title="Ver paciente"
                onClick={() => navigate(`/pacientes/visualizar/${sessao.paciente_id}`)}
              >
                👤
              </Button>
              <Button 
                className="icon-button" 
                title="Editar"
                onClick={() => navigate(`/sessoes/editar/${sessao.id}`)}
              >
                ✏️
              </Button>
              <Button 
                className="icon-button" 
                title="Excluir"
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja excluir esta sessão?')) {
                    console.log('Excluir sessão', sessao.id);
                    // Implementar exclusão
                  }
                }}
              >
                🗑️
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SessionTable;