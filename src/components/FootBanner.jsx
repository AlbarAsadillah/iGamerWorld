import React from 'react';

const FootBanner = () => {
    return (
        <section
            style={{
                backgroundImage: 'url("/images/footbaner.png")', // Ganti dengan path gambar banner
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '300px', // Tinggi banner
                width: '100%',
                backgroundColor: '#000', // Warna fallback jika gambar tidak muncul
                // margin: '0 auto',
                // marginBottom: '40px',
                // borderRadius: '6px',
            }}
        ></section>
    );
};

export default FootBanner;