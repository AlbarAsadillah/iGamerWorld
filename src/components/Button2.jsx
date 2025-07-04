import React from 'react';

const Button2 = ({
  label,
  children,
  onClick,
  width = 'auto',
  style = {},
  type = 'button',
  disabled = false,
  icon,
  className = '',
  ...rest
}) => {
  const baseColor = 'black';
  const hoverColor = '#333333';
  const buttonStyle = {
    backgroundColor: baseColor,
    width: width,
    color: '#FFD700',
    border: '2px solid #FFD700',
    padding: '10px 20px',
    fontSize: '16px',
    fontFamily: 'Poppins, sans-serif',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'background-color 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: icon ? 8 : 0,
    ...style,
  };

  const handleHover = (e) => {
    if (!disabled) e.target.style.backgroundColor = hoverColor;
  };

  const handleHoverOut = (e) => {
    if (!disabled) e.target.style.backgroundColor = baseColor;
  };

  return (
    <button
      type={type}
      className={className}
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
      disabled={disabled}
      {...rest}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {children || label}
    </button>
  );
};

export default Button2;
