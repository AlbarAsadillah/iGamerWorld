import React from 'react';
import ProductCard from './ProductCard';

const products = [
  {
    name: 'Logitech G102',
    price: 230000,
    image: '/images/products/logitech-g102.png',
  },
  {
    name: 'Ajazz APEX PAW 3950',
    price: 780000,
    image: '/images/products/ajazz-apex.png',
  },
  {
    name: 'Fantech MH–82',
    price: 2489000,
    image: '/images/products/fantech-mh82.png',
  },
  {
    name: 'Ajazz AK35i V2 MAX',
    price: 2489000,
    image: '/images/products/ajazz-ak35i.png',
  },
];

const ProdukUnggulan = () => {
  const handleAddToCart = (productName) => {
    alert(`${productName} added to cart!`);
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>PRODUK UNGGULAN</h2>
      <div style={styles.grid}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            name={product.name}
            price={`Rp${product.price.toLocaleString('id-ID')}`}
            onAddToCart={() => handleAddToCart(product.name)}
            // textColor="#FFFFFF" // Mengatur warna teks menjadi putih
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
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 kolom seperti di ProdukList.jsx
    gap: '100px', // Jarak antar item
    justifyContent: 'center',
  },
};

export default ProdukUnggulan;