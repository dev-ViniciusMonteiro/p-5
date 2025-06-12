import React, { useState } from 'react';
import './styles.css';

const SearchForm = ({ onSearch, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters || {
    paciente_id: '',
    data_inicio: new Date().toISOString().split('T')[0],
    data_fim: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const today = new Date().toISOString().split('T')[0];
  
  const handleClear = () => {
    setFilters({
      paciente_id: '',
      data_inicio: today,
      data_fim: ''
    });
    onSearch({
      paciente_id: '',
      data_inicio: today,
      data_fim: ''
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="paciente_id">Paciente</label>
          <input
            type="text"
            id="paciente_id"
            name="paciente_id"
            value={filters.paciente_id}
            onChange={handleChange}
            placeholder="ID ou nome do paciente"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="data_inicio">Data Início</label>
          <input
            type="date"
            id="data_inicio"
            name="data_inicio"
            value={filters.data_inicio}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="data_fim">Data Fim</label>
          <input
            type="date"
            id="data_fim"
            name="data_fim"
            value={filters.data_fim}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="btn-search">Buscar</button>
          <button type="button" className="btn-clear" onClick={handleClear}>Limpar</button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;