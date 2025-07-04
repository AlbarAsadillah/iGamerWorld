import React from 'react';

const Button1 = ({
  label,
  children,
  onClick,
  width = 'auto',
  style = {},
  type = 'button',
  disabled = false,
  icon,
  className = '',
  size = 'm', // 'sm', 'm', 'xl'
  ...rest
}) => {
  const baseColor = '#FFD700';
  const hoverColor = '#CCAC00';

  const sizeStyles = {
    sm: {
      padding: '6px 12px',
      fontSize: '14px',
    },
    m: {
      padding: '10px 20px',
      fontSize: '16px',
    },
    xl: {
      padding: '14px 28px',
      fontSize: '18px',
    },
  };

  const buttonStyle = {
    backgroundColor: baseColor,
    width: width,
    color: 'black',
    border: '2px solid black',
    fontFamily: 'Poppins, sans-serif',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'background-color 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: icon ? 8 : 0,
    ...sizeStyles[size] || sizeStyles.m,
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

export default Button1;
