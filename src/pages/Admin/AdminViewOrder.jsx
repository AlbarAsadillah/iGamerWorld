import { Layout, Row, Col, Button, Breadcrumb, Card, Table, Input, Select } from 'antd';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideNav from '../../components/AdminSideNav';
import { useNavigate, useParams } from 'react-router-dom';

const { Content } = Layout;
const { Option } = Select;

// Dummy data orders
const dummyOrders = [
  {
    orderId: '01',
    invoice: 'IG-10343',
    date: '12 Oct 2024',
    customer: 'Mikael Renaldi',
    phone: '0873429503283',
    address: 'Jl. Amir Mahmud No. 35 Surabaya, Jawa Timur 6092',
    status: 'Dalam Pengiriman',
    shipping: 'JNE-Reguler',
    shippingCost: 25000,
    resi: '',
    total: 1985000,
    items: [
      {
        productId: '01',
        name: 'Logitech G102',
        category: 'Mouse',
        price: 230000,
        qty: 2,
        image: '/images/products/logitech-g102-1.png',
      },
      {
        productId: '02',
        name: 'Razer Kraken',
        category: 'Headset',
        price: 1100000,
        qty: 1,
        image: '/images/products/razer-kraken.png',
      },
      {
        productId: '08',
        name: 'Rexus Gladius G300',
        category: 'Gamepad',
        price: 400000,
        qty: 1,
        image: '/images/products/rexus-gladius-g300.png',
      },
    ],
  },
  // ...tambahkan order lain jika perlu
];

const statusOptions = [
  'Dalam Pengiriman',
  'Siap Dikirim',
  'Dibatalkan',
  'Selesai',
];

const AdminViewOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  // Cari order berdasarkan orderId
  const order = dummyOrders.find((o) => o.orderId === orderId);

  if (!order) return <div>Order not found</div>;

  // Table columns
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
          <img src={record.image} alt={record.name} style={{ width: 32, height: 32, objectFit: 'contain' }} />
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
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              }}
              bodyStyle={{ padding: 32 }}
            >
              <Row>
                <Col xs={24} md={16}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>IG-10343</div>
                  <div style={{ marginTop: 8, marginBottom: 8, fontWeight: 500 }}>Customer Info</div>
                  <div>{order.customer}</div>
                  <div>{order.phone}</div>
                  <div>{order.address}</div>
                </Col>
                <Col xs={24} md={8} style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Invoice Info</div>
                  <div>Order Id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {order.invoice}</div>
                  <div>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {order.date}</div>
                  <div>Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {order.status}</div>
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
                <Col xs={24} md={6} style={{ marginBottom: 8 }}>
                  <div>Biaya Pengiriman</div>
                  <Input value={order.shippingCost.toLocaleString('id-ID')} disabled style={{ marginTop: 4 }} />
                </Col>
                <Col xs={24} md={6} style={{ marginBottom: 8 }}>
                  <div>Pengiriman</div>
                  <Input value={order.shipping} disabled style={{ marginTop: 4 }} />
                </Col>
                <Col xs={24} md={6} style={{ marginBottom: 8 }}>
                  <div>No. Resi</div>
                  <Input placeholder="Input Placeholder" style={{ marginTop: 4 }} />
                </Col>
                <Col xs={24} md={6} style={{ marginBottom: 8 }}>
                  <div>Status</div>
                  <Select defaultValue={order.status} style={{ width: '100%', marginTop: 4 }}>
                    {statusOptions.map((status) => (
                      <Option key={status} value={status}>{status}</Option>
                    ))}
                  </Select>
                </Col>
              </Row>
              <Row>
                <Col xs={24} style={{ textAlign: 'right', fontWeight: 600 }}>
                  Total Pesanan&nbsp;&nbsp;&nbsp;&nbsp;{order.total.toLocaleString('id-ID')}
                </Col>
              </Row>
              <Row>
                <Col xs={24} style={{ textAlign: 'left', marginTop: 24 }}>
                  <Button onClick={() => navigate('/admin-orders')}>Back</Button>
                </Col>
              </Row>
            </Card>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminViewOrder;