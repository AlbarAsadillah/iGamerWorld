import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';

const Checkout = () => {
  const { state } = useLocation();
  const { selectedCartItems } = state || {};
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const navigate = useNavigate();

  const shippingAddress = {
    name: 'Rudi Yulianto',
    phone: '086732125321',
    address: 'Jl. Amir Mahmud no. 35 Surabaya, Jawa Timur 6049',
  };

  const shippingOptions = ['JNE', 'J&T', 'SiCepat', 'POS Indonesia'];

  const totalPrice = selectedCartItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
  const shippingCost = 25000;

  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod) {
      alert('Pilih metode pembayaran terlebih dahulu!');
      return;
    }
    navigate('/payment', {
      state: {
        selectedCartItems,
        totalAmount: totalPrice + shippingCost,
        shippingCost,
      },
    });
  };

  return (
    <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
      <h2 className="mb-4 text-start">Checkout</h2>
      <Row>
        <Col md={8}>
          <Card className="mb-4" style={{ backgroundColor: '#333', border: '1px solid #FFD700', borderRadius: '10px' }}>
            <Card.Body>
              <h5 style={{ color: '#FFD700', fontWeight: 'bold' }}>Alamat Pengiriman</h5>
              <p>{shippingAddress.name}</p>
              <p>{shippingAddress.phone}</p>
              <p>{shippingAddress.address}</p>
            </Card.Body>
          </Card>

          <Card className="mb-4" style={{ backgroundColor: '#333', borderRadius: '10px' }}>
            <Card.Body>
              {selectedCartItems?.map((item) => (
                <Row key={item.id} className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                  <Col xs={3}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: 'auto', borderRadius: '10px', objectFit: 'cover' }}
                    />
                  </Col>
                  <Col xs={9}>
                    <h6 style={{ fontWeight: 'bold', color: '#fff' }}>{item.name}</h6>
                    <p>Rp {item.price.toLocaleString('id-ID')}</p>
                    <p>Qty {item.quantity}</p>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>

          <Card style={{ backgroundColor: '#333', borderRadius: '10px' }}>
            <Card.Body>
              <h5 style={{ fontWeight: 'bold', color: '#FFD700' }}>Pengiriman</h5>
              <Form.Select
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  borderRadius: '10px',
                  marginBottom: '10px',
                }}
              >
                <option>Pilih pengiriman</option>
                {shippingOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card style={{ backgroundColor: '#333', borderRadius: '10px', padding: '20px' }}>
            <h5 style={{ fontWeight: 'bold', color: '#FFD700' }}>Ringkasan Pesanan</h5>
            <hr style={{ borderColor: '#444' }} />
            <div className="d-flex justify-content-between">
              <span>Total harga</span>
              <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Ongkos kirim</span>
              <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
            </div>
            <hr style={{ borderColor: '#444' }} />
            <div className="d-flex justify-content-between">
              <span style={{ fontWeight: 'bold' }}>Total</span>
              <span style={{ fontWeight: 'bold' }}>
                Rp {(totalPrice + shippingCost).toLocaleString('id-ID')}
              </span>
            </div>
            <Button
              variant="warning"
              className="mt-3 w-100"
              style={{ fontWeight: 'bold' }}
              onClick={handlePayment}
            >
              Lanjut Pembayaran
            </Button>
          </Card>
        </Col>
      </Row>

      <Modal show={showPaymentModal} onHide={handleClosePaymentModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pembayaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Pilih metode pembayaran</Form.Label>
            <Form.Select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              style={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
            >
              <option value="">Pilih metode pembayaran</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="Kartu Kredit">Kartu Kredit</option>
              <option value="E-Wallet">E-Wallet</option>
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <span>Total tagihan</span>
            <span>Rp {(totalPrice + shippingCost).toLocaleString('id-ID')}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePaymentModal}>
            Batal
          </Button>
          <Button variant="warning" onClick={handleConfirmPayment}>
            Bayar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Checkout;