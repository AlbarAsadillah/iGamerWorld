import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Button1 from '../../components/Button';

const Checkout = () => {
  const { state } = useLocation();
  const { selectedCartItems } = state || {};
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('');
  const [shippingAddress, setShippingAddress] = useState(null);
  const navigate = useNavigate();

  const shippingOptions = ['JNE', 'J&T', 'SiCepat', 'POS Indonesia'];
  const paymentMethods = ['BCA Transfer', 'BNI Transfer', 'BRI Transfer', 'Jenius Transfer'];
  const shippingCost = 25000;
  
  // Calculate the subtotal from the cart items
  const subtotal = selectedCartItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  // Total price to include shipping cost
  const totalPrice = subtotal + shippingCost;

  useEffect(() => {
    const addressData = localStorage.getItem('selectedAddress');
    if (addressData) {
      setShippingAddress(JSON.parse(addressData));
    }
  }, []);

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod || !selectedShippingMethod) {
      alert('Pilih metode pengiriman dan pembayaran terlebih dahulu!');
      return;
    }

    // Create the transaction object
    const transaction = {
      id: `PR${Date.now()}`, // Prefix PR untuk Product
      totalAmount: totalPrice,
      status: 'menungguPembayaran', // Status awal
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
      type: 'product', // Menandai ini adalah pesanan produk reguler
    };

    try {
      // Save the transaction in local storage
      const existingTransactions = JSON.parse(localStorage.getItem('transactionHistory')) || [];
      localStorage.setItem('transactionHistory', JSON.stringify([transaction, ...existingTransactions]));

      // Trigger event untuk refresh history
      window.dispatchEvent(new Event('transactionHistoryUpdated'));

      console.log('✅ Data tersimpan dari Checkout:', transaction);

      // Navigate to the payment page dengan data transaksi
      navigate('/payment', {
        state: {
          selectedCartItems,
          subtotal,
          totalAmount: totalPrice,
          shippingCost,
          shippingMethod: selectedShippingMethod,
          paymentMethod: selectedPaymentMethod,
          transactionId: transaction.id, // Pass transaction ID
          order: transaction, // Pass full transaction data
        },
      });
    } catch (error) {
      console.error('❌ Error saving data:', error);
      alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    }
  };

  const paymentIcons = {
    'BCA Transfer': "/images/BCA.png", // Replace with actual logo image paths
    'BNI Transfer': "/images/BNI.png",
    'BRI Transfer': "/images/BRI.png",
    'Jenius Transfer': "/images/Jenius.png",
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
          <div
            style={{
              backgroundColor: '#333',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '20px',
              border: '1px solid #FFD700',
              textAlign: 'left',
            }}
          >
            <h5 style={{ color: '#FFD700', fontWeight: 'semibold' }}>Alamat Pengiriman</h5>
            {shippingAddress ? (
              <>
                <p>{shippingAddress.name}</p>
                <p>{shippingAddress.phone}</p>
                <p>{shippingAddress.address}</p>
              </>
            ) : (
              <>
                <p>Belum ada alamat. Silakan pilih di halaman alamat.</p>
                <Button variant="warning" size="sm" onClick={() => navigate('/address')}>
                  Pilih Alamat
                </Button>
              </>
            )}
          </div>

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
              {shippingOptions.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </div>

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
                <p>Harga: Rp {item.price.toLocaleString('id-ID')}</p>
                <p>Jumlah: {item.quantity}</p>
              </div>
            </div>
          ))}
        </Col>

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
                  justifyContent: 'space-between', // Spacing out the radio button and text
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={paymentIcons[method]} // Bank icon displayed here
                    alt={method}
                    style={{
                      width: '50px',
                      height: '50px',
                      marginRight: '10px',
                    }}
                  />
                  <span style={{ color: '#FFFFFF' }}>{method}</span>
                </div>
                <Form.Check
                  type="radio"
                  id={`payment-method-${idx}`}
                  value={method}
                  checked={selectedPaymentMethod === method}
                  onChange={handlePaymentMethodChange}
                  style={{
                    color: '#FFFFFF',
                    marginLeft: '0px',
                  }}
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
              label={"Bayar Sekarang"}
              variant="warning"
              className="mt-3 w-100"
              onClick={handleConfirmPayment}
            >
              Bayar Sekarang
            </Button1>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
