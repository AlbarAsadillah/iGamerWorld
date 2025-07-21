import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import Button1 from '../../components/Button';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  // Tambahkan deteksi mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    setSelectedItems(cart.map((item) => item.id));
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cart]);

  const handleCheckboxChange = (productId, e) => {
    e.stopPropagation();

    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productId)) {
        return prevSelectedItems.filter((id) => id !== productId);
      } else {
        return [...prevSelectedItems, productId];
      }
    });
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const totalPrice = cart.reduce((total, item) => {
    const price = item.selectedVariant && item.selectedVariant.price
      ? item.selectedVariant.price
      : item.price || 0;
    if (selectedItems.includes(item.id)) {
      return total + price * item.quantity;
    }
    return total;
  }, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Pilih setidaknya satu produk untuk melanjutkan ke checkout.');
      return;
    }
    const selectedCartItems = cart.filter(item => selectedItems.includes(item.id));
    navigate('/checkout', { state: { selectedCartItems } });
  };

  return (
    <>
      {/* Custom CSS for quantity selector */}
      <style>{`
        .quantity-selector {
          /* No hover effects */
        }
        .quantity-btn {
          border-radius: 50%;
          width: 30px;
          height: 30px;
        }
        @media (max-width: 768px) {
          .quantity-selector {
            min-width: 80px !important;
            padding: 2px 6px !important;
          }
          .quantity-btn {
            width: 22px !important;
            height: 22px !important;
            font-size: 13px !important;
          }
        }
      `}</style>
      <Container
        className="py-5"
        style={{
          minHeight: '100vh',
          backgroundColor: '#212121',
          color: '#fff',
          borderRadius: '10px',
          marginTop: isMobile ? '10px' : '20px',
          marginBottom: isMobile ? '10px' : '20px',
          padding: isMobile ? '16px 4px' : '70px',
        }}
      >
        <h2 className="mb-4 text-start" style={{ fontSize: isMobile ? '18px' : '24px', marginBottom: isMobile ? 10 : 24 }}>Keranjang Belanja</h2>
        {cart.length === 0 ? (
          <p style={{ fontSize: isMobile ? '13px' : undefined }}>Keranjang Anda kosong.</p>
        ) : (
          <Row>
            <Col xs={12} md={8} className="mb-4" style={{ marginBottom: isMobile ? 10 : 24 }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: isMobile ? '8px' : '1rem',
                    cursor: 'pointer',
                    borderRadius: '10px',
                    backgroundColor: '#333',
                    padding: isMobile ? '6px' : '10px',
                  }}
                  onClick={(e) => handleProductClick(item.id, e)}
                >
                  {/* Checkbox di samping luar */}
                  <div style={{ flexShrink: 0, padding: isMobile ? '4px' : '10px' }}>
                    <Form.Check
                      type="checkbox"
                      id={`checkbox-${item.id}`}
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(item.id, e);
                      }}
                      label=""
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  {/* Card produk */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#333',
                      borderRadius: '10px',
                      padding: isMobile ? '6px' : '10px',
                      flex: 1,
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: isMobile ? '48px' : '80px',
                        height: isMobile ? '48px' : '80px',
                        objectFit: 'contain',
                        borderRadius: '5px',
                        marginRight: isMobile ? '8px' : '15px',
                      }}
                    />
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <h5 style={{ marginBottom: isMobile ? '2px' : '5px', fontSize: isMobile ? '13px' : '16px' }}>{item.name}</h5>
                      <p style={{ marginBottom: isMobile ? '2px' : '3px', fontSize: isMobile ? '12px' : '14px' }}>
                        Harga: Rp {
                          item.selectedVariant && item.selectedVariant.price
                            ? item.selectedVariant.price.toLocaleString('id-ID')
                            : item.price?.toLocaleString('id-ID')
                        }
                      </p>
                    </div>
                    {/* Quantity Selector */}
                    <div
                      className="quantity-selector"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#444',
                        borderRadius: '25px',
                        border: '2px solid ',
                        padding: isMobile ? '2px 8px' : '5px 15px',
                        marginLeft: isMobile ? '6px' : '15px',
                        minWidth: isMobile ? '70px' : '120px',
                        justifyContent: 'space-between'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Delete/Minus Button */}
                      <Button
                        variant="link"
                        className={`quantity-btn ${item.quantity === 1 ? 'delete-btn' : 'minus-btn'}`}
                        style={{
                          color: '#fff',
                          fontSize: isMobile ? '13px' : '16px',
                          padding: isMobile ? '2px' : '5px',
                          minWidth: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.quantity === 1) {
                            removeFromCart(item.id);
                          } else {
                            updateQuantity(item.id, item.quantity - 1);
                          }
                        }}
                        aria-label={item.quantity === 1 ? `Hapus ${item.name} dari keranjang` : `Kurangi jumlah ${item.name}`}
                      >
                        {item.quantity === 1 ? <FiTrash2 /> : <FiMinus />}
                      </Button>
                      {/* Quantity Display */}
                      <span
                        style={{
                          color: '#fff',
                          fontSize: isMobile ? '13px' : '16px',
                          fontWeight: '600',
                          minWidth: '20px',
                          textAlign: 'center'
                        }}
                      >
                        {item.quantity}
                      </span>
                      {/* Plus Button */}
                      <Button
                        variant="link"
                        className="quantity-btn"
                        style={{
                          color: '#fff',
                          fontSize: isMobile ? '14px' : '18px',
                          padding: isMobile ? '2px' : '5px',
                          minWidth: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, item.quantity + 1);
                        }}
                        aria-label={`Tambah jumlah ${item.name}`}
                      >
                        <FiPlus />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Col>
            <Col xs={12} md={4} style={{ marginBottom: isMobile ? 10 : 0 }}>
              <div style={{ backgroundColor: '#333', borderRadius: '10px', padding: isMobile ? '12px' : '20px', textAlign: 'left', fontSize: isMobile ? '13px' : '15px' }}>
                <h5 style={{ marginBottom: isMobile ? '10px' : '20px', fontSize: isMobile ? '15px' : '18px' }}>Ringkasan Pesanan</h5>
                <p style={{ fontSize: isMobile ? '13px' : '15px' }}>Total harga: Rp {totalPrice.toLocaleString('id-ID')}</p>
                <Button1 variant="warning" label="Pesan Sekarang" style={{ width: '100%', fontSize: isMobile ? '13px' : '16px', padding: isMobile ? '7px 0' : undefined }} onClick={handleCheckout}>
                  Pesan Sekarang
                </Button1>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default Cart;
