import React from 'react';
import ProductCard from './ProductCard';

const Unggulan = () => {
    const products = [
        {
            id: 11,
            name: 'Logitech G102 Lightsync',
            price: 230000,
            image: '/images/products/LogitechG1021.png',
        },
        {
            id: 16,
            name: 'Fantech MAXFIT61 Keyboard',
            price: 500000,
            image: '/images/products/Fantech MAXFIT61 Keyboard1.png',
        },
        {
            id: 12,
            name: 'Logitech G Pro X Headset',
            price: 950000,
            image: '/images/products/Logitech Headset1.png',
        },
        {
            id: 19,
            name: 'Gigabyte AORUS Gen4 SSD 1TB',
            price: 1700000,
            image: '/images/products/Gigabyte Aorus1.png',
        },
    ];

    return (
        <section style={styles.section}>
            <h2 style={styles.heading}>PRODUK UNGGULAN</h2>
            <div style={styles.grid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        price={`Rp${product.price.toLocaleString('id-ID')}`}
                        textColor="#000" // Mengatur warna teks menjadi putih
                    />
                ))}
            </div>
        </section>
    );
};

const styles = {
    section: {
        backgroundImage: 'url("/images/bg-featured.jpg")',
        backgroundSize: 'cover', // Gambar akan sepenuhnya terlihat tanpa terpotong
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '72px',
        width: '100vw', // Lebar penuh sesuai layar
        margin: '0', // Menghilangkan margin default
    },
    heading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        color: '#000',
        textAlign: 'left',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)', // 4 kolom
        gap: '16px', // Jarak antar item
    },
};

export default Unggulan;