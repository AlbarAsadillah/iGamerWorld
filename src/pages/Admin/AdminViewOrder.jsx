import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Button, Breadcrumb, Card, Table, Input, Modal, Image } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideNav from '../../components/AdminSideNav';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyProducts } from '../../data/dummyProducts';

const { Content } = Layout;

const AdminViewOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [resi, setResi] = useState('');
  const [paymentProofModal, setPaymentProofModal] = useState(false);
  const [selectedPaymentProof, setSelectedPaymentProof] = useState(null);

  useEffect(() => {
    const localOrders = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const local = localOrders.find((o) => String(o.id) === orderId);

    const addressData = localStorage.getItem('selectedAddress');
    const savedAddress = addressData ? JSON.parse(addressData) : null;

    if (local) {
      const items = (local.items || []).map((item) => {
        const prod = dummyProducts.find((p) => p.id === item.id);
        return {
          productId: item.id,
          qty: item.quantity || 1,
          name: prod?.name || 'Produk Tidak Diketahui',
          category: prod?.category || '-',
          price: prod?.price || item.price || 0,
          image: prod?.image || '/images/products/default.png',
          description: prod?.description || '',
        };
      });

      setOrder({
        orderId: String(local.id),
        invoice: `INV-${local.id}`,
        date: new Date(local.createdAt).toLocaleDateString('id-ID'),
        customer: savedAddress ? savedAddress.name : 'Guest',
        phone: savedAddress ? savedAddress.phone : '-',
        address: savedAddress ? savedAddress.address : '-',
        status: local.status === 'diproses' ? 'Diproses' : local.status,
        shipping: 'JNE-Reguler',
        shippingCost: 25000,
        resi: local.resi || '',
        total: local.total,
        items,
      });
      setResi(local.resi || '');
    }
  }, [orderId]);

  const handleViewPaymentProof = () => {
    const localOrders = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const localOrder = localOrders.find((o) => String(o.id) === orderId);

    if (localOrder && localOrder.paymentProof) {
      setSelectedPaymentProof(localOrder.paymentProof);
      setPaymentProofModal(true);
    }
  };

  if (!order) return <div style={{ padding: 32 }}>Order not found</div>;

  const columns = [
    {
      title: 'Product Id',
      dataIndex: 'productId',
      key: 'productId',
      align: 'center',
    },
    {
      title: 'Column Item',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src={record.image}
            alt={record.name}
            style={{ width: 32, height: 32, objectFit: 'contain' }}
          />
          {text}
        </span>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (price) => price.toLocaleString('id-ID'),
    },
    {
      title: 'QTY',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center',
    },
    {
      title: 'Sub Total',
      key: 'subtotal',
      align: 'right',
      render: (_, record) => (record.price * record.qty).toLocaleString('id-ID'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminNavbar />
      <Layout>
        <AdminSideNav />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Order</Breadcrumb.Item>
            <Breadcrumb.Item>View Order</Breadcrumb.Item>
          </Breadcrumb>
          <Content>
            <Card
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
            >
              <Row>
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
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 8, textAlign: 'left' }}>
                    Invoice Info
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Order Id</span>
                    <span>{order.orderId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Date</span>
                    <span>{order.date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Status</span>
                    <span>{order.status}</span>
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
                  <Input
                    value={order.shippingCost.toLocaleString('id-ID')}
                    disabled
                    style={{ marginTop: 4 }}
                  />
                </Col>
                <Col xs={24} md={6}>
                  <div>Pengiriman</div>
                  <Input value={order.shipping} disabled style={{ marginTop: 4 }} />
                </Col>
                <Col xs={24} md={6}>
                  <div>No. Resi</div>
                  <Input
                    placeholder="Masukkan Nomor Resi"
                    style={{ marginTop: 4 }}
                    value={resi}
                    disabled
                  />
                </Col>
                <Col xs={24} md={6}>
                  <div>Total Pesanan</div>
                  <Input value={order.total.toLocaleString('id-ID')} disabled style={{ marginTop: 4 }} />
                </Col>
              </Row>

              <Row>
                <Col xs={24} style={{ textAlign: 'left', marginTop: 24 }}>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button
                      onClick={() => navigate('/admin-orders')}
                      style={{
                        display: 'inline-block',
                        width: 'auto',
                        margin: 0,
                      }}
                    >
                      Back
                    </Button>

                    {(() => {
                      const localOrders = JSON.parse(localStorage.getItem('transactionHistory')) || [];
                      const localOrder = localOrders.find((o) => String(o.id) === orderId);
                      return localOrder && localOrder.paymentProof ? (
                        <Button
                          icon={<FileImageOutlined />}
                          onClick={handleViewPaymentProof}
                          style={{
                            display: 'inline-block',
                            width: 'auto',
                            margin: 0,
                            backgroundColor: '#1890ff',
                            borderColor: '#1890ff',
                            color: '#fff'
                          }}
                        >
                          Lihat Bukti Bayar
                        </Button>
                      ) : null;
                    })()}
                  </div>
                </Col>
              </Row>
            </Card>
          </Content>
        </Layout>
      </Layout>

      {/* Modal Bukti Bayar */}
      <Modal
        title="Bukti Pembayaran"
        open={paymentProofModal}
        onCancel={() => setPaymentProofModal(false)}
        footer={[
          <Button key="close" onClick={() => setPaymentProofModal(false)}>
            Tutup
          </Button>
        ]}
        width={600}
      >
        {selectedPaymentProof && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '16px' }}>
              <p><strong>Bank:</strong> {selectedPaymentProof.bankName}</p>
              <p><strong>Atas Nama:</strong> {selectedPaymentProof.accountName}</p>
              <p><strong>Nomor Rekening:</strong> {selectedPaymentProof.accountNumber}</p>
              <p><strong>Waktu Upload:</strong> {new Date(selectedPaymentProof.uploadedAt).toLocaleString('id-ID')}</p>
            </div>
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
        )}
      </Modal>
    </Layout>
  );
};

export default AdminViewOrder;
