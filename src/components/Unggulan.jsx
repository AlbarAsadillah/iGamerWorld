import React from 'react';
import ProductCard from './ProductCard';

const Unggulan = () => {
    const products = [
        {
            id: 1,
            name: 'Logitech G102',
            price: 230000,
            image: '/images/products/logitech-g102-1.png',
        },
        {
            id: 2,
            name: 'Ajazz-AK35i',
            price: 1500000,
            image: '/images/products/ajazz-ak35i.png',
        },
        {
            id: 3,
            name: 'Ajazz-Apex',
            price: 500000,
            image: '/images/products/ajazz-apex.png',
        },
        {
            id: 4,
            name: 'Aria ii',
            price: 560000,
            image: '/images/products/fantech-aria-ii.png',
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