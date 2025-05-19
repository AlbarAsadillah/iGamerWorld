import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Tambahkan useNavigate
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { dummyProducts } from '../../data/dummyProducts';
import { Heart } from 'lucide-react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useCart } from '../../context/CartContext'; // Menggunakan CartContext
import ProductCarousel from '../../components/ProductCarousel'; // Import ProductCarousel

const ProductDetail = () => {
  const { id } = useParams(); // Ambil id dari URL
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const product = dummyProducts.find((item) => item.id === parseInt(id)); // Cari produk berdasarkan id
  const [quantity, setQuantity] = useState(1); // State untuk jumlah produk
  const [isFavorited, setIsFavorited] = useState(false); // State untuk status favorit
  const [showModal, setShowModal] = useState(false); // State untuk modal
  const { addToCart } = useCart(); // Menggunakan fungsi addToCart dari context

  if (!product) {
    return (
      <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
        <h2>Produk tidak ditemukan</h2>
      </Container>
    );
  }

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity); // Tambahkan produk ke keranjang
    setShowModal(true); // Tampilkan modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Tutup modal
  };

  const handleGoToCart = () => {
    navigate('/cart'); // Navigasi ke halaman Cart
  };

  return (
    <>
      <Container
        className="py-5"
        style={{
          minHeight: '100vh',
          backgroundColor: '#212121',
          color: '#fff',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px',
          marginTop: '20px',
        }}
      >
        <h2 className="mb-4 text-start">Detail Produk</h2>
        <Row>
          {/* Gambar Produk dengan Carousel */}
          <Col xs={12} md={6} className="d-flex flex-column align-items-center">
            <ProductCarousel images={product.images} />
          </Col>

          {/* Detail Produk */}
          <Col xs={12} md={6}>
            <h2 className="fw-bold d-flex justify-content-start align-items-start">{product.name}</h2>
            <Stack direction="row" spacing={1} className="my-3">
              <Chip label={product.category} style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', fontWeight: 'bold' }} />
              <Chip label={product.subcategory} style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', fontWeight: 'bold' }} />
            </Stack>

            <h4 style={{ color: '#FFD700' }} className="fw-medium d-flex justify-content-start align-items-start">
              Rp {product.price.toLocaleString('id-ID')}
            </h4>

            <hr style={{ border: '1px solid #fff', margin: '10px 0' }} />

            <div className="d-flex align-items-center my-3">
              <span className="me-3">Qty:</span>
              <Button variant="outline-light" size="sm" onClick={() => handleQuantityChange('decrement')} style={{ fontWeight: 'bold' }}>
                -
              </Button>
              <Form.Control
                type="text"
                value={quantity}
                readOnly
                className="mx-2 text-center"
                style={{ width: '50px', fontWeight: 'bold' }}
              />
              <Button variant="outline-light" size="sm" onClick={() => handleQuantityChange('increment')} style={{ fontWeight: 'bold' }}>
                +
              </Button>
            </div>

            <div className="d-flex align-items-center gap-3">
              <Button variant="warning" className="fw-medium" style={{ width: '300px' }} onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Heart
                size={30}
                color={isFavorited ? 'red' : 'currentColor'}
                onClick={() => setIsFavorited((prev) => !prev)}
                style={{ cursor: 'pointer' }}
              />
            </div>

            <div className="mt-4">
              <h5 className="fw-bold d-flex justify-content-start align-items-start">Deskripsi</h5>
              <p style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{product.description || 'Deskripsi produk tidak tersedia.'}</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        style={{ color: '#FFD700' }} // Warna teks modal
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: '#212121', // Warna latar belakang header modal
            borderBottom: '1px solid #FFD700', // Border bawah header
          }}
        >
          <Modal.Title>Berhasil Ditambahkan</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: '#212121', // Warna latar belakang body modal
            color: '#FFD700', // Warna teks body modal
          }}
        >
          <p>{product.name} telah berhasil ditambahkan ke keranjang.</p>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: '#212121', // Warna latar belakang footer modal
            borderTop: '1px solid #FFD700', // Border atas footer
          }}
        >
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            style={{
              backgroundColor: '#858585', // Warna tombol
              color: '#FFFFFF', // Warna teks tombol
              border: 'none',
            }}
          >
            Tutup
          </Button>
          <Button
            variant="primary"
            onClick={handleGoToCart}
            style={{
              backgroundColor: '#FFD700', // Warna tombol
              color: '#212121', // Warna teks tombol
              border: 'none',
            }}
          >
            Lihat Keranjang
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductDetail;