import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', fullWidth = false, disabled = false, onClick, type = 'button', className = '' }) => {
  const buttonClass = `btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full-width' : ''} ${className}`;
  return <button type={type} className={buttonClass} onClick={onClick} disabled={disabled}>{children}</button>;
};

export default Button;
