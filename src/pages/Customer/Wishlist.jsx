import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Favorite = () => {
  const navigate = useNavigate();

  // Contoh data produk favorit
  const favoriteProducts = [
    {
      id: 1,
      name: 'Produk A',
      price: 100000,
      image: '/path/to/image1.jpg',
    },
    {
      id: 2,
      name: 'Produk B',
      price: 150000,
      image: '/path/to/image2.jpg',
    },
  ];

  const handleGoToProduct = (id) => {
    navigate(`/product/${id}`); // Navigasi ke halaman detail produk
  };

  return (
    <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
      <h2 className="mb-4 text-start">Produk Favorit</h2>
      {favoriteProducts.length === 0 ? (
        <p>Belum ada produk favorit.</p>
      ) : (
        <Row>
          {favoriteProducts.map((product) => (
            <Col xs={12} md={6} lg={4} key={product.id} className="mb-4">
              <Card style={{ backgroundColor: '#333', color: '#fff', borderRadius: '10px' }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Rp {product.price.toLocaleString('id-ID')}</Card.Text>
                  <Button variant="warning" onClick={() => handleGoToProduct(product.id)}>
                    Lihat Detail
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Favorite;