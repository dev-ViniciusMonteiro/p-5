import React from 'react';
import './styles.css';

const AdditionalInfoForm = ({ formData, onChange, disabled = false }) => {
  return (
    <div className="form-column">
      <h2>Informações Adicionais</h2>
      
      <div className="form-group">
        <label htmlFor="escolaridade">Escolaridade</label>
        <select
          id="escolaridade"
          name="escolaridade"
          value={formData.escolaridade}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="">Selecione...</option>
          <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</option>
          <option value="Ensino Fundamental Completo">Ensino Fundamental Completo</option>
          <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
          <option value="Ensino Médio Completo">Ensino Médio Completo</option>
          <option value="Ensino Superior Incompleto">Ensino Superior Incompleto</option>
          <option value="Ensino Superior Completo">Ensino Superior Completo</option>
          <option value="Pós-graduação">Pós-graduação</option>
          <option value="Mestrado">Mestrado</option>
          <option value="Doutorado">Doutorado</option>
          <option value="Não se aplica">Não se aplica</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="profissao">Profissão</label>
        <input
          type="text"
          id="profissao"
          name="profissao"
          value={formData.profissao}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="outras_informacoes">Outras Informações Relevantes</label>
        <textarea
          id="outras_informacoes"
          name="outras_informacoes"
          value={formData.outras_informacoes}
          onChange={onChange}
          rows="6"
          disabled={disabled}
        ></textarea>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;