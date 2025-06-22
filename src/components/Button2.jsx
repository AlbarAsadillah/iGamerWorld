import React from 'react';

const Button2 = ({ label, onClick, width = 'auto', style = {} }) => {
  const buttonStyle = {
    backgroundColor: 'black', /* Warna hitam (reverse dari kuning) */
    width: width, /* Lebar button - bisa dikustomisasi */
    color: '#FFD700', /* Warna teks kuning (reverse dari hitam) */
    border: '2px solid #FFD700', /* Border kuning (reverse dari hitam) */
    padding: '10px 20px', /* Padding atas-bawah 10px, kiri-kanan 20px */
    fontSize: '16px', /* Ukuran font */
    fontFamily: 'Poppins, sans-serif', /* Jenis font */
    borderRadius: '6px', /* Sudut membulat */
    cursor: 'pointer', /* Pointer saat hover */
    transition: 'background-color 0.3s ease', /* Efek transisi saat hover */
    ...style, /* Merge dengan style yang diberikan dari props */
  };

  const handleHover = (e) => {
    e.target.style.backgroundColor = '#333333'; /* Warna button saat hover (abu gelap) */
  };

  const handleHoverOut = (e) => {
    e.target.style.backgroundColor = 'black'; /* Warna button normal */
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

export default Button2;
