import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    image: '/images/komponen.png',
    link: '/kategori/komponen',
  },
  {
    image: '/images/aksesoris.png',
    link: '/kategori/aksesoris',
  },
  {
    image: '/images/pc-bundling.png',
    link: '/kategori/pc-bundling',
  },
];

const CategorySection = () => {
  return (
    <section style={styles.section}>
      <div style={styles.overlay}>
        <div style={styles.headingContainer}>
          <h2 style={styles.title}>KATEGORI</h2>
          <div style={styles.underline}></div>
        </div>
        <div style={styles.grid}>
          {categories.map((category, index) => (
            <Link key={index} to={category.link} style={styles.linkWrapper}>
              <div className="category-card" style={styles.card}>
                <img src={category.image} alt={category.title} style={styles.image} />
                <h4 style={styles.label}>{category.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundImage: 'url("/images/background-kategori.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#fff',
    padding: '72px'
  },
  headingContainer: {
    marginBottom: '2rem',
    textAlign: 'left',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  underline: {
    height: '6px',
    width: '120px',
    backgroundColor: '#FFD700',
    marginLeft: 0,
    borderRadius: '4px',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2.5rem',
    flexWrap: 'wrap',
  },
  linkWrapper: {
    textDecoration: 'none',
    color: 'inherit',
  },
  card: {
    backgroundColor: '#111',
    borderRadius: '10px',
    overflow: 'hidden',
    width: '430px',
    position: 'relative',
    boxShadow: '0 0 12px rgba(255, 255, 255, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  label: {
    position: 'absolute',
    top: '15px',
    left: '20px',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '1px 1px 4px #000',
  },
};

export default CategorySection;
