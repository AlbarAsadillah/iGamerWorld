import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Stepper from '../../../components/Stepper'; // sesuaikan path
import Button1 from '../../../components/Button';
import Button2 from '../../../components/Button2';
import { dummyProducts } from '../../../data/dummyProducts';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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
  const location = useLocation();

  // Ambil currentStep dan selectedItems dari state jika ada
  const initialStep = location.state?.currentStep ?? 0;
  const initialSelectedItems = location.state?.selectedItems ?? {};

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    // Jika user kembali dari summary, set step ke currentStep dari state
    if (location.state?.currentStep !== undefined) {
      setCurrentStep(location.state.currentStep);
    }
    if (location.state?.selectedItems) {
      setSelectedItems(location.state.selectedItems);
    }
    // eslint-disable-next-line
  }, [location.state]);

  const currentSubcategory = stepSubcategoryMap[currentStep];
  const lastStepIndex = Object.keys(stepSubcategoryMap).length - 1;

  const filteredProducts = dummyProducts.filter(
    (p) => p.subcategory === currentSubcategory &&
      (!searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Reset ke halaman 1 jika filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [currentSubcategory, searchTerm]);

  const selectedProduct = selectedItems[currentSubcategory] || null;

  const handleSelect = (product) => {
    setSelectedVariant(selectedItems[stepSubcategoryMap[currentStep]]?.variant || null);
    setSelectedItems((prev) => ({
      ...prev,
      [currentSubcategory]: product,
    }));
  };

  // Saat user memilih varian
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setSelectedItems((prev) => ({
      ...prev,
      [currentSubcategory]: {
        ...selectedItems[currentSubcategory],
        variant,
      },
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
        marginBottom: '35px',
        marginTop: '35px',
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
          disabled={
            !selectedProduct ||
            (selectedProduct?.variants?.length > 0 && !selectedVariant)
          }
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
        <Col md={7} style={{ marginBottom: 20, maxHeight: '75vh', overflowY: 'auto', paddingRight: 10 }}>
          {/* Search Bar ala Navbar */}
          <div style={{ marginBottom: 16 }}>
            {/* Custom CSS agar search sama dengan navbar */}
            <style>{`
              .navbar-search-input:focus {
                background-color: #444 !important;
                border-color: #FFD700 !important;
                color: #fff !important;
                box-shadow: none !important;
              }
              .navbar-search-input::placeholder {
                color: #aaa !important;
              }
              .navbar-search-input:focus + .input-group-text,
              .input-group-text:focus-within {
                border-color: #FFD700 !important;
                background-color: #444 !important;
              }
            `}</style>
            <InputGroup style={{ maxWidth: 400, margin: '0 auto 16px 0' }}>
              <InputGroup.Text
                style={{
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  color: '#FFD700',
                  borderRight: 'none',
                }}
              >
                <svg width="18" height="18" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </InputGroup.Text>
              <FormControl
                type="search"
                placeholder={`Cari ${currentSubcategory}...`}
                aria-label="Search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{
                  backgroundColor: '#333',
                  border: '1px solid #555',
                  borderLeft: 'none',
                  color: '#fff',
                  fontSize: '14px',
                  borderRadius: '0 8px 8px 0',
                }}
                className="navbar-search-input"
              />
            </InputGroup>
          </div>

          {filteredProducts.length === 0 && (
            <div style={{ color: '#888', padding: 20 }}>
              Tidak ada produk {currentSubcategory}
            </div>
          )}
          {paginatedProducts.map((product) => {
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
                    {
                      product.variants && Array.isArray(product.variants) && product.variants.length > 0
                        ? (() => {
                            const prices = product.variants.map(v => v.price).filter(p => typeof p === 'number');
                            if (prices.length > 0) {
                              return `Rp. ${Math.min(...prices).toLocaleString('id-ID')}`;
                            } else {
                              return '-';
                            }
                          })()
                        : typeof product.price === 'number'
                          ? `Rp. ${product.price.toLocaleString('id-ID')}`
                          : '-'
                    }
                  </div>
                </Card.Body>
              </Card>
            );
          })}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{ marginRight: 8 }}
              >
                Prev
              </Button>
              {[...Array(totalPages)].map((_, idx) => (
                <Button
                  key={idx}
                  variant={currentPage === idx + 1 ? 'warning' : 'outline-warning'}
                  size="sm"
                  onClick={() => setCurrentPage(idx + 1)}
                  style={{ margin: '0 2px' }}
                >
                  {idx + 1}
                </Button>
              ))}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{ marginLeft: 8 }}
              >
                Next
              </Button>
            </div>
          )}
        </Col>

        <Col
          md={5}
          style={{
            borderLeft: '1px solid #444',
            padding: 0,
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

              {/* Pilihan varian jika ada */}
              {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                <div style={{ marginBottom: 16, width: '100%' }}>
                  <span style={{ color: '#FFD700', fontSize: 13 }}>Pilih Varian:</span>
                  <Stack direction="row" spacing={1} style={{ flexWrap: 'wrap', gap: '8px', marginTop: 6 }}>
                    {selectedProduct.variants.map((variant) => {
                      const isSelected = selectedVariant && selectedVariant.id === variant.id;
                      return (
                        <Chip
                          key={variant.id}
                          label={variant.name.toLocaleString('id-ID')}
                          clickable
                          onClick={() => handleVariantSelect(variant)}
                          style={{
                            backgroundColor: isSelected ? '#FFD700' : 'rgba(255, 215, 0, 0.1)',
                            color: isSelected ? '#000' : '#FFD700',
                            border: '1px solid #FFD700',
                            fontWeight: 'bold',
                            marginBottom: '4px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                          }}
                        />
                      );
                    })}
                  </Stack>
                  {!selectedVariant && (
                    <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
                      Pilih varian terlebih dahulu
                    </div>
                  )}
                </div>
              )}

              <div style={{ width: '100%', textAlign: 'left', marginTop: 24 }}>
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
                <div style={{
                  background: '#232323',
                  borderRadius: 6,
                  color: '#ccc',
                  padding: '10px',
                  whiteSpace: 'pre-line',
                  fontSize: 14
                }}>
                  {selectedProduct.description || 'Deskripsi produk tidak tersedia.'}
                </div>
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

/* Tambahkan di akhir file (atau di file css global):
.input-search-white::placeholder {
  color: #fff !important;
  opacity: 1;
}
*/
