import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Button2 from '../../components/Button2';
import Button1 from '../../components/Button';

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || {};

  const [isAssembled, setIsAssembled] = useState(false);

  const totalPrice = Object.values(selectedItems).reduce(
    (sum, item) => sum + ((item.selectedVariant && item.selectedVariant.price) ? item.selectedVariant.price : (item.price || 0)),
    0
  );

  const assemblyFee = isAssembled ? 150000 : 0;
  const grandTotal = totalPrice + assemblyFee;

  const handleProceedCheckout = () => {
    if (!selectedItems || Object.keys(selectedItems).length === 0) {
      alert('Tidak ada produk yang dipilih');
      return;
    }
    navigate('/checkoutcustom', {
      state: { selectedItems, isAssembled, grandTotal },
    });
  };

  const handleBackToCustom = () => {
    navigate('/components/cpu', {
      state: { currentStep: 7, selectedItems }
    });
  };

  // Helper untuk menampilkan harga (handle varian & undefined)
  const getDisplayPrice = (product) => {
    if (product.selectedVariant && product.selectedVariant.price) {
      return product.selectedVariant.price.toLocaleString('id-ID');
    }
    if (product.variants && product.variants.length > 0) {
      const minPrice = Math.min(...product.variants.map(v => v.price));
      return minPrice.toLocaleString('id-ID');
    }
    if (typeof product.price === 'number') {
      return product.price.toLocaleString('id-ID');
    }
    return '-';
  };

  return (
    <Container
      className="py-5"
      style={{
        minHeight: '100vh',
        backgroundColor: '#212121',
        color: '#fff',
        borderRadius: '10px',
        marginTop: '20px',
        marginBottom: '20px',
        padding: '70px',
      }}
    >
      <h2 className="mb-4 text-start">Ringkasan Pesanan</h2>
      <Row>
        <Col xs={12} lg={4} className="mb-4">
          <Card
            text="light"
            style={{
              padding: '20px',
              marginBottom: '20px',
              backgroundColor: '#121212',
              textAlign: 'left',
            }}
          >
            <Form>
              <Form.Group controlId="assemblyCheck" className="mb-4">
                <Form.Check
                  type="checkbox"
                  label="Dirakit oleh toko"
                  checked={isAssembled}
                  onChange={(e) => setIsAssembled(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
              </Form.Group>

              <h5>Total Harga</h5>
              <div style={{ fontSize: '16px', lineHeight: '1.5' }}>
                <div>
                  Harga Komponen: <strong>Rp {totalPrice.toLocaleString('id-ID')}</strong>
                </div>
                {isAssembled && (
                  <div>
                    Biaya Rakit: <strong>Rp {assemblyFee.toLocaleString('id-ID')}</strong>
                  </div>
                )}
                <hr style={{ borderColor: '#FFD700' }} />
                <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  Total: Rp {grandTotal.toLocaleString('id-ID')}
                </div>
              </div>

              <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mt-4">
                <Button2
                label="Kembali ke Custom"
                  onClick={handleBackToCustom}
                  style={{width:'100%'}}
                >
                  Kembali
                </Button2>
                <Button1
                size='sm'
                  onClick={handleProceedCheckout}
                  style={{width:'100%'}}
                >
                  Lanjut
                </Button1>
              </div>
            </Form>
          </Card>
        </Col>

        <Col xs={12} lg={8}>
          {Object.keys(selectedItems).length === 0 ? (
            <p style={{ textAlign: 'center', color: '#ccc' }}>
              Tidak ada komponen yang dipilih.
            </p>
          ) : (
            <div
              style={{
                maxHeight: '70vh',
                overflowY: 'auto',
                paddingRight: '10px',
              }}
            >
              <Row>
                {Object.entries(selectedItems).map(([component, product]) => (
                  <Col xs={12} key={component} className="mb-2">
                    <Card
                      style={{
                        borderRadius: '8px',
                        backgroundColor: '#161616',
                        color: '#fff',
                        padding: '8px 12px',
                        cursor: 'default',
                        transition: 'box-shadow 0.3s ease',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow =
                          '0 0 10px 2px rgba(68, 68, 68, 0.7)')
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                    >
                      <Row className="align-items-center g-0">
                        <Col xs={3} style={{ paddingRight: '10px' }}>
                          <Card.Img
                            variant="top"
                            src={product.image}
                            alt={product.name}
                            style={{ objectFit: 'contain', height: 60, width: '100%' }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                'https://via.placeholder.com/150x60?text=No+Image';
                            }}
                          />
                        </Col>
                        <Col xs={9}>
                          <Card.Body style={{ padding: '4px 0' }}>
                            <Card.Title style={{ fontSize: '0.9rem', marginBottom: '0.1rem' }}>
                              {component}
                            </Card.Title>
                            <Card.Subtitle
                              className="text-warning mb-1"
                              style={{ fontSize: '0.8rem' }}
                            >
                              {product.name}
                            </Card.Subtitle>
                            <Card.Text style={{ fontSize: '0.75rem', marginBottom: 0 }}>
                              Harga: Rp {getDisplayPrice(product)}
                            </Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Summary;
