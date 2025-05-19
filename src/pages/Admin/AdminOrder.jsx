import { useState } from 'react';
import { Layout, Table, Button, Breadcrumb, Row, Col, Tag, Space, Modal, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideNav from '../../components/AdminSideNav';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

// Dummy data orders sesuai gambar
const dummyOrders = [
  {
    key: '1',
    orderId: '01',
    date: '12 Oct 2024',
    customer: 'Mikael Renaldi',
    status: 'Dalam Pengiriman',
    shipping: 'JNE - Reguler',
    total: 1985000,
  },
  {
    key: '2',
    orderId: '02',
    date: '19 Oct 2024',
    customer: 'Rusnadi Adi',
    status: 'Siap Dikirim',
    shipping: 'JNE - Reguler',
    total: 350000,
  },
  {
    key: '3',
    orderId: '03',
    date: '5 nov 2024',
    customer: 'Adi Prasetya',
    status: 'Dibatalkan',
    shipping: 'JNE - Reguler',
    total: 500000,
  },
  {
    key: '4',
    orderId: '04',
    date: '6 Nov 2024',
    customer: 'Muhammad Arid',
    status: 'Siap Dikirim',
    shipping: 'JNE - Reguler',
    total: 675000,
  },
  {
    key: '5',
    orderId: '05',
    date: '7 Nov 2024',
    customer: 'Ramhat Dermawan',
    status: 'Selesai',
    shipping: 'JNE - Reguler',
    total: 3000000,
  },
  {
    key: '6',
    orderId: '06',
    date: '12 Dec 2024',
    customer: 'Luna Lani',
    status: 'Dalam Pengiriman',
    shipping: 'JNE - Reguler',
    total: 230000,
  },
  {
    key: '7',
    orderId: '07',
    date: '1 Jan 2025',
    customer: 'Kala mentari',
    status: 'Dalam Pengiriman',
    shipping: 'JNE - Reguler',
    total: 300000,
  },
];

const statusColor = (status) => {
  switch (status) {
    case 'Dalam Pengiriman':
      return 'blue';
    case 'Siap Dikirim':
      return 'orange';
    case 'Dibatalkan':
      return 'red';
    case 'Selesai':
      return 'green';
    default:
      return 'default';
  }
};

const AdminOrder = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const navigate = useNavigate();

  const handleView = (record) => {
    navigate(`/adminvieworder/${record.orderId}`);
  };

  const handleEdit = (record) => {
    // Implementasi edit order jika diperlukan
    Modal.info({
      title: `Edit Order: ${record.orderId}`,
      content: <div>Edit order feature here.</div>,
      onOk() {},
    });
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this order?',
      content: `Order ID: ${record.orderId}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setOrders((prev) => prev.filter((item) => item.key !== record.key));
      },
    });
  };

  const columns = [
    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId',
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Customer Name',
      dataIndex: 'customer',
      key: 'customer',
      sorter: (a, b) => a.customer.localeCompare(b.customer),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColor(status)} style={{ fontWeight: 500 }}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Dalam Pengiriman', value: 'Dalam Pengiriman' },
        { text: 'Siap Dikirim', value: 'Siap Dikirim' },
        { text: 'Dibatalkan', value: 'Dibatalkan' },
        { text: 'Selesai', value: 'Selesai' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Pengiriman',
      dataIndex: 'shipping',
      key: 'shipping',
    },
    {
      title: 'Total Payment',
      dataIndex: 'total',
      key: 'total',
      render: (total) => total.toLocaleString('id-ID'),
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record)} />
          </Tooltip>
        </Space>
      ),
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
            <Breadcrumb.Item>Orders</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Row gutter={16}>
              <Col span={24}>
                {/* <h2>Order List</h2> */}
              </Col>
            </Row>
            <Table
              dataSource={orders}
              columns={columns}
              pagination={false}
              bordered
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminOrder;