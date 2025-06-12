import React from 'react';
import './styles.css';

const ClinicalDataForm = ({ formData, onChange, disabled = false }) => {
  return (
    <div className="form-column">
      <h2>Dados Clínicos</h2>
      
      <div className="form-group">
        <label htmlFor="queixa_principal">Queixa Principal</label>
        <textarea
          id="queixa_principal"
          name="queixa_principal"
          value={formData.queixa_principal}
          onChange={onChange}
          rows="4"
          disabled={disabled}
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="cid">CID (Classificação Internacional de Doenças)</label>
        <input
          type="text"
          id="cid"
          name="cid"
          value={formData.cid}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="historico_desenvolvimento">Histórico de Desenvolvimento</label>
        <textarea
          id="historico_desenvolvimento"
          name="historico_desenvolvimento"
          value={formData.historico_desenvolvimento}
          onChange={onChange}
          rows="4"
          disabled={disabled}
        ></textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="encaminhamento">Encaminhamento</label>
        <input
          type="text"
          id="encaminhamento"
          name="encaminhamento"
          value={formData.encaminhamento}
          onChange={onChange}
          placeholder="Profissional ou instituição que encaminhou"
          disabled={disabled}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="status_consentimento">Status do Consentimento</label>
        <select
          id="status_consentimento"
          name="status_consentimento"
          value={formData.status_consentimento}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="Pendente">Pendente</option>
          <option value="Assinado">Assinado</option>
          <option value="Recusado">Recusado</option>
        </select>
      </div>
    </div>
  );
};

export default ClinicalDataForm;