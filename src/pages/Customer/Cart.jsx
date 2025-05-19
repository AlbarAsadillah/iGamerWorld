import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // State to track selected items, initialized with all product IDs in the cart
  const [selectedItems, setSelectedItems] = useState([]);

  // Initialize selectedItems with all product IDs when the cart changes
  useEffect(() => {
    setSelectedItems(cart.map((item) => item.id));
  }, [cart]);

  // Handle checkbox change
  const handleCheckboxChange = (productId, e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent div

    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productId)) {
        // Deselect the item if it's already selected
        return prevSelectedItems.filter((id) => id !== productId);
      } else {
        // Select the item
        return [...prevSelectedItems, productId];
      }
    });
  };

  // Navigate to product detail page when a product card is clicked
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Calculate total price based on selected items
  const totalPrice = cart.reduce((total, item) => {
    if (selectedItems.includes(item.id)) {
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);

  // Handle navigation to checkout page
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Pilih setidaknya satu produk untuk melanjutkan ke checkout.');
      return;
    }
    // Send selected items to the checkout page via state
    const selectedCartItems = cart.filter(item => selectedItems.includes(item.id));
    navigate('/checkout', { state: { selectedCartItems } });
  };

  return (
    <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
      <h2 className="mb-4 text-start">Keranjang Belanja</h2>
      {cart.length === 0 ? (
        <p>Keranjang Anda kosong.</p>
      ) : (
        <Row>
          <Col xs={12} md={8} className="mb-4">
            {/* Product List */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="product-card mb-4"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#333',
                  borderRadius: '10px',
                  padding: '10px',
                  cursor: 'pointer',
                }}
                onClick={(e) => handleProductClick(item.id, e)}
              >
                {/* Checkbox on the left of the image */}
                <Form.Check
                  type="checkbox"
                  id={`checkbox-${item.id}`}
                  label=""
                  checked={selectedItems.includes(item.id)} // Checkbox is checked if the item is in selectedItems
                  onChange={(e) => handleCheckboxChange(item.id, e)}
                  style={{ marginRight: '10px', flexShrink: 0 }}
                />

                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '5px', marginRight: '10px' }}
                />

                <div style={{ flex: 1 }}>
                  <h5>{item.name}</h5>
                  <p>Harga: Rp {item.price.toLocaleString('id-ID')}</p>
                  <p>Jumlah: {item.quantity}</p>
                </div>

                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(item.id);
                  }}
                >
                  Hapus
                </Button>
              </div>
            ))}
          </Col>

          <Col xs={12} md={4}>
            {/* Order Summary */}
            <div style={{ backgroundColor: '#333', borderRadius: '10px', padding: '20px' }}>
              <h5 style={{ marginBottom: '20px' }}>Ringkasan Pesanan</h5>
              <p>Total harga: Rp {totalPrice.toLocaleString('id-ID')}</p>
              <Button variant="warning" style={{ width: '100%' }} onClick={handleCheckout}>
                Pesan Sekarang
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
