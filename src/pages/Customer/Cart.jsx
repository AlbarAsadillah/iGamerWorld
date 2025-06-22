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

  useEffect(() => {
    setSelectedItems(cart.map((item) => item.id));
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
    if (selectedItems.includes(item.id)) {
      return total + item.price * item.quantity;
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
          /* No hover effects */
        }

        @media (max-width: 768px) {
          .quantity-selector {
            min-width: 100px !important;
            padding: 3px 10px !important;
          }

          .quantity-btn {
            width: 25px !important;
            height: 25px !important;
            font-size: 14px !important;
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
          marginTop: '20px',
          marginBottom: '20px',
          padding: '70px',
        }}
      >
      <h2 className="mb-4 text-start">Keranjang Belanja</h2>
      {cart.length === 0 ? (
        <p>Keranjang Anda kosong.</p>
      ) : (
        <Row>
          <Col xs={12} md={8} className="mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  backgroundColor: '#333',
                  padding: '10px',
                }}
                onClick={(e) => handleProductClick(item.id, e)}
              >
                {/* Checkbox di samping luar */}
                <div style={{ flexShrink: 0, padding: '10px' }}>
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
                    padding: '10px',
                    flex: 1,
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      borderRadius: '5px',
                      marginRight: '15px',
                    }}
                  />

                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <h5 style={{ marginBottom: '5px' }}>{item.name}</h5>
                    <p style={{ marginBottom: '3px' }}>Harga: Rp {item.price.toLocaleString('id-ID')}</p>
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
                      padding: '5px 15px',
                      marginLeft: '15px',
                      minWidth: '120px',
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
                        fontSize: '16px',
                        padding: '5px',
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
                        fontSize: '16px',
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
                        fontSize: '18px',
                        padding: '5px',
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

          <Col xs={12} md={4}>
            <div style={{ backgroundColor: '#333', borderRadius: '10px', padding: '20px', textAlign: 'left' }}>
              <h5 style={{ marginBottom: '20px' }}>Ringkasan Pesanan</h5>
              <p>Total harga: Rp {totalPrice.toLocaleString('id-ID')}</p>
              <Button1 variant="warning" label="Pesan Sekarang" style={{ width: '100%' }} onClick={handleCheckout}>
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
