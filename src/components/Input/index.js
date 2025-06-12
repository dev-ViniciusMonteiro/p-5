import React from 'react';
import './styles.css';

const Input = ({ label, ...rest }) => {
  return React.createElement(
    'div',
    { className: 'input-container' },
    label && React.createElement('label', null, label),
    React.createElement('input', { ...rest })
  );
};

export default Input;