import React from 'react';
import './styles.css';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map(tab => (
          <a 
            key={tab.id}
            href="#" 
            className={activeTab === tab.id ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              onTabChange(tab.id);
            }}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;