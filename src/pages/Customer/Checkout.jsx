import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import Button1 from '../../components/Button';

const Checkout = () => {
  const { state } = useLocation();
  const { selectedCartItems } = state || {};
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('');
  const [shippingAddress, setShippingAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  const shippingMethods = [
    { id: 'JNE', name: 'JNE', cost: 30000 },
    { id: 'J&T', name: 'J&T', cost: 28000 },
    { id: 'SiCepat', name: 'SiCepat', cost: 25000 },
    { id: 'POS Indonesia', name: 'POS Indonesia', cost: 35000 },
  ];
  const currentShippingMethod = shippingMethods.find(method => method.name === selectedShippingMethod);
  const shippingCost = currentShippingMethod ? currentShippingMethod.cost : 0;

  const paymentMethods = ['BCA Transfer', 'BNI Transfer', 'BRI Transfer', 'Jenius Transfer'];
  const subtotal = selectedCartItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
  const totalPrice = subtotal + shippingCost;

  useEffect(() => {
    const addressData = localStorage.getItem('selectedAddress');
    if (addressData) {
      setShippingAddress(JSON.parse(addressData));
    }
    const allAddresses = localStorage.getItem('addresses');
    if (allAddresses) {
      setAddresses(JSON.parse(allAddresses));
    }
  }, []);

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleSelectAddress = (addr) => {
    localStorage.setItem('selectedAddress', JSON.stringify(addr));
    setShippingAddress(addr);
    setShowAddressModal(false);
  };

  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod || !selectedShippingMethod) {
      alert('Pilih metode pengiriman dan pembayaran terlebih dahulu!');
      return;
    }

    const transaction = {
      id: `PR${Date.now()}`,
      totalAmount: totalPrice,
      status: 'menungguPembayaran',
      customerName: shippingAddress?.name || 'Nama Pelanggan',
      customerAddress: shippingAddress?.address || 'Alamat Pengiriman',
      orderDate: new Date().toLocaleDateString('id-ID'),
      virtualAccount: '00812345001',
      createdAt: new Date().toISOString(),
      items: selectedCartItems,
      subtotal,
      shippingCost,
      shippingMethod: selectedShippingMethod,
      paymentMethod: selectedPaymentMethod,
      total: totalPrice,
      type: 'product',
    };

    try {
      const existingTransactions = JSON.parse(localStorage.getItem('transactionHistory')) || [];
      localStorage.setItem('transactionHistory', JSON.stringify([transaction, ...existingTransactions]));
      window.dispatchEvent(new Event('transactionHistoryUpdated'));

      navigate('/payment', {
        state: {
          selectedCartItems,
          subtotal,
          totalAmount: totalPrice,
          shippingCost,
          shippingMethod: selectedShippingMethod,
          paymentMethod: selectedPaymentMethod,
          transactionId: transaction.id,
          order: transaction,
        },
      });
    } catch (error) {
      console.error('❌ Error saving data:', error);
      alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    }
  };

  const paymentIcons = {
    'BCA Transfer': '/images/BCA.png',
    'BNI Transfer': '/images/BNI.png',
    'BRI Transfer': '/images/BRI.png',
    'Jenius Transfer': '/images/Jenius.png',
  };

  return (
    <Container
      className="py-5"
      style={{
        minHeight: '100vh',
        backgroundColor: '#212121',
        color: '#fff',
        borderRadius: '10px',
        marginTop: '20px',
        marginBottom: '20px',
        textAlign: 'left',
        padding: '70px',
      }}
    >
      <h2 className="mb-4 text-start">Checkout</h2>
      <Row>
        <Col xs={12} md={8} className="mb-4">
          {/* Alamat Pengiriman */}
          <div
            style={{
              backgroundColor: '#333',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '20px',
              // border: '1px solid #FFD700',
              textAlign: 'left',
            }}
          >
            <Row className="align-items-center mb-2">
              <Col>
                <h5 style={{ color: '#FFD700', fontWeight: 'semibold', marginBottom: 0 }}>
                  Alamat Pengiriman
                </h5>
              </Col>
              <Col xs="auto">
                <Button1
                  variant={shippingAddress ? 'outline-warning' : 'warning'}
                  size="sm"
                  onClick={() => setShowAddressModal(true)}
                >
                  {shippingAddress ? 'Ganti Alamat' : 'Pilih Alamat'}
                </Button1>
              </Col>
            </Row>

            {shippingAddress ? (
              <>
                <p className="mb-1">{shippingAddress.name}</p>
                <p className="mb-1">{shippingAddress.phone}</p>
                <p className="mb-1">{shippingAddress.address}</p>
                <p className="mb-0"><em>Catatan: {shippingAddress.note}</em></p>
              </>
            ) : (
              <p className="mb-0">Belum ada alamat. Silakan pilih alamat pengiriman.</p>
            )}
          </div>

          {/* Metode Pengiriman */}
          <div
            style={{
              backgroundColor: '#333',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            <h5 style={{ color: '#FDD700', fontWeight: 'semibold' }}>Pengiriman</h5>
            <Form.Select
              value={selectedShippingMethod}
              onChange={(e) => setSelectedShippingMethod(e.target.value)}
              style={{
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '10px',
              }}
            >
              <option>Pilih pengiriman</option>
              {shippingMethods.map((option, idx) => (
                <option key={option.id} value={option.name}>
                  {option.name} (Rp {option.cost.toLocaleString('id-ID')})
                </option>
              ))}
            </Form.Select>
          </div>

          {/* Daftar Produk */}
          {selectedCartItems?.map((item) => (
            <div
              key={item.id}
              className="product-card mb-4"
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#333',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'left',
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
                  marginRight: '10px',
                }}
              />
              <div style={{ flex: 1, textAlign: 'left' }}>
                <h5>{item.name}</h5>
                <p>Harga: Rp {
                  item.selectedVariant && item.selectedVariant.price
                    ? item.selectedVariant.price.toLocaleString('id-ID')
                    : item.price?.toLocaleString('id-ID')
                }</p>
                <p>Jumlah: {item.quantity}</p>
              </div>
            </div>
          ))}
        </Col>

        {/* Sidebar Ringkasan dan Pembayaran */}
        <Col xs={12} md={4}>
          <div
            style={{
              backgroundColor: '#333',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'left',
            }}
          >
            <h5 style={{ color: '#FFFFFF', fontWeight: 'semibold' }}>Pilih Metode Pembayaran</h5>
            {paymentMethods.map((method, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={paymentIcons[method]}
                    alt={method}
                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                  />
                  <span style={{ color: '#FFFFFF' }}>{method}</span>
                </div>
                <Form.Check
                  type="radio"
                  id={`payment-method-${idx}`}
                  value={method}
                  checked={selectedPaymentMethod === method}
                  onChange={handlePaymentMethodChange}
                  style={{ color: '#FFFFFF' }}
                />
              </div>
            ))}
            <hr style={{ borderColor: '#444' }} />
            <h5 style={{ marginBottom: '20px' }}>Ringkasan Pesanan</h5>
            <div className="d-flex justify-content-between">
              <span>Total harga:</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Ongkos kirim:</span>
              <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
            </div>
            <hr style={{ borderColor: '#444' }} />
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>Rp {totalPrice.toLocaleString('id-ID')}</strong>
            </div>
            <Button1
              label={'Bayar Sekarang'}
              variant="warning"
              className="mt-3 w-100"
              onClick={handleConfirmPayment}
            >
              Bayar Sekarang
            </Button1>
          </div>
        </Col>
      </Row>

      {/* Modal Pilih Alamat - Dark Mode */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#222', color: '#fff' }}>
          <Modal.Title>Pilih Alamat Pengiriman</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
          {addresses.length === 0 ? (
            <p>Belum ada alamat. Silakan tambahkan alamat di halaman Address Book.</p>
          ) : (
            addresses.map((addr) => (
              <div
                key={addr.id}
                style={{
                  border: '1px solid #444',
                  borderRadius: '10px',
                  padding: '10px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  backgroundColor: '#2c2c2c',
                }}
                onClick={() => handleSelectAddress(addr)}
              >
                <strong>{addr.name}</strong>
                <p>{addr.phone}</p>
                <p>{addr.address}</p>
                <p><em>Catatan: {addr.note}</em></p>
                {addr.isDefault && <span style={{color:'#FFD700', fontWeight:'bold'}}>Alamat Utama</span>}
              </div>
            ))
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Checkout;
