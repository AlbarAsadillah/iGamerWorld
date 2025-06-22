import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Stepper from '../../../components/Stepper'; // sesuaikan path
import Button1 from '../../../components/Button';
import Button2 from '../../../components/Button2';
import { dummyProducts } from '../../../data/dummyProducts';

const stepSubcategoryMap = {
  0: 'Processor',
  1: 'Motherboard',
  2: 'GPU',
  3: 'RAM',
  4: 'Storage',
  5: 'Casing',
  6: 'Power Supply',
  7: 'Cooler',
};

const ComponentsCPU = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});

  const currentSubcategory = stepSubcategoryMap[currentStep];
  const lastStepIndex = Object.keys(stepSubcategoryMap).length - 1;

  const filteredProducts = dummyProducts.filter(
    (p) => p.subcategory === currentSubcategory
  );

  const selectedProduct = selectedItems[currentSubcategory] || null;

  const handleSelect = (product) => {
    setSelectedItems((prev) => ({
      ...prev,
      [currentSubcategory]: product,
    }));
  };

  const nextStep = () => {
    if (!selectedProduct) return;

    if (currentStep === lastStepIndex) {
      navigate('/summary', { state: { selectedItems } });
    } else if (currentStep < lastStepIndex) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep === 0) {
      navigate('/custom');
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Container
      fluid
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#fff',
        padding: 20,
        width: '1300px',
        marginBottom: '20px',
        marginTop: '20px',
        borderRadius: '10px',

      }}
    >
      <Stepper
        currentStep={currentStep}
        onChange={setCurrentStep}
        disableNext={!selectedProduct}
      />

      {/* Tombol Back dan Next di atas list produk */}
      <div
        className="d-flex"
        style={{ marginBottom: 16 }}
      >
        <Button2
        label={currentStep === 0 ? 'BACK' : 'PREVIOUS'}
          onClick={prevStep}
          variant="secondary"
          style={{
            minWidth: 120,
          }}
        >
        </Button2>

        <Button1
        label={currentStep === lastStepIndex ? 'DONE' : 'NEXT'}
          onClick={nextStep}
          disabled={!selectedProduct}
          style={{
            borderColor: '#FFD700',
            color: '#000',
            padding: '8px 20px',
            minWidth: 120,
            marginLeft: 'auto',
            alignContent: 'flex-end',
          }}
        >
        </Button1>
      </div>

      <Row style={{ marginTop: 24 }}>
        <Col
          md={7}
          style={{
            marginBottom: 20,
            maxHeight: '75vh',
            overflowY: 'auto',
            paddingRight: 10,
          }}
        >
          {filteredProducts.length === 0 && (
            <div style={{ color: '#888', padding: 20 }}>
              Tidak ada produk {currentSubcategory}
            </div>
          )}
          {filteredProducts.map((product) => {
            const isSelected = selectedProduct?.id === product.id;

            return (
              <Card
                key={product.id}
                onClick={() => handleSelect(product)}
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  backgroundColor: isSelected ? '#333' : '#1e1e1e',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 12,
                  color: '#fff',
                  borderRadius: 8,
                  marginBottom: 12,
                  boxShadow: isSelected
                    ? '0 0 10px 3px rgba(0, 0, 0, 0.7)'
                    : 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected)
                    e.currentTarget.style.backgroundColor = '#2a2a2a';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected)
                    e.currentTarget.style.backgroundColor = '#1e1e1e';
                }}
              >
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{
                    height: 80,
                    width: 120,
                    objectFit: 'contain',
                    marginRight: 12,
                    borderRadius: 6,
                    backgroundColor: '#111',
                    transition: 'transform 0.3s ease',
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/120x80?text=No+Image';
                  }}
                />
                <Card.Body
                  style={{
                    padding: '0 8px',
                    flex: 1,
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Card.Title
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#FFD700',
                      marginBottom: 6,
                    }}
                  >
                    {product.name}
                  </Card.Title>
                  <div
                    style={{
                      fontSize: 13,
                      marginTop: 4,
                      color: '#ccc',
                      fontWeight: '600',
                    }}
                  >
                    Rp. {product.price.toLocaleString('id-ID')}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </Col>

        <Col
          md={5}
          style={{
            borderLeft: '1px solid #444',
            paddingLeft: 30,
            minHeight: '80vh',
          }}
        >
          {selectedProduct ? (
            <div
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
                padding: 24,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#fff',
                height: '100%',
              }}
            >
              <h4
                style={{
                  marginBottom: 20,
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: 22,
                  color: '#FFD700',
                }}
              >
                {selectedProduct.name}
              </h4>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'contain',
                  marginBottom: 25,
                  borderRadius: 8,
                  backgroundColor: '#111',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />

              <div style={{ width: '100%', textAlign: 'left' }}>
                <h6
                  style={{
                    color: '#FFD700',
                    fontWeight: '700',
                    marginBottom: 15,
                    fontSize: 16,
                  }}
                >
                  SPECS
                </h6>
                <table
                  style={{
                    width: '100%',
                    fontSize: 14,
                    color: '#ddd',
                    borderCollapse: 'collapse',
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          fontWeight: '700',
                          width: 130,
                          padding: '6px 8px',
                          verticalAlign: 'top',
                        }}
                      >
                        Category:
                      </td>
                      <td style={{ padding: '6px 8px' }}>
                        {selectedProduct.category || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontWeight: '700',
                          padding: '6px 8px',
                          verticalAlign: 'top',
                        }}
                      >
                        Subcategory:
                      </td>
                      <td style={{ padding: '6px 8px' }}>
                        {selectedProduct.subcategory || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontWeight: '700',
                          padding: '6px 8px',
                          verticalAlign: 'top',
                        }}
                      >
                        Socket:
                      </td>
                      <td style={{ padding: '6px 8px' }}>
                        {selectedProduct.socket || '-'}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontWeight: '700',
                          padding: '6px 8px',
                          verticalAlign: 'top',
                        }}
                      >
                        Price:
                      </td>
                      <td style={{ padding: '6px 8px' }}>
                        Rp {selectedProduct.price.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div
              style={{
                color: '#aaa',
                fontStyle: 'italic',
                padding: 20,
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              Pilih produk di sebelah kiri untuk melihat detail.
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ComponentsCPU;
