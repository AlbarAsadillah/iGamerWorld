import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import Button1 from '../../../components/Button';
import Button2 from '../../../components/Button2';
import ModalCancelOrder from '../../../components/ModalCancelOrder';

const PaymentCustom = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // Data from navigation state
  const {
    selectedItems,
    totalAmount,
    shippingCost,
    shippingMethod,
    isAssembled,
    paymentMethod,
    transactionId,
    transaction,
  } = state || {};

  // Convert selectedItems to array if it's an object
  const selectedItemsArray = selectedItems
    ? Array.isArray(selectedItems)
      ? selectedItems
      : Object.entries(selectedItems).map(([key, item]) => ({
          id: key,
          ...item,
        }))
    : [];

  // Untuk testing, jika tidak ada data, gunakan data dummy
  let finalItems = selectedItemsArray;
  let finalTotal = totalAmount;
  let finalShipping = shippingCost;

  if (selectedItemsArray.length === 0 || totalAmount === 0 || shippingCost === 0) {
    // Data dummy untuk testing - komponen PC lengkap
    finalItems = [
      { id: 'cpu1', name: 'AMD Ryzen 5 5600X', price: 3500000, quantity: 1, category: 'CPU' },
      { id: 'gpu1', name: 'RTX 3060 Ti', price: 8500000, quantity: 1, category: 'GPU' },
      { id: 'ram1', name: 'Corsair Vengeance LPX 16GB DDR4', price: 1200000, quantity: 1, category: 'RAM' },
      { id: 'mobo1', name: 'MSI B450 Tomahawk MAX', price: 1500000, quantity: 1, category: 'Motherboard' },
      { id: 'storage1', name: 'Samsung 970 EVO 500GB NVMe SSD', price: 1000000, quantity: 1, category: 'Storage' },
      { id: 'psu1', name: 'Corsair CV650 650W 80+ Bronze', price: 800000, quantity: 1, category: 'PSU' },
      { id: 'case1', name: 'Fractal Design Core 1000', price: 500000, quantity: 1, category: 'Case' }
    ];
    finalTotal = 17000000;
    finalShipping = 50000;

    console.log('Using dummy data for testing:', { finalItems, finalTotal, finalShipping });
  }

  const subtotal = finalItems.reduce(
    (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );
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
        id: transactionId || `CP${Date.now()}`,
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
        shippingMethod: shippingMethod || 'JNE-Reguler',
        isAssembled: isAssembled || false,
        paymentMethod: paymentMethod || 'Transfer Bank',
        total: finalTotal + finalShipping,
        type: 'custom-pc',
        customPcName: `Custom PC ${finalItems.find(item => item.name.toLowerCase().includes('rtx') || item.name.toLowerCase().includes('gtx'))?.name || 'GPU'} + ${finalItems.find(item => item.name.toLowerCase().includes('ryzen') || item.name.toLowerCase().includes('intel'))?.name || 'CPU'}`,
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

        const existingCustomPc = JSON.parse(localStorage.getItem('customPcHistory')) || [];
        const updatedCustomPc = existingCustomPc.map(t =>
          t.id === transactionId
            ? { ...t, status: 'dibatalkan', cancelledAt: new Date().toISOString(), cancelReason: reason }
            : t
        );
        localStorage.setItem('customPcHistory', JSON.stringify(updatedCustomPc));
      } else {
        // Add new cancelled order
        const existing = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        localStorage.setItem('transactionHistory', JSON.stringify([cancelledOrder, ...existing]));

        const existingCustomPc = JSON.parse(localStorage.getItem('customPcHistory')) || [];
        localStorage.setItem('customPcHistory', JSON.stringify([cancelledOrder, ...existingCustomPc]));
      }

      // Trigger event untuk refresh history
      window.dispatchEvent(new Event('transactionHistoryUpdated'));

      console.log('✅ Order cancelled successfully');
      alert(`Pesanan berhasil dibatalkan.\nAlasan: ${reason}`);

      // Navigate ke history tab dibatalkan
      navigate('/history?tab=dibatalkan');
    } catch (error) {
      console.error('❌ Error cancelling order:', error);
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

      // Jika ada transaction dari CheckoutCustom, update statusnya
      if (transaction && transactionId) {
        // Update status transaksi yang sudah ada
        const existing = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        const updatedTransactions = existing.map(t =>
          t.id === transactionId
            ? {
                ...t,
                status: 'menungguVerifikasi',
                uploadedAt: new Date().toISOString(),
                paymentProof: paymentProofData
              }
            : t
        );
        localStorage.setItem('transactionHistory', JSON.stringify(updatedTransactions));

        const existingCustomPc = JSON.parse(localStorage.getItem('customPcHistory')) || [];
        const updatedCustomPc = existingCustomPc.map(t =>
          t.id === transactionId
            ? {
                ...t,
                status: 'menungguVerifikasi',
                uploadedAt: new Date().toISOString(),
                paymentProof: paymentProofData
              }
            : t
        );
        localStorage.setItem('customPcHistory', JSON.stringify(updatedCustomPc));

        console.log('✅ Status updated to menunggu-verifikasi for transaction:', transactionId);
      } else {
        // Fallback: buat transaksi baru jika tidak ada data dari CheckoutCustom
        const shippingAddress = JSON.parse(localStorage.getItem('selectedAddress')) || {};
        const gpu = finalItems.find(item => item.name.toLowerCase().includes('rtx') || item.name.toLowerCase().includes('gtx') || item.name.toLowerCase().includes('radeon'));
        const cpu = finalItems.find(item => item.name.toLowerCase().includes('ryzen') || item.name.toLowerCase().includes('intel') || item.name.toLowerCase().includes('core'));
        const customPcName = `Custom PC ${gpu ? gpu.name : 'GPU'} + ${cpu ? cpu.name : 'CPU'}`;

        const newTransaction = {
          id: `CP${Date.now()}`,
          totalAmount: finalTotal,
          status: 'menungguVerifikasi',
          customerName: shippingAddress.name || 'Nama Pelanggan',
          customerAddress: shippingAddress.address || 'Alamat Pengiriman',
          orderDate: new Date().toLocaleDateString('id-ID'),
          virtualAccount,
          createdAt: new Date().toISOString(),
          uploadedAt: new Date().toISOString(),
          items: finalItems,
          subtotal,
          shippingCost: finalShipping,
          shippingMethod: shippingMethod || 'JNE-Reguler',
          isAssembled: isAssembled || false,
          paymentMethod: paymentMethod || 'Transfer Bank',
          total: finalTotal + finalShipping,
          type: 'custom-pc',
          customPcName,
          paymentProof: paymentProofData
        };

        const existing = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        localStorage.setItem('transactionHistory', JSON.stringify([newTransaction, ...existing]));

        const existingCustomPc = JSON.parse(localStorage.getItem('customPcHistory')) || [];
        localStorage.setItem('customPcHistory', JSON.stringify([newTransaction, ...existingCustomPc]));

        console.log('✅ New transaction created with menunggu-verifikasi status:', newTransaction);
      }

      // Trigger event untuk refresh history
      window.dispatchEvent(new Event('transactionHistoryUpdated'));

      // Alert untuk konfirmasi
      alert('Bukti pembayaran berhasil diupload! Status pesanan diubah ke "Menunggu Verifikasi".');

      // Navigasi ke history tab menunggu verifikasi
      navigate('/history?tab=menungguVerifikasi');
    } catch (error) {
      console.error('❌ Error updating transaction:', error);
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
        <h2 className="mb-4 text-start">Pembayaran Custom</h2>
        <Row>
          <Col md={7}>
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
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <Button2
                label="Batalkan Pesanan"
                onClick={() => setShowCancelModal(true)}
                style={{ flex: 1, backgroundColor: '#dc3545', borderColor: '#dc3545' }}
              />
              <Button2
                label="Lihat Riwayat"
                onClick={() => navigate('/history')}
                style={{ flex: 1, backgroundColor: 'transparent', borderColor: '#007bff', color: '#007bff' }}
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

          <Col md={5}>
            <Card
              style={{
                backgroundColor: '#383838',
                borderRadius: 6,
                padding: 20,
                color: '#fff',
                maxWidth: '500px',
                margin: 'auto',
                textAlign: 'start',
              }}
            >
              <h5
                style={{
                  fontSize: 'var(--he4)',
                  marginBottom: 15,
                  textAlign: 'left',
                  fontWeight: 'semibold',
                }}
              >
                Upload Bukti Pembayaran
              </h5>

              <Form>
                <Row>
                  <Col md={6}>
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

                  <Col md={6}>
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

                <Form.Group controlId="formUpload" className="mt-3">
                  <Form.Label style={{fontSize: 'var(--he5)', fontWeight:"semibold" }}>Upload Bukti Bayar</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{
                      borderRadius: '6px',
                      padding: '10px',
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

                <Button1
                  label="Upload Bukti Bayar"
                  onClick={handleConfirmPayment}
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
          id: transactionId || `CP${Date.now()}`,
          total: finalTotal + finalShipping,
          totalAmount: finalTotal,
          status: 'menunggu-pembayaran',
          items: finalItems
        }}
      />
    </>
  );
};

export default PaymentCustom;