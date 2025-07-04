import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Modal, Tabs, Tab } from 'react-bootstrap';
import { dummyProducts } from '../../data/dummyProducts';
import { Heart, ArrowLeft } from 'lucide-react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import ProductCarousel from '../../components/ProductCarousel';
import Lottie from 'lottie-react';
import cartAnimation from '../../assets/cart-animation.json';
import Button1 from '../../components/Button';
import ModalWishlist from '../../components/ModalWishlist';
import { brandMeta } from '../../data/brandMeta';

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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = dummyProducts.find((item) => item.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [hoverClose, setHoverClose] = useState(false);
  const [hoverViewCart, setHoverViewCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isOutOfStock = product?.stock === 0;

  useEffect(() => {
    if (product && wishlist) {
      const isInWishlist = wishlist.some(item => item.id === product.id);
      setIsFavorited(isInWishlist);
    }
  }, [product, wishlist]);

  useEffect(() => {
    if (product && product.variants && product.variants.length === 1) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  const handleFavoriteToggle = () => {
    if (!product) return;

    if (isFavorited) {
      removeFromWishlist(product.id);
      setIsFavorited(false);
    } else {
      addToWishlist(product);
      setIsFavorited(true);
    }

    setShowWishlistModal(true);
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
    if (product.variants?.length > 0 && !selectedVariant) {
      alert('Please select a variant before adding to cart');
      return;
    }

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

  const averageRating = dummyReviews.reduce((acc, curr) => acc + curr.rating, 0) / dummyReviews.length;

  // Penentuan harga produk (varian termurah jika ada, jika tidak pakai product.price)
  const getDisplayPrice = () => {
    if (selectedVariant) return selectedVariant.price;
    if (product.variants?.length > 0) {
      return Math.min(...product.variants.map(v => v.price));
    }
    return product.price;
  };

  return (
    <>
      <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px', padding: '70px', marginTop:'35px', marginBottom:'35px' }}>
        <div className="d-flex align-items-center mb-4">
          <Button variant="link" onClick={() => navigate(-1)} style={{ color: '#FFD700', textDecoration: 'none', padding: '0', marginRight: '15px' }}>
            <ArrowLeft size={24} />
          </Button>
          <h5 style={{ color: '#FFD700', margin: 0, fontWeight: '600' }}>Kembali</h5>
        </div>

        <h2 className="mb-4 text-start">Detail Produk</h2>
        <Row>
          <Col xs={12} md={6} className="d-flex flex-column align-items-center">
            <ProductCarousel images={product.images} />
          </Col>

          <Col xs={12} md={6}>
            <h2 className="fw-bold d-flex justify-content-start align-items-start">{product.name}</h2>
            {/* Brand dengan logo - dihapus sesuai permintaan */}
            {/*
            {product.brand && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                {(() => {
                  if (!product.brand) return null;
                  const brand = brandMeta.find(b => b.name.toLowerCase() === product.brand.toLowerCase());
                  if (!brand) return null;
                  return (
                    <img src={brand.logo} alt={brand.name} style={{ width: 32, height: 32, marginRight: 8, objectFit: 'contain' }} />
                  );
                })()}
                <span style={{ fontWeight: 600, color: '#FFD700', fontSize: 16 }}>{product.brand}</span>
              </div>
            )}
            */}
            <Stack direction="row" spacing={1} className="my-3">
              <Chip label={product.category} style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', fontWeight: 'bold' }} />
              <Chip label={product.subcategory} style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', fontWeight: 'bold' }} />
            </Stack>

            {product.variants?.length > 0 && (
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
                          backgroundColor: isSelected ? '#FFD700' : 'rgba(255, 215, 0, 0.1)',
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
              Rp {getDisplayPrice()?.toLocaleString('id-ID')}
            </h4>

            <hr style={{ border: '1px solid #fff', margin: '10px 0' }} />

            <div className="d-flex align-items-center my-3">
              <span className="me-3">Qty:</span>
              <Button variant="outline-light" size="sm" onClick={() => handleQuantityChange('decrement')} style={{ fontWeight: 'bold' }}>-</Button>
              <Form.Control type="text" value={quantity} readOnly className="mx-2 text-center" style={{ width: '50px', fontWeight: 'bold' }} />
              <Button variant="outline-light" size="sm" onClick={() => handleQuantityChange('increment')} style={{ fontWeight: 'bold' }}>+</Button>
            </div>

            {!isOutOfStock && (
              <div className="d-flex align-items-center gap-3">
                <Button1 variant="warning" className="fw-medium" style={{ width: '300px' }} label="Add to Cart" onClick={handleAddToCart}>
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

            {isOutOfStock && (
              <div style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>Out of Stock</div>
            )}
          </Col>
        </Row>

        <div className="mt-5" style={{ maxWidth: '1000px', margin: '0 auto', }}>
          <Tabs defaultActiveKey="description" id="product-tabs" className="mb-3" justify
            onSelect={(k) => setActiveTab(k)}
            activeKey={activeTab}
          >
            <Tab eventKey="description" title={<span style={{color: activeTab === 'description' ? '#FFD700' : '#fff', fontWeight: activeTab === 'description' ? 'bold' : 'normal'}}>Deskripsi</span>}>
              <div style={{ whiteSpace: 'pre-line', textAlign: 'left', padding: '10px', background: '#232323', borderRadius: 6, color: 'white' }}>
                {product.description || 'Deskripsi produk tidak tersedia.'}
              </div>
            </Tab>
            <Tab eventKey="review" title={<span style={{color: activeTab === 'review' ? '#FFD700' : '#fff', fontWeight: activeTab === 'review' ? 'bold' : 'normal'}}>Review Produk</span>}>
              <div style={{ background: '#232323', borderRadius: 6, padding: 24, minHeight: 120 }}>
                <div style={{ color: '#FFD700', fontWeight: '600', fontSize: '18px', marginBottom: '15px' }}>
                  Rating: {averageRating.toFixed(1)} / 5
                </div>
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
            </Tab>
          </Tabs>
        </div>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static" keyboard={false}>
        <Modal.Body style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)', color: '#FFD233', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', borderRadius: '6px', textAlign: 'center', fontWeight: '600', fontSize: '1.2rem', lineHeight: '1.5' }}>
          <div style={{ width: 130, height: 130, marginBottom: 20 }}>
            <Lottie animationData={cartAnimation} loop={true} />
          </div>
          PRODUK BERHASIL DITAMBAHKAN<br />DALAM KERANJANG
          <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
            <Button variant='outline-warning' onClick={handleCloseModal} onMouseEnter={() => setHoverClose(true)} onMouseLeave={() => setHoverClose(false)}>Tutup</Button>
            <Button1 label="Lihat Keranjang" onClick={() => { setShowModal(false); handleGoToCart(); }} onMouseEnter={() => setHoverViewCart(true)} onMouseLeave={() => setHoverViewCart(false)}>Lihat Keranjang</Button1>
          </div>
        </Modal.Body>
      </Modal>

      <ModalWishlist show={showWishlistModal} onHide={() => setShowWishlistModal(false)} product={product} isInWishlist={isFavorited} />
    </>
  );
};

export default ProductDetail;
