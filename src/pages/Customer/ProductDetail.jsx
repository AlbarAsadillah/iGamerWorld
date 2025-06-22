import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { dummyProducts } from '../../data/dummyProducts'; // Assuming you have updated this file
import { Heart } from 'lucide-react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductCarousel from '../../components/ProductCarousel';
import Lottie from 'lottie-react';
import cartAnimation from '../../assets/cart-animation.json';
import Button1 from '../../components/Button';
import ModalWishlist from '../../components/ModalWishlist';
import { ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = dummyProducts.find((item) => item.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // No need for color options mapping anymore since variants contain their own color data

  // State for hover buttons
  const [hoverClose, setHoverClose] = useState(false);
  const [hoverViewCart, setHoverViewCart] = useState(false);

  // Check stock before enabling "Add to Cart"
  const isOutOfStock = product?.stock === 0;

  // Check if product is already in wishlist
  useEffect(() => {
    if (product && wishlist) {
      const isInWishlist = wishlist.some(item => item.id === product.id);
      setIsFavorited(isInWishlist);
    }
  }, [product, wishlist]);

  // Auto-select variant if only one variant available
  useEffect(() => {
    if (product && product.variants && product.variants.length === 1) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Handle favorite toggle - perform action and show modal
  const handleFavoriteToggle = () => {
    if (!product) return;

    if (isFavorited) {
      // Remove from wishlist
      removeFromWishlist(product.id);
      setIsFavorited(false);
    } else {
      // Add to wishlist
      addToWishlist(product);
      setIsFavorited(true);
    }

    // Show modal
    setShowWishlistModal(true);

    // Auto close modal after 2 seconds
    setTimeout(() => {
      setShowWishlistModal(false);
    }, 2000);
  };



  if (!product) {
    return (
      <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
        <h2>Produk tidak ditemukan</h2>
      </Container>
    );
  }

  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Check if product has variants and none is selected
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      alert('Please select a variant before adding to cart');
      return;
    }

    // Create product object with selected variant
    const productToAdd = {
      ...product,
      selectedVariant: selectedVariant
    };

    addToCart(productToAdd, quantity);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGoToCart = () => {
    navigate('/cart');
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
          padding: '70px',
        }}
      >
        {/* Tombol Kembali di bagian atas */}
        <div className="d-flex align-items-center mb-4">
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            style={{ color: '#FFD700', textDecoration: 'none', padding: '0', marginRight: '15px' }}
          >
            <ArrowLeft size={24} />
          </Button>
          <h5 style={{ color: '#FFD700', margin: 0, fontWeight: '600' }}>
            Kembali
          </h5>
        </div>

        <h2 className="mb-4 text-start">Detail Produk</h2>
        <Row>
          <Col xs={12} md={6} className="d-flex flex-column align-items-center">
            <ProductCarousel images={product.images} />
          </Col>

          <Col xs={12} md={6}>
            <h2 className="fw-bold d-flex justify-content-start align-items-start">{product.name}</h2>
            <Stack direction="row" spacing={1} className="my-3">
              <Chip label={product.category} style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', fontWeight: 'bold' }} />
              <Chip label={product.subcategory} style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', fontWeight: 'bold' }} />
            </Stack>

            {/* Available Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="my-3">
                <h6 className="fw-bold mb-2" style={{ color: '#fff', textAlign: "left" }}>Available Variants:</h6>
                <Stack direction="row" spacing={1} style={{ flexWrap: 'wrap', gap: '8px' }}>
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    return (
                      <Chip
                        key={variant.id}
                        label={variant.name}
                        clickable
                        onClick={() => setSelectedVariant(variant)}
                        style={{
                          backgroundColor: isSelected
                            ? '#FFD700'
                            : 'rgba(255, 215, 0, 0.1)',
                          color: isSelected ? '#000' : '#FFD700',
                          border: '1px solid #FFD700',
                          fontWeight: 'bold',
                          marginBottom: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    );
                  })}
                </Stack>
              </div>
            )}

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

            {/* Conditionally render "Add to Cart" button based on stock */}
            {!isOutOfStock && (
              <div className="d-flex align-items-center gap-3">
                <Button1
                  variant="warning"
                  className="fw-medium"
                  style={{ width: '300px' }}
                  label="Add to Cart"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button1>
                <Heart
                  size={30}
                  color={isFavorited ? 'red' : 'currentColor'}
                  fill={isFavorited ? 'red' : 'currentColor'}
                  onClick={handleFavoriteToggle}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}

            {/* Display "Out of Stock" message if product is out of stock */}
            {isOutOfStock && (
              <div style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>Out of Stock</div>
            )}

            <div className="mt-4">
              <h5 className="fw-bold d-flex justify-content-start align-items-start">Deskripsi</h5>
              <p style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{product.description || 'Deskripsi produk tidak tersedia.'}</p>
            </div>
          </Col>
        </Row>

        {/* Section Review Produk Full Width */}
        <div className="mt-5" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h5 className="fw-bold d-flex justify-content-start align-items-start">Review Produk</h5>
          <div style={{ background: '#232323', borderRadius: 8, padding: 24, marginTop: 12, minHeight: 120 }}>
            {dummyReviews.length === 0 ? (
              <div style={{ color: '#aaa' }}>Belum ada review untuk produk ini.</div>
            ) : (
              dummyReviews.map((review, idx) => (
                <div key={idx} style={{ borderBottom: idx !== dummyReviews.length - 1 ? '1px solid #444' : 'none', paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, color: '#FFD700', fontSize: 16 }}>{review.name} <span style={{ fontWeight: 400, color: '#aaa', fontSize: 13 }}>({review.date})</span></div>
                  <div style={{ color: '#FFD700', fontSize: 20, margin: '2px 0' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                  <div style={{ color: '#fff', fontSize: 16 }}>{review.comment}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </Container>

      {/* Modal with Lottie animation */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
            color: '#FFD233',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '1.2rem',
            lineHeight: '1.5',
          }}
        >
          <div style={{ width: 130, height: 130, marginBottom: 20 }}>
            <Lottie animationData={cartAnimation} loop={true} />
          </div>

          PRODUK BERHASIL DITAMBAHKAN<br />DALAM KERANJANG

          <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
            <Button
            variant='outline-warning'
              onClick={handleCloseModal}
              onMouseEnter={() => setHoverClose(true)}
              onMouseLeave={() => setHoverClose(false)}
            >
              Tutup
            </Button>

            <Button1
              label="Lihat Keranjang"
              onClick={() => {
                setShowModal(false);
                handleGoToCart();
              }}
              onMouseEnter={() => setHoverViewCart(true)}
              onMouseLeave={() => setHoverViewCart(false)}
            >
              Lihat Keranjang
            </Button1>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal Wishlist */}
      <ModalWishlist
        show={showWishlistModal}
        onHide={() => setShowWishlistModal(false)}
        product={product}
        isInWishlist={isFavorited}
      />
    </>
  );
};

export default ProductDetail;

// Tambahkan data dummy review di atas komponen ProductDetail
const dummyReviews = [
  {
    name: 'Budi',
    rating: 5,
    comment: 'Produk sangat bagus, pengiriman cepat!',
    date: '20 Juni 2025'
  },
  {
    name: 'Sari',
    rating: 4,
    comment: 'Barang sesuai deskripsi, recommended seller.',
    date: '18 Juni 2025'
  },
  {
    name: 'Andi',
    rating: 3,
    comment: 'Cukup baik, tapi kemasan kurang rapi.',
    date: '15 Juni 2025'
  }
];
