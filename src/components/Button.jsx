import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import React from 'react';

const Button1 = ({ label, onClick, width = 'auto', style = {} }) => {
  const buttonStyle = {
    backgroundColor: '#FFD700', /* Warna kuning */
    width: width, /* Lebar button - bisa dikustomisasi */
    color: 'black', /* Warna teks hitam */
    border: '2px solid black', /* Border hitam */
    padding: '10px 20px', /* Padding atas-bawah 10px, kiri-kanan 20px */
    fontSize: '16px', /* Ukuran font */
    fontFamily: 'Poppins, sans-serif', /* Jenis font */
    borderRadius: '6px', /* Sudut membulat */
    cursor: 'pointer', /* Pointer saat hover */
    transition: 'background-color 0.3s ease', /* Efek transisi saat hover */
    ...style, /* Merge dengan style yang diberikan dari props */
  };

  const handleHover = (e) => {
    e.target.style.backgroundColor = '#CCAC00'; /* Warna button saat hover */
  };

  const handleHoverOut = (e) => {
    e.target.style.backgroundColor = '#FFD700'; /* Warna button normal */
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
    >
      {label}
    </button>
  );
};

export default Button1;
