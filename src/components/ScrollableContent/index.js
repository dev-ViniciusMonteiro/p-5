import React from 'react';
import './styles.css';

const ScrollableContent = ({ children }) => {
  return (
    <div className="scrollable-content">
      {children}
    </div>
  );
};

export default ScrollableContent;