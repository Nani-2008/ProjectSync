import React from 'react';

const Card = ({ title, description, children, icon = null, className = '' }) => (
  <div className={`card ${className}`}>
    <div className="card-header">
      {icon && <span className="card-icon">{icon}</span>}
      {title && <h3 className="card-title">{title}</h3>}
    </div>
    {description && <p className="card-description">{description}</p>}
    <div className="card-content">{children}</div>
  </div>
);

export default Card;
