import React from 'react';

const ProgressBar = ({ progress = 0, label = '', showPercentage = true }) => (
  <div className="progress-container">
    {label && <p className="progress-label">{label}</p>}
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }} />
    </div>
    {showPercentage && <span className="progress-text">{progress}%</span>}
  </div>
);

export default ProgressBar;
