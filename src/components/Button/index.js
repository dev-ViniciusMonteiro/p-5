import React from 'react';
import './styles.css';

const Button = ({ children, isLoading, ...rest }) => {
  return React.createElement(
    'button',
    { className: 'custom-button', ...rest },
    isLoading ? 'Carregando...' : children
  );
};

export default Button;