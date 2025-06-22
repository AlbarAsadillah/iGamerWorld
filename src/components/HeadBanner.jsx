import React from 'react';

const HeadBanner = () => {
  const bgImage = '/images/headbanner.png';

  const style = {
    width: '100%',
    height: 700,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    position: 'relative', // container relatif
  };

  const cardStyle = {
    position: 'absolute',  // posisikan absolut terhadap container
    top: '20px',            // posisikan di tengah
    left: '200px',           // posisikan di tengah
    // bottom: '100px',        // jarak 20px dari bawah
    // right: '200px',         // jarak 20px dari kanan
    // backgroundColor: 'rgba(94, 94, 94, 0.8)',
    padding: '20px 20px',
    borderRadius: '10px',
    maxWidth: '600px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    // boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
  };

  const textStyle = {
    color: '#FFFFFF',
    // fontSize: '1.5rem',
    fontWeight: 'bold',
    lineHeight: '1.4',
  };

  return (
    <div style={style}>
      <div style={cardStyle}>
        <p style={textStyle}>
          Gear Up, Power On
        </p>
      </div>
    </div>
  );
};

export default HeadBanner;
