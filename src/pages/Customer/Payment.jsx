import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Payment = () => {
  const { state } = useLocation(); // Get the state passed from the Checkout page
  const { selectedCartItems, totalAmount, shippingCost } = state || {}; // Extract the required data from state

  // Check if the data exists to avoid the undefined error
  if (!selectedCartItems || !totalAmount || !shippingCost) {
    return (
      <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
        <h2 className="mb-4 text-start">Data Tidak Ditemukan</h2>
        <p>Terjadi kesalahan saat memuat data. Silakan coba lagi.</p>
      </Container>
    );
  }

  const subtotal = selectedCartItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
  const virtualAccount = '00812345001';

  const handleConfirmPayment = () => {
    alert('Pembayaran berhasil dikonfirmasi!');
  };

  return (
    <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
      <h2 className="mb-4 text-start">Pembayaran</h2>
      <Row>
        <Col md={12}>
          <Card className="mb-4" style={{ backgroundColor: '#333', border: '1px solid #FFD700', borderRadius: '10px' }}>
            <Card.Body>
              <h5 style={{ color: '#FFD700', fontWeight: 'bold' }}>Info Produk</h5>
              {selectedCartItems?.map((item) => (
                <Row key={item.id} className="mb-3">
                  <Col xs={9}>
                    <h6 style={{ fontWeight: 'bold', color: '#fff' }}>{item.name}</h6>
                    <p style={{ marginBottom: '5px' }}>Rp {item.price.toLocaleString('id-ID')}</p>
                    <p>Qty {item.quantity}</p>
                  </Col>
                </Row>
              ))}
              <hr style={{ borderColor: '#444' }} />
              <div className="d-flex justify-content-between">
                <span>Subtotal Harga Barang</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Ongkos Kirim</span>
                <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Total Belanja</span>
                <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
              </div>
              <hr style={{ borderColor: '#444' }} />
              <div className="d-flex justify-content-between">
                <span>No Virtual Account</span>
                <span>{virtualAccount}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span style={{ fontWeight: 'bold' }}>Total Tagihan</span>
                <span style={{ fontWeight: 'bold' }}>Rp {totalAmount.toLocaleString('id-ID')}</span>
              </div>
              <Button
                variant="warning"
                className="mt-3 w-100"
                style={{ fontWeight: 'bold' }}
                onClick={handleConfirmPayment}
              >
                Konfirmasi Pembayaran
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
