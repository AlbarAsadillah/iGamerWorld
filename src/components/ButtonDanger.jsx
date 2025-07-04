import { Button as AntdButton } from 'antd';
import React from 'react';

const ButtonDanger = ({
  label,
  children,
  onClick,
  type = 'primary',
  style = {},
  icon,
  className = '',
  ...rest
}) => {
  return (
    <AntdButton
      type={type}
      danger
      icon={icon}
      onClick={onClick}
      className={className}
      style={{
        fontFamily: 'Poppins, sans-serif',
        ...style,
      }}
      {...rest}
    >
      {children || label}
    </AntdButton>
  );
};

export default ButtonDanger;
