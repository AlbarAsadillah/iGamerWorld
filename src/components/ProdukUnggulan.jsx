import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import './ProdukUnggulan.css';

const featuredProduct = {
  name: 'Logitech G102',
  price: 230000,
  image: '/images/products/logitech-g102-1.png',
  description: 'Lorem Ipsum dolor sit sadsadadadsdadda'
};

const ProdukUnggulan = () => {
  return (
    <section className="produk-unggulan" style={styles.section}>
      <Container fluid style={{ maxWidth: '1200px' }}>
        <Row className="align-items-center" style={{ minHeight: '400px' }}>
          {/* Left Column - Simple Description */}
          <Col lg={6} md={6} className="pe-lg-5">
            <div style={styles.descriptionContainer}>
              <h2 style={styles.heading}>PRODUK UNGGULAN</h2>
              <p style={styles.description}>{featuredProduct.description}</p>
            </div>
          </Col>

          {/* Right Column - Product Card with Animation */}
          <Col lg={6} md={6} className="text-center">
            <div style={styles.cardContainer} className="shake-animation">
              <ProductCard
                id={1}
                image={featuredProduct.image}
                name={featuredProduct.name}
                price={`Rp${featuredProduct.price.toLocaleString('id-ID')}`}
                style={styles.productCard}
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Gaming accent lines */}
      <div style={styles.accentLine1}></div>
      <div style={styles.accentLine2}></div>
    </section>
  );
};

const styles = {
  section: {
    backgroundImage: 'url("/images/bg-featured.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '80px 0',
    width: '100vw',
    margin: '0',
    position: 'relative',
    overflow: 'hidden'
  },
  descriptionContainer: {
    padding: '20px 0'
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#FFD700',
    textAlign: 'left',
    textTransform: 'uppercase',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    fontFamily: 'Poppins, sans-serif'
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#FFFFFF',
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '0'
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '2rem'
  },
  productCard: {
    transform: 'scale(1.1)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
    border: '3px solid rgba(255, 215, 0, 0.5)'
  },
  accentLine1: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '60%',
    height: '4px',
    background: 'linear-gradient(90deg, #FFD700 0%, transparent 100%)',
    clipPath: 'polygon(0 0, 95% 0, 100% 100%, 0% 100%)'
  },
  accentLine2: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '40%',
    height: '4px',
    background: 'linear-gradient(270deg, #333333 0%, transparent 100%)',
    clipPath: 'polygon(5% 0, 100% 0, 100% 100%, 0% 100%)'
  }
};

export default ProdukUnggulan;