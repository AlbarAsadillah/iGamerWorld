import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import Button1 from '../../../components/Button';

const CheckoutCustom = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    selectedItems,
    isAssembled,
    shippingMethod,
    grandTotal,
  } = state || {};

  // Ubah selectedItems (objek) ke array
  const selectedItemsArray = selectedItems
    ? Object.entries(selectedItems).map(([id, item]) => ({
        id,
        ...item,
      }))
    : [];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [shippingAddress, setShippingAddress] = useState(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('');

  useEffect(() => {
    const addressData = localStorage.getItem('selectedAddress');
    if (addressData) {
      setShippingAddress(JSON.parse(addressData));
    }
  }, []);

  // Shipping methods data
  const shippingMethods = [
    { id: 'JNE', name: 'JNE', cost: 30000, duration: '3-5 hari' },
    { id: 'J&T', name: 'J&T', cost: 28000, duration: '2-3 hari' },
    { id: 'SiCepat', name: 'SiCepat', cost: 25000, duration: '2-4 hari' },
    { id: 'POS Indonesia', name: 'POS Indonesia', cost: 35000, duration: '4-6 hari' },
  ];

  // Hitung total harga produk
  const subtotal = selectedItemsArray.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  const assemblyFee = isAssembled ? 150000 : 0;
  const currentShippingMethod = shippingMethods.find(method => method.name === selectedShippingMethod);
  const shippingCost = currentShippingMethod ? currentShippingMethod.cost : 30000;
  const totalPrice = subtotal + assemblyFee + shippingCost;

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod || !selectedShippingMethod) {
      alert('Pilih metode pengiriman dan pembayaran terlebih dahulu!');
      return;
    }

    // Ambil alamat dari localStorage
    const shippingAddress = JSON.parse(localStorage.getItem('selectedAddress')) || {};

    // Buat nama custom PC berdasarkan GPU dan CPU
    const gpu = selectedItemsArray.find(item =>
      item.name.toLowerCase().includes('rtx') ||
      item.name.toLowerCase().includes('gtx') ||
      item.name.toLowerCase().includes('radeon')
    );
    const cpu = selectedItemsArray.find(item =>
      item.name.toLowerCase().includes('ryzen') ||
      item.name.toLowerCase().includes('intel') ||
      item.name.toLowerCase().includes('core')
    );

    const customPcName = `Custom PC ${gpu ? gpu.name : 'GPU'} + ${cpu ? cpu.name : 'CPU'}`;

    // Buat transaksi dengan status menunggu pembayaran
    const transaction = {
      id: `CP${Date.now()}`,
      totalAmount: totalPrice,
      status: 'menungguPembayaran', // Status awal
      customerName: shippingAddress.name || 'Nama Pelanggan',
      customerAddress: shippingAddress.address || 'Alamat Pengiriman',
      orderDate: new Date().toLocaleDateString('id-ID'),
      virtualAccount: '00812345001',
      createdAt: new Date().toISOString(),
      items: selectedItemsArray,
      subtotal,
      shippingCost,
      assemblyFee,
      shippingMethod: selectedShippingMethod,
      isAssembled: isAssembled || false,
      paymentMethod: selectedPaymentMethod,
      total: totalPrice,
      type: 'custom-pc',
      customPcName,
    };

    try {
      // Simpan data ke localStorage
      const existing = JSON.parse(localStorage.getItem('transactionHistory')) || [];
      localStorage.setItem('transactionHistory', JSON.stringify([transaction, ...existing]));

      const existingCustomPc = JSON.parse(localStorage.getItem('customPcHistory')) || [];
      localStorage.setItem('customPcHistory', JSON.stringify([transaction, ...existingCustomPc]));

      // Trigger event untuk refresh history
      window.dispatchEvent(new Event('transactionHistoryUpdated'));

      console.log('✅ Data tersimpan dari CheckoutCustom:', transaction);

      // Navigasi ke PaymentCustom dengan data transaksi
      navigate('/paymentcustom', {
        state: {
          selectedItems: selectedItemsArray,
          totalAmount: totalPrice,
          shippingCost,
          isAssembled,
          shippingMethod: selectedShippingMethod,
          paymentMethod: selectedPaymentMethod,
          transactionId: transaction.id, // Pass transaction ID
          transaction: transaction, // Pass full transaction data
        },
      });
    } catch (error) {
      console.error('❌ Error saving data:', error);
      alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    }
  };

  const paymentMethods = ['BCA Transfer', 'BNI Transfer', 'BRI Transfer', 'Jenius Transfer'];
  const paymentIcons = {
    'BCA Transfer': "/images/BCA.png",
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
      <h2 className="mb-4 text-start">Checkout Custom</h2>
      <Row>
        <Col xs={12} md={8} className="mb-4">
          <Card
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
          </Card>

          <Card
            style={{
              backgroundColor: '#333',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '20px',
              textAlign: 'left',
            }}
          >
            <h5 style={{ color: '#FFD700', fontWeight: 'semibold' }}>Pengiriman</h5>
            <Form.Select
              value={selectedShippingMethod}
              onChange={(e) => setSelectedShippingMethod(e.target.value)}
              style={{
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '10px',
              }}
            >
              <option value="">Pilih pengiriman</option>
              {shippingMethods.map((method, idx) => (
                <option key={idx} value={method.name}>
                  {method.name}
                </option>
              ))}
            </Form.Select>
          </Card>

          {selectedItemsArray.length === 0 ? (
            <p style={{ color: '#ccc' }}>Tidak ada produk yang dipilih.</p>
          ) : (
            selectedItemsArray.map((item) => (
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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                  }}
                />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h5>{item.name}</h5>
                  <p>Harga: Rp {item.price.toLocaleString('id-ID')}</p>
                  <p>Jumlah: {item.quantity || 1}</p>
                </div>
              </div>
            ))
          )}
        </Col>

        <Col xs={12} md={4}>
          <Card
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
              <span>Harga Komponen:</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            {isAssembled && (
              <div className="d-flex justify-content-between">
                <span>Biaya Perakitan:</span>
                <span>Rp {assemblyFee.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="d-flex justify-content-between">
              <span>Ongkos Kirim{selectedShippingMethod ? ` (${selectedShippingMethod})` : ''}:</span>
              <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
            </div>
            <hr style={{ borderColor: '#444' }} />
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>Rp {totalPrice.toLocaleString('id-ID')}</strong>
            </div>
            <Button1
              label="Bayar Sekarang"
              variant="warning"
              className="mt-3 w-100"
              onClick={handleConfirmPayment}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutCustom;
