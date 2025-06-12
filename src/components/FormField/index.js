import React from 'react';
import './styles.css';

const FormField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required, 
  type = 'text',
  maxLength,
  helperText,
  ...rest 
}) => {
  return (
    <div className="form-field">
      {label && <label>{label}{required && ' *'}</label>}
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="blue-input"
          {...rest}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="blue-input"
          {...rest}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className="blue-input"
          {...rest}
        />
      )}
      {helperText && <small className="helper-text">{helperText}</small>}
    </div>
  );
};

export default FormField;