import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import Button1 from '../../components/Button';  // Komponen Tombol yang sudah Anda buat
import Button2 from '../../components/Button2';  // Komponen Button2 yang baru dibuat
import ModalCancelOrder from '../../components/ModalCancelOrder';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // Use the data passed from the Checkout or OrderDetail page
  const selectedCartItems = state?.selectedCartItems || state?.order?.items || [];
  const totalAmount = state?.totalAmount || state?.order?.totalAmount || state?.order?.total || 0;
  const shippingCost = state?.shippingCost || state?.order?.shippingCost || 0;
  const shippingMethod = state?.shippingMethod || state?.order?.shippingMethod || 'JNE-Reguler';
  const order = state?.order; // Order data from OrderDetail
  const transactionId = state?.transactionId || order?.id; // Transaction ID



  // Untuk testing, jika tidak ada data, gunakan data dummy
  let finalItems = selectedCartItems;
  let finalTotal = totalAmount;
  let finalShipping = shippingCost;

  if (selectedCartItems.length === 0 || totalAmount === 0 || shippingCost === 0) {
    // Data dummy untuk testing - produk reguler
    finalItems = [
      { id: 'prod1', name: 'Gaming Mouse Logitech G502', price: 800000, quantity: 1, category: 'Aksesoris' },
      { id: 'prod2', name: 'Mechanical Keyboard Corsair K70', price: 1500000, quantity: 1, category: 'Aksesoris' },
      { id: 'prod3', name: 'Gaming Headset SteelSeries', price: 1200000, quantity: 1, category: 'Aksesoris' }
    ];
    finalTotal = 3500000;
    finalShipping = 50000;

    console.log('Using dummy data for testing:', { finalItems, finalTotal, finalShipping });
  }

  const subtotal = finalItems.reduce((total, item) => {
    const price = item.selectedVariant && item.selectedVariant.price
      ? item.selectedVariant.price
      : item.price || 0;
    return total + price * (item.quantity || 0);
  }, 0);
  const virtualAccount = '00812345001';

  // Handler untuk file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Ukuran file maksimal 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPaymentProof(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function untuk handle cancel order
  const handleCancelOrder = (reason) => {
    try {
      // Buat data order yang akan dibatalkan
      const cancelledOrder = {
        id: transactionId || `PR${Date.now()}`,
        totalAmount: finalTotal,
        status: 'dibatalkan',
        customerName: 'Nama Pelanggan',
        customerAddress: 'Alamat Pengiriman',
        orderDate: new Date().toLocaleDateString('id-ID'),
        virtualAccount,
        createdAt: new Date().toISOString(),
        cancelledAt: new Date().toISOString(),
        cancelReason: reason,
        items: finalItems,
        subtotal,
        shippingCost: finalShipping,
        shippingMethod: shippingMethod,
        total: finalTotal + finalShipping,
        type: 'product',
      };

      // Update atau tambah ke localStorage
      if (transactionId) {
        // Update existing transaction
        const existing = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        const updatedTransactions = existing.map(t =>
          t.id === transactionId
            ? { ...t, status: 'dibatalkan', cancelledAt: new Date().toISOString(), cancelReason: reason }
            : t
        );
        localStorage.setItem('transactionHistory', JSON.stringify(updatedTransactions));
      } else {
        // Add new cancelled order
        const existing = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        localStorage.setItem('transactionHistory', JSON.stringify([cancelledOrder, ...existing]));
      }

      // Trigger event untuk refresh history
      window.dispatchEvent(new Event('transactionHistoryUpdated'));

      console.log(' Order cancelled successfully');
      alert(`Pesanan berhasil dibatalkan.\nAlasan: ${reason}`);

      // Navigate ke history tab dibatalkan
      navigate('/history?tab=dibatalkan');
    } catch (error) {
      console.error(' Error cancelling order:', error);
      alert('Terjadi kesalahan saat membatalkan pesanan. Silakan coba lagi.');
    }
  };

  const handleConfirmPayment = () => {
    // Validasi form
    if (!paymentProof || !bankName || !accountName || !accountNumber) {
      alert('Harap lengkapi semua data pembayaran dan upload bukti bayar!');
      return;
    }

    try {
      // Data bukti bayar
      const paymentProofData = {
        image: paymentProof,
        bankName: bankName,
        accountName: accountName,
        accountNumber: accountNumber,
        uploadedAt: new Date().toISOString()
      };

      // Jika ada order dari OrderDetail, update statusnya
      if (order && transactionId) {
        // Update status transaksi yang sudah ada
        const existing = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        const updatedTransactions = existing.map(t =>
          t.id === transactionId
            ? {
                ...t,
                status: 'menunggu-verifikasi',
                uploadedAt: new Date().toISOString(),
                paymentProof: paymentProofData
              }
            : t
        );
        localStorage.setItem('transactionHistory', JSON.stringify(updatedTransactions));

        console.log('Status updated to menunggu-verifikasi for transaction:', transactionId);
      } else {
        // Fallback: buat transaksi baru jika tidak ada data dari OrderDetail
        const shippingAddress = JSON.parse(localStorage.getItem('selectedAddress')) || {};

        const newTransaction = {
          id: `PR${Date.now()}`, // Prefix PR untuk Product
          totalAmount,
          status: 'menunggu-verifikasi',
          customerName: shippingAddress.name || 'Nama Pelanggan',
          customerAddress: shippingAddress.address || 'Alamat Pengiriman',
          orderDate: new Date().toLocaleDateString('id-ID'),
          virtualAccount,
          createdAt: new Date().toISOString(),
          uploadedAt: new Date().toISOString(),
          items: finalItems,
          subtotal,
          shippingCost,
          shippingMethod: shippingMethod,
          total: totalAmount + shippingCost,
          type: 'product', // Menandai ini adalah pesanan produk reguler
          paymentProof: paymentProofData
        };

        const existing = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        localStorage.setItem('transactionHistory', JSON.stringify([newTransaction, ...existing]));

        console.log('New transaction created with menunggu-verifikasi status:', newTransaction);
      }

      // Trigger event untuk refresh history
      window.dispatchEvent(new Event('transactionHistoryUpdated'));

      // Alert untuk konfirmasi
      alert('Bukti pembayaran berhasil diupload! Status pesanan diubah ke "Menunggu Verifikasi".');

      // Navigasi ke history tab menunggu verifikasi
      navigate('/history?tab=menungguVerifikasi');
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert('Terjadi kesalahan saat mengupload bukti pembayaran. Silakan coba lagi.');
    }
  };

  return (
    <>
      <Container
        className="py-5"
        style={{
          minHeight: '100vh',
          backgroundColor: '#212121',
          color: '#fff',
          marginTop: 20,
          marginBottom: 20,
          padding: '70px',
          borderRadius: 10,
        }}
      >
        <h2 className="mb-4 text-start">Pembayaran</h2>
        <Row>
          <Col xs={12} lg={7} className="mb-4">
            <Card
              style={{
                backgroundColor: '#383838',
                borderRadius: 6,
                padding: 24,
                color: '#fff',
              }}
            >
              <div className="d-flex flex-column mb-3" style={{ textAlign: 'left' }}>
                <h5 style={{ fontSize: 'var(--he5)', marginBottom: 5, color: '#ABABAB' }}>Nomor Rekening</h5>
                <h2 style={{ fontSize: 'var(--he2)', marginBottom: 0 }}>{virtualAccount}</h2>
              </div>

              <div className="d-flex flex-column mb-3" style={{ textAlign: 'left' }}>
                <h5 style={{ fontSize: 'var(--he5)', marginBottom: 5, color: '#ABABAB' }}>Total Tagihan</h5>
                <h2 style={{ fontSize: 'var(--he2)', marginBottom: 0 }}>Rp {(finalTotal + finalShipping).toLocaleString('id-ID')}</h2>
              </div>
            </Card>

            <h5 style={{ fontSize: 'var(--he5)', color: '#FFD700', marginTop: '20px' }}>
              PENTING: Barang akan diproses ketika pembayaran telah diverifikasi
            </h5>

            {/* Tombol Aksi */}
            <div style={{
              display: 'flex',
              flexDirection: window.innerWidth < 576 ? 'column' : 'row',
              gap: '15px',
              marginTop: '20px'
            }}>
              <Button2
                label="Batalkan Pesanan"
                onClick={() => setShowCancelModal(true)}
                style={{
                  flex: 1,
                  // backgroundColor: '#dc3545',
                  borderColor: '#FDD700',
                  width: '100%'
                }}
              />
              <Button1
                label="Lihat Riwayat"
                onClick={() => navigate('/history')}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  borderColor: '#000000',
                  // color: '#007bff',
                  width: '100%'
                }}
              />
            </div>

            <Card
              style={{
                backgroundColor: '#333',
                borderRadius: 6,
                padding: 24,
                color: '#fff',
                marginTop: 20,
                fontSize: 'var(--he5)',
              }}
            >
              <h2 style={{ marginBottom: 15, textAlign: 'left' }}>Cara Pembayaran</h2>
              <p style={{ fontSize: 'var(--p1)', color: '#ABABAB', textAlign: 'left' }}>
                Cara Pembayaran Melalui Transfer Bank<br />
                1. Pilih Metode Transfer Bank Pilih opsi transfer bank saat melakukan pembayaran.<br />
                2. Dapatkan Informasi Rekening Tujuan Sistem akan menampilkan nomor rekening, nama penerima, dan nominal pembayaran.<br />
                3. Lakukan Transfer melalui Bank Gunakan ATM, mobile banking, internet banking, atau teller untuk mentransfer pembayaran.<br />
                4. Verifikasi dan Proses Pesanan Tim administrasi akan memverifikasi pembayaran dan memproses pesanan.<br />
              </p>
            </Card>
          </Col>

          <Col xs={12} lg={5}>
            <Card
              style={{
                backgroundColor: '#383838',
                borderRadius: 6,
                padding: 20,
                color: '#fff',
                maxWidth: '500px', // Limit width to make it look more like the image
                margin: 'auto', // Center the card
                textAlign: 'start',
              }}
            >
              <h5
                style={{
                  fontSize: 'var(--he4)',
                  textAlign: 'left',
                  fontWeight: 'semibold',
                }}
              >
                Upload Bukti Pembayaran
              </h5>

              <Form>
                {/* Row for Nama Bank and Atas Nama */}
                <Row>
                  <Col xs={12} sm={6} className="mb-3">
                    <Form.Group controlId="formBank">
                      <Form.Label style={{fontSize: 'var(--he5)', fontWeight:"semibold" }}>Nama Bank</Form.Label>
                      <Form.Control
                        as="select"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        style={{
                          borderRadius: '6px',
                          padding: '10px',
                        }}
                      >
                        <option value="">Pilih Bank</option>
                        <option value="BCA">BCA</option>
                        <option value="BNI">BNI</option>
                        <option value="BRI">BRI</option>
                        <option value="Jenius">Jenius</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6} className="mb-3">
                    <Form.Group controlId="formName">
                      <Form.Label style={{fontSize: 'var(--he5)', fontWeight:"semibold" }}>Atas Nama</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nama Anda"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        style={{
                          borderRadius: '6px',
                          padding: '10px',
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Nomor Rekening */}
                <Form.Group controlId="formAccountNumber" className="mt-3">
                  <Form.Label style={{fontSize: 'var(--he5)',fontWeight:"semibold" }}>Nomor Rekening</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nomor Rekening"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    style={{
                      borderRadius: '6px',
                      padding: '10px',
                    }}
                  />
                </Form.Group>

                {/* Upload Bukti Bayar */}
                <Form.Group controlId="formUpload" className="mt-3">
                  <Form.Label style={{fontSize: 'var(--he5)', fontWeight:"semibold" }}>Upload Bukti Bayar</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{
                      borderRadius: '6px',
                      padding: '10px',
                      marginBottom: '15px'
                    }}
                  />
                  {paymentProof && (
                    <div style={{ marginTop: '10px' }}>
                      <img
                        src={paymentProof}
                        alt="Bukti Bayar"
                        style={{
                          width: '100%',
                          maxWidth: '200px',
                          height: 'auto',
                          borderRadius: '6px',
                          border: '1px solid #FFD700'
                        }}
                      />
                    </div>
                  )}
                </Form.Group>

                {/* Button with custom styling */}
                <Button1
                  label="Upload Bukti Bayar"
                  onClick={handleConfirmPayment}
                  style={{width:'100%'}}
                />
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal Cancel Order */}
      <ModalCancelOrder
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        onConfirm={handleCancelOrder}
        orderData={{
          id: transactionId || `PR${Date.now()}`,
          total: finalTotal + finalShipping,
          totalAmount: finalTotal,
          status: 'menunggu-pembayaran',
          items: finalItems
        }}
      />
    </>
  );
};

export default Payment;
