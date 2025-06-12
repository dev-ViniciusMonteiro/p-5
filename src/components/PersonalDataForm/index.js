import React from 'react';
import './styles.css';

const PersonalDataForm = ({ formData, onChange, menorIdade, onMenorIdadeChange, disabled = false }) => {
  return (
    <div className="form-column">
      <h2>Dados Pessoais</h2>
      
      <div className="form-group">
        <label htmlFor="nome">Nome Completo <span className="required">*</span></label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={onChange}
          required
          disabled={disabled}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="data_nascimento">Data de Nascimento <span className="required">*</span></label>
        <input
          type="date"
          id="data_nascimento"
          name="data_nascimento"
          value={formData.data_nascimento}
          onChange={onChange}
          required
          disabled={disabled}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="cpf">CPF <span className="required">*</span></label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={onChange}
          placeholder="000.000.000-00"
          required
          disabled={disabled}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="rg">RG</label>
        <input
          type="text"
          id="rg"
          name="rg"
          value={formData.rg}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="sexo_genero">Sexo/Gênero</label>
        <select
          id="sexo_genero"
          name="sexo_genero"
          value={formData.sexo_genero}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="">Selecione...</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Não-binário">Não-binário</option>
          <option value="Outro">Outro</option>
          <option value="Prefiro não informar">Prefiro não informar</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="telefone">Telefone <span className="required">*</span></label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={onChange}
          placeholder="(00) 00000-0000"
          required
          disabled={disabled}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      
      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={menorIdade}
            onChange={onMenorIdadeChange}
            disabled={disabled}
          />
          Paciente menor de idade
        </label>
      </div>
      
      {menorIdade && (
        <>
          <div className="form-group">
            <label htmlFor="responsavel">Nome do Responsável <span className="required">*</span></label>
            <input
              type="text"
              id="responsavel"
              name="responsavel"
              value={formData.responsavel}
              onChange={onChange}
              required={menorIdade}
              disabled={disabled}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="telefone_responsavel">Telefone do Responsável <span className="required">*</span></label>
            <input
              type="tel"
              id="telefone_responsavel"
              name="telefone_responsavel"
              value={formData.telefone_responsavel}
              onChange={onChange}
              placeholder="(00) 00000-0000"
              required={menorIdade}
              disabled={disabled}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalDataForm;