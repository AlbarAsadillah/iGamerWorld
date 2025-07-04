import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Button, Breadcrumb, Card, Table, Input, Select, message, Modal, Image, Upload } from 'antd';
import { FileImageOutlined, UploadOutlined } from '@ant-design/icons';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideNav from '../../components/AdminSideNav';
import { useNavigate, useParams } from 'react-router-dom';

const { Content } = Layout;
const { Option } = Select;

// Dummy data custom PC (sama dengan yang di AdminCustomPC)
const customPcDataDummy = {
  diproses: [
    {
      id: 'CP001',
      createdAt: '2025-05-01T10:30:00',
      status: 'diproses',
      items: [{ id: 1, name: 'Custom PC Ryzen 5', price: 12000000, quantity: 1 }],
      total: 12000000,
      resi: '',
    },
    {
      id: 'CP002',
      createdAt: '2025-05-03T12:00:00',
      status: 'diproses',
      items: [{ id: 2, name: 'Custom PC Intel i7', price: 15000000, quantity: 1 }],
      total: 15000000,
      resi: '',
    },
  ],
  siapDikirim: [
    {
      id: 'CP003',
      createdAt: '2025-04-28T14:00:00',
      status: 'siapDikirim',
      items: [{ id: 3, name: 'Custom PC GTX 3080', price: 22000000, quantity: 1 }],
      total: 22000000,
      resi: 'JNE123456789',
    },
  ],
  dalamPengiriman: [],
  selesai: [
    {
      id: 'CP004',
      createdAt: '2025-04-20T09:15:00',
      status: 'selesai',
      items: [{ id: 4, name: 'Custom PC RTX 3090', price: 30000000, quantity: 1 }],
      total: 30000000,
      resi: 'JNE987654321',
    },
  ],
  dibatalkan: [],
};

const statusOptions = [
  { label: 'Diproses', value: 'diproses' },
  { label: 'Dalam Pengiriman', value: 'dalamPengiriman' },
  { label: 'Siap Dikirim', value: 'siapDikirim' },
  { label: 'Dibatalkan', value: 'dibatalkan' },
  { label: 'Selesai', value: 'selesai' },
];

const mapStatusToCamelCase = (status) => {
  if (!status) return 'menungguVerifikasi';
  const lower = status.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
  switch (lower) {
    case 'menungguverifikasi': return 'menungguVerifikasi';
    case 'diproses': return 'diproses';
    case 'dalampengiriman': return 'dalamPengiriman';
    case 'siapdikirim': return 'dalamPengiriman'; // Map siap dikirim to dalam pengiriman
    case 'selesai': return 'selesai';
    case 'dibatalkan': return 'dibatalkan';
    default: return 'menungguVerifikasi';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'menungguVerifikasi': return 'Menunggu Verifikasi';
    case 'diproses': return 'Diproses';
    case 'dalamPengiriman': return 'Dalam Pengiriman';
    case 'selesai': return 'Selesai';
    case 'dibatalkan': return 'Dibatalkan';
    default: return 'Unknown';
  }
};

const AdminEditCustom = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('menungguVerifikasi');
  const [resi, setResi] = useState('');
  const [paymentProofModal, setPaymentProofModal] = useState(false);
  const [selectedPaymentProof, setSelectedPaymentProof] = useState(null);
  const [selectedShippingProof, setSelectedShippingProof] = useState(null);
  const [verificationModal, setVerificationModal] = useState(false);
  const [shippingModal, setShippingModal] = useState(false);
  const [shippingProof, setShippingProof] = useState(null);
  const [shippingProofList, setShippingProofList] = useState([]);

  useEffect(() => {
    // Cari order di localStorage (transactionHistory dan customPcHistory)
    const localHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const customPcHistory = JSON.parse(localStorage.getItem('customPcHistory')) || [];

    // Cari di transactionHistory terlebih dahulu
    let foundOrder = localHistory.find((o) => String(o.id) === orderId);

    // Jika tidak ditemukan, cari di customPcHistory
    if (!foundOrder) {
      foundOrder = customPcHistory.find((o) => String(o.id) === orderId);
    }

    // Jika masih tidak ditemukan, coba cari di dummy data sebagai fallback
    if (!foundOrder) {
      for (const key of Object.keys(customPcDataDummy)) {
        foundOrder = customPcDataDummy[key].find((o) => o.id === orderId);
        if (foundOrder) break;
      }
    }

    if (foundOrder) {
      setOrder({
        orderId: foundOrder.id,
        invoice: `INV-${foundOrder.id}`,
        date: new Date(foundOrder.createdAt || foundOrder.orderDate).toLocaleDateString('id-ID'),
        customer: foundOrder.customerName || foundOrder.customer || 'Albar A',
        phone: foundOrder.customerPhone || foundOrder.phone || '-',
        address: foundOrder.customerAddress || foundOrder.address || '-',
        status: mapStatusToCamelCase(foundOrder.status),
        shipping: foundOrder.shippingMethod || foundOrder.shipping || 'JNE-Reguler',
        shippingCost: foundOrder.shippingCost || 25000,
        resi: foundOrder.resi || '',
        total: foundOrder.total || foundOrder.totalAmount || 0,
        items: (foundOrder.items || []).map((item) => ({
          productId: item.id || item.productId,
          qty: item.quantity || item.qty || 1,
          name: item.name,
          category: item.category || '-',
          price: item.price || 0,
          variant: item.variant || null,
          image: item.image || '/images/products/default.png',
          description: item.description || '',
        })),
      });
      setStatus(mapStatusToCamelCase(foundOrder.status));
      setResi(foundOrder.resi || '');
    }
  }, [orderId]);

  if (!order) return <div style={{ padding: 32 }}>Order not found</div>;

  // Helper untuk menampilkan harga satuan (handle varian & undefined)
  const getDisplayPrice = (item) => {
    if (item.variant && typeof item.variant.price === 'number') {
      return item.variant.price;
    }
    if (typeof item.price === 'number') {
      return item.price;
    }
    if (item.variants && item.variants.length > 0) {
      const minPrice = Math.min(...item.variants.map(v => v.price));
      return minPrice;
    }
    return 0;
  };

  const columns = [
    {
      title: 'Product Id',
      dataIndex: 'productId',
      key: 'productId',
      align: 'center',
    },
    {
      title: 'Nama Produk',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={record.image} alt={record.name} style={{ width: 32, height: 32, objectFit: 'contain' }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (_, record) => `Rp ${getDisplayPrice(record).toLocaleString('id-ID')}`,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center',
      render: (qty) => qty || 1,
    },
    {
      title: 'Sub Total',
      key: 'subtotal',
      align: 'right',
      render: (_, record) => {
        const price = getDisplayPrice(record);
        const qty = record.qty || 1;
        return `Rp ${(price * qty).toLocaleString('id-ID')}`;
      },
    },
  ];

  const handleViewPaymentProof = () => {
    // Cek di customPcHistory untuk bukti bayar dan bukti pengiriman
    const localCustomPc = JSON.parse(localStorage.getItem('customPcHistory')) || [];
    const localOrder = localCustomPc.find((o) => String(o.id) === orderId);

    // Jika tidak ada di customPcHistory, cek di transactionHistory
    if (!localOrder || (!localOrder.paymentProof && !localOrder.shippingProof)) {
      const localOrders = JSON.parse(localStorage.getItem('transactionHistory')) || [];
      const transactionOrder = localOrders.find((o) => String(o.id) === orderId);

      if (transactionOrder && (transactionOrder.paymentProof || transactionOrder.shippingProof)) {
        setSelectedPaymentProof(transactionOrder.paymentProof);
        setSelectedShippingProof(transactionOrder.shippingProof);
        setPaymentProofModal(true);
      }
    } else {
      setSelectedPaymentProof(localOrder.paymentProof);
      setSelectedShippingProof(localOrder.shippingProof);
      setPaymentProofModal(true);
    }
  };

  // Fungsi untuk verifikasi pembayaran
  const handleVerifyPayment = () => {
    // Cek di customPcHistory untuk bukti bayar
    const localCustomPc = JSON.parse(localStorage.getItem('customPcHistory')) || [];
    const localOrder = localCustomPc.find((o) => String(o.id) === orderId);

    // Jika tidak ada di customPcHistory, cek di transactionHistory
    if (!localOrder || !localOrder.paymentProof) {
      const localOrders = JSON.parse(localStorage.getItem('transactionHistory')) || [];
      const transactionOrder = localOrders.find((o) => String(o.id) === orderId);

      if (transactionOrder && transactionOrder.paymentProof) {
        setSelectedPaymentProof(transactionOrder.paymentProof);
        setVerificationModal(true);
      } else {
        message.error('Bukti pembayaran tidak ditemukan!');
      }
    } else {
      setSelectedPaymentProof(localOrder.paymentProof);
      setVerificationModal(true);
    }
  };

  // Fungsi untuk konfirmasi verifikasi
  const handleConfirmVerification = () => {
    const localHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const customPcHistory = JSON.parse(localStorage.getItem('customPcHistory')) || [];

    // Update di transactionHistory
    const updatedHistory = localHistory.map((o) => {
      if (String(o.id) === orderId) {
        return { ...o, status: 'diproses' };
      }
      return o;
    });

    // Update di customPcHistory
    const updatedCustomPc = customPcHistory.map((o) => {
      if (String(o.id) === orderId) {
        return { ...o, status: 'diproses' };
      }
      return o;
    });

    localStorage.setItem('transactionHistory', JSON.stringify(updatedHistory));
    localStorage.setItem('customPcHistory', JSON.stringify(updatedCustomPc));

    setStatus('diproses');
    setVerificationModal(false);
    message.success('Pembayaran berhasil diverifikasi! Status diubah menjadi Diproses.');
    window.dispatchEvent(new Event('transactionHistoryUpdated'));
  };

  // Fungsi untuk proses pengiriman
  const handleProcessShipping = () => {
    setShippingModal(true);
  };

  // Fungsi untuk handle upload foto bukti pengiriman
  const handleShippingProofUpload = (info) => {
    const { fileList } = info;
    setShippingProofList(fileList);

    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.status === 'done' || file.originFileObj) {
        // Simpan hanya nama file, bukan base64
        setShippingProof(file.name);
      }
    } else {
      setShippingProof(null);
    }
  };

  // Fungsi untuk konfirmasi pengiriman
  const handleConfirmShipping = () => {
    if (!resi.trim()) {
      message.error('Nomor resi harus diisi!');
      return;
    }

    if (!shippingProof) {
      message.error('Bukti pengiriman harus diupload!');
      return;
    }

    const localHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const customPcHistory = JSON.parse(localStorage.getItem('customPcHistory')) || [];

    // Update di transactionHistory
    const updatedHistory = localHistory.map((o) => {
      if (String(o.id) === orderId) {
        return {
          ...o,
          status: 'dalamPengiriman',
          resi: resi,
          shippingProof: shippingProof, // hanya nama file
        };
      }
      return o;
    });

    // Update di customPcHistory
    const updatedCustomPc = customPcHistory.map((o) => {
      if (String(o.id) === orderId) {
        return {
          ...o,
          status: 'dalamPengiriman',
          resi: resi,
          shippingProof: shippingProof, // hanya nama file
        };
      }
      return o;
    });

    localStorage.setItem('transactionHistory', JSON.stringify(updatedHistory));
    localStorage.setItem('customPcHistory', JSON.stringify(updatedCustomPc));

    setStatus('dalamPengiriman');
    setShippingModal(false);
    setShippingProof(null);
    setShippingProofList([]);
    message.success('Pesanan berhasil dikirim! Status diubah menjadi Dalam Pengiriman.');
    window.dispatchEvent(new Event('transactionHistoryUpdated'));
  };

  // Fungsi untuk batalkan pesanan
  const handleCancelOrder = () => {
    let cancelReason = '';

    Modal.confirm({
      title: 'Batalkan Pesanan',
      content: (
        <div>
          <p>Apakah Anda yakin ingin membatalkan pesanan ini?</p>
          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Alasan Pembatalan:
            </label>
            <Input.TextArea
              placeholder="Masukkan alasan pembatalan..."
              rows={3}
              onChange={(e) => { cancelReason = e.target.value; }}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      ),
      okText: 'Ya, Batalkan',
      cancelText: 'Tidak',
      okType: 'danger',
      onOk: () => {
        if (!cancelReason.trim()) {
          message.error('Alasan pembatalan harus diisi!');
          return Promise.reject();
        }

        const localHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        const customPcHistory = JSON.parse(localStorage.getItem('customPcHistory')) || [];

        // Update di transactionHistory
        const updatedHistory = localHistory.map((o) => {
          if (String(o.id) === orderId) {
            return { ...o, status: 'dibatalkan', cancelReason: cancelReason.trim() };
          }
          return o;
        });

        // Update di customPcHistory
        const updatedCustomPc = customPcHistory.map((o) => {
          if (String(o.id) === orderId) {
            return { ...o, status: 'dibatalkan', cancelReason: cancelReason.trim() };
          }
          return o;
        });

        localStorage.setItem('transactionHistory', JSON.stringify(updatedHistory));
        localStorage.setItem('customPcHistory', JSON.stringify(updatedCustomPc));

        setStatus('dibatalkan');
        message.success('Pesanan berhasil dibatalkan.');
        window.dispatchEvent(new Event('transactionHistoryUpdated'));
      }
    });
  };

  const handleUpdate = () => {
    // Update data di localStorage
    const localHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const customPcHistory = JSON.parse(localStorage.getItem('customPcHistory')) || [];

    // Update di transactionHistory
    const updatedHistory = localHistory.map((o) => {
      if (String(o.id) === orderId) {
        return {
          ...o,
          status,
          resi,
        };
      }
      return o;
    });

    // Update di customPcHistory
    const updatedCustomPc = customPcHistory.map((o) => {
      if (String(o.id) === orderId) {
        return {
          ...o,
          status,
          resi,
        };
      }
      return o;
    });

    localStorage.setItem('transactionHistory', JSON.stringify(updatedHistory));
    localStorage.setItem('customPcHistory', JSON.stringify(updatedCustomPc));

    message.success('Order berhasil diperbarui!');
    window.dispatchEvent(new Event('transactionHistoryUpdated'));
    navigate('/admin-custom-pc');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminNavbar />
      <Layout>
        <AdminSideNav />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Custom PC</Breadcrumb.Item>
            <Breadcrumb.Item>Edit Custom PC Order</Breadcrumb.Item>
          </Breadcrumb>
          <Content>
            <Card
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <Row gutter={24}>
                <Col xs={24} md={16} style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{order.invoice}</div>
                  <div>{order.customer}</div>
                  <div>{order.phone}</div>
                  <div>{order.address}</div>
                </Col>
                <Col
                  xs={24}
                  md={8}
                  style={{
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Invoice Info</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Order Id</span>
                    <span>{order.orderId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Date</span>
                    <span>{order.date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Status</span>
                    <span style={{
                      fontWeight: '600'
                    }}>
                      {getStatusLabel(status)}
                    </span>
                  </div>
                </Col>
              </Row>
              <Table
                style={{ marginTop: 32, marginBottom: 16 }}
                columns={columns}
                dataSource={order.items}
                pagination={false}
                rowKey="productId"
                bordered={false}
              />
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col xs={24} md={6}>
                  <div>Biaya Pengiriman</div>
                  <Input value={order.shippingCost.toLocaleString('id-ID')} disabled style={{ marginTop: 4 }} />
                </Col>
                <Col xs={24} md={6}>
                  <div>Biaya Perakitan</div>
                  <Input value={(order.assemblyFee ? order.assemblyFee : 150000).toLocaleString('id-ID')} disabled style={{ marginTop: 4 }} />
                </Col>
                <Col xs={24} md={6}>
                  <div>Pengiriman</div>
                  <Input value={order.shipping} disabled style={{ marginTop: 4 }} />
                </Col>
                <Col xs={24} md={6}>
                  <div>No. Resi</div>
                  <Input
                    placeholder="No.Resi"
                    style={{ marginTop: 4 }}
                    value={resi}
                    onChange={(e) => setResi(e.target.value)}
                    disabled={status !== 'siapDikirim'}
                  />
                </Col>
                <Col xs={24} md={6}>
                  <div>Total Pesanan</div>
                  <Input value={order.total.toLocaleString('id-ID')} disabled style={{ marginTop: 4 }} />
                </Col>
              </Row>

              {/* Tampilkan alasan dibatalkan jika status dibatalkan */}
              {status === 'dibatalkan' && (() => {
                // Cek di customPcHistory untuk alasan pembatalan
                const localCustomPc = JSON.parse(localStorage.getItem('customPcHistory')) || [];
                const localOrder = localCustomPc.find((o) => String(o.id) === orderId);

                // Jika tidak ada di customPcHistory, cek di transactionHistory
                let cancelReason = null;
                if (localOrder && localOrder.cancelReason) {
                  cancelReason = localOrder.cancelReason;
                } else {
                  const localOrders = JSON.parse(localStorage.getItem('transactionHistory')) || [];
                  const transactionOrder = localOrders.find((o) => String(o.id) === orderId);
                  if (transactionOrder && transactionOrder.cancelReason) {
                    cancelReason = transactionOrder.cancelReason;
                  }
                }

                return cancelReason ? (
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col xs={24}>
                      <div style={{
                        padding: '12px',
                        backgroundColor: '#fff2f0',
                        border: '1px solid #ffccc7',
                        borderRadius: '6px'
                      }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#cf1322' }}>
                          Alasan Dibatalkan:
                        </div>
                        <div style={{ color: '#595959' }}>
                          {cancelReason}
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null;
              })()}

              <Row>
                <Col xs={24} style={{ marginTop: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    {/* Left side buttons */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <Button onClick={() => navigate('/admin-custom-pc')}>
                        Back
                      </Button>

                      {/* Conditional Action Buttons based on Status */}
                      {status === 'menungguVerifikasi' && (
                        <Button
                          type="primary"
                          onClick={handleVerifyPayment}
                          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                        >
                          Verifikasi Pembayaran
                        </Button>
                      )}

                      {status === 'diproses' && (
                        <Button
                          type="primary"
                          onClick={handleProcessShipping}
                          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                        >
                          Proses Pengiriman
                        </Button>
                      )}

                      {/* Media Button - View Payment Proof and Shipping Proof */}
                      {(() => {
                        // Cek di customPcHistory untuk bukti bayar
                        const localCustomPc = JSON.parse(localStorage.getItem('customPcHistory')) || [];
                        const localOrder = localCustomPc.find((o) => String(o.id) === orderId);

                        // Jika tidak ada di customPcHistory, cek di transactionHistory
                        if (!localOrder || (!localOrder.paymentProof && !localOrder.shippingProof)) {
                          const localOrders = JSON.parse(localStorage.getItem('transactionHistory')) || [];
                          const transactionOrder = localOrders.find((o) => String(o.id) === orderId);

                          return (transactionOrder && (transactionOrder.paymentProof || transactionOrder.shippingProof)) ? (
                            <Button
                              icon={<FileImageOutlined />}
                              onClick={handleViewPaymentProof}
                              style={{
                                backgroundColor: '#1890ff',
                                borderColor: '#1890ff',
                                color: '#fff'
                              }}
                            >
                              Media
                            </Button>
                          ) : null;
                        } else {
                          return (
                            <Button
                              icon={<FileImageOutlined />}
                              onClick={handleViewPaymentProof}
                              style={{
                                backgroundColor: '#1890ff',
                                borderColor: '#1890ff',
                                color: '#fff'
                              }}
                            >
                              Media
                            </Button>
                          );
                        }
                      })()}
                    </div>

                    {/* Right side - Cancel Order Button */}
                    {!['selesai', 'dibatalkan'].includes(status) && (
                      <Button
                        danger
                        onClick={handleCancelOrder}
                      >
                        Batalkan Pesanan
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>
          </Content>
        </Layout>
      </Layout>

      {/* Modal Media - Bukti Bayar dan Bukti Pengiriman */}
      <Modal
        title="Media"
        open={paymentProofModal}
        onCancel={() => setPaymentProofModal(false)}
        footer={[
          <Button key="close" onClick={() => setPaymentProofModal(false)}>
            Tutup
          </Button>
        ]}
        width={800}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {selectedPaymentProof && (
            <div>
              <h4 style={{ marginBottom: '10px', color: '#1890ff' }}>Bukti Pembayaran:</h4>
              <div style={{ marginBottom: '16px' }}>
                <p><strong>Bank:</strong> {selectedPaymentProof.bankName}</p>
                <p><strong>Atas Nama:</strong> {selectedPaymentProof.accountName}</p>
                <p><strong>Nomor Rekening:</strong> {selectedPaymentProof.accountNumber}</p>
                <p><strong>Waktu Upload:</strong> {new Date(selectedPaymentProof.uploadedAt).toLocaleString('id-ID')}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Image
                  src={selectedPaymentProof.image}
                  alt="Bukti Pembayaran"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px'
                  }}
                />
              </div>
            </div>
          )}

          {selectedShippingProof && (
            <div>
              <h4 style={{ marginBottom: '10px', color: '#1890ff' }}>Bukti Pengiriman:</h4>
              <div style={{ textAlign: 'center' }}>
                <Image
                  src={selectedShippingProof}
                  alt="Bukti Pengiriman"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px'
                  }}
                />
              </div>
            </div>
          )}

          {!selectedPaymentProof && !selectedShippingProof && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>Tidak ada media yang tersedia</p>
            </div>
          )}
        </div>
      </Modal>

      {/* Modal untuk verifikasi pembayaran */}
      <Modal
        title="Verifikasi Pembayaran"
        open={verificationModal}
        onCancel={() => setVerificationModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setVerificationModal(false)}>
            Batal
          </Button>,
          <Button key="verify" type="primary" onClick={handleConfirmVerification}>
            Verifikasi Pembayaran
          </Button>
        ]}
        width={600}
      >
        <div style={{ marginBottom: 16 }}>
          <p><strong>Bukti Pembayaran dari Customer:</strong></p>
          {selectedPaymentProof && (
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ marginBottom: '16px' }}>
                <p><strong>Bank:</strong> {selectedPaymentProof.bankName}</p>
                <p><strong>Atas Nama:</strong> {selectedPaymentProof.accountName}</p>
                <p><strong>Nomor Rekening:</strong> {selectedPaymentProof.accountNumber}</p>
                <p><strong>Waktu Upload:</strong> {new Date(selectedPaymentProof.uploadedAt).toLocaleString('id-ID')}</p>
              </div>
              <Image
                src={selectedPaymentProof.image}
                alt="Bukti Pembayaran"
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />
            </div>
          )}
          <p>Apakah Anda yakin ingin memverifikasi pembayaran ini? Status akan berubah menjadi <strong>"Diproses"</strong>.</p>
        </div>
      </Modal>

      {/* Modal untuk proses pengiriman */}
      <Modal
        title="Proses Pengiriman"
        open={shippingModal}
        onCancel={() => {
          setShippingModal(false);
          setShippingProof(null);
          setShippingProofList([]);
        }}
        footer={[
          <Button key="cancel" onClick={() => {
            setShippingModal(false);
            setShippingProof(null);
            setShippingProofList([]);
          }}>
            Batal
          </Button>,
          <Button
            key="ship"
            type="primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleConfirmShipping();
            }}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            Konfirmasi Pengiriman
          </Button>
        ]}
        width={600}
      >
        <div style={{ marginBottom: 16 }}>
          <p><strong>Nomor Resi:</strong></p>
          <Input
            value={resi}
            onChange={(e) => setResi(e.target.value)}
            placeholder="Masukkan nomor resi pengiriman"
            style={{ marginBottom: 16 }}
          />

          <p><strong>Bukti Pengiriman:</strong></p>
          <Upload
            listType="picture-card"
            fileList={shippingProofList}
            onChange={handleShippingProofUpload}
            beforeUpload={() => false} // Prevent auto upload
            maxCount={1}
            accept="image/*"
            style={{ marginBottom: 16 }}
          >
            {shippingProofList.length === 0 && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload Foto</div>
              </div>
            )}
          </Upload>

          {shippingProof && (
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              <p><strong>Preview Bukti Pengiriman:</strong></p>
              <Image
                src={shippingProof}
                alt="Bukti Pengiriman"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            </div>
          )}

          <p>Setelah konfirmasi, status akan berubah menjadi <strong>"Dalam Pengiriman"</strong>.</p>
        </div>
      </Modal>
    </Layout>
  );
};

export default AdminEditCustom;
