import React from 'react';
import './styles.css';

const AddressForm = ({ formData, onChange, disabled = false }) => {
  return (
    <div className="form-column">
      <h2>Endereço</h2>
      
      <div className="form-group">
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={formData.cep}
          onChange={onChange}
          placeholder="00000-000"
          disabled={disabled}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="endereco">Endereço</label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          value={formData.endereco}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="numero">Número</label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={formData.numero}
            onChange={onChange}
            disabled={disabled}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="complemento">Complemento</label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            value={formData.complemento}
            onChange={onChange}
            disabled={disabled}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="bairro">Bairro</label>
        <input
          type="text"
          id="bairro"
          name="bairro"
          value={formData.bairro}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={onChange}
            disabled={disabled}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="uf">UF</label>
          <select
            id="uf"
            name="uf"
            value={formData.uf}
            onChange={onChange}
            disabled={disabled}
          >
            <option value="">Selecione...</option>
            <option value="AC">AC</option>
            <option value="AL">AL</option>
            <option value="AP">AP</option>
            <option value="AM">AM</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="DF">DF</option>
            <option value="ES">ES</option>
            <option value="GO">GO</option>
            <option value="MA">MA</option>
            <option value="MT">MT</option>
            <option value="MS">MS</option>
            <option value="MG">MG</option>
            <option value="PA">PA</option>
            <option value="PB">PB</option>
            <option value="PR">PR</option>
            <option value="PE">PE</option>
            <option value="PI">PI</option>
            <option value="RJ">RJ</option>
            <option value="RN">RN</option>
            <option value="RS">RS</option>
            <option value="RO">RO</option>
            <option value="RR">RR</option>
            <option value="SC">SC</option>
            <option value="SP">SP</option>
            <option value="SE">SE</option>
            <option value="TO">TO</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;