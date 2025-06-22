import React, { useEffect, useState } from 'react';
import {
  Layout,
  Table,
  Button,
  Breadcrumb,
  Row,
  Col,
  Tag,
  Space,
  Drawer,
  Grid,
  Tooltip,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import SuperAdminNavbar from '../../components/AdminNavbar'; // navbar superadmin
import SuperAdminSideNav from '../../components/SuperAdminSideNav'; // sidenav superadmin
import { useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const statusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'diproses':
      return 'purple';
    case 'dalam pengiriman':
      return 'blue';
    case 'siap dikirim':
      return 'orange';
    case 'dibatalkan':
      return 'red';
    case 'selesai':
      return 'green';
    default:
      return 'default';
  }
};

const customPcDataDummy = {
  diproses: [
    {
      id: 'CP001',
      createdAt: '2025-05-01T10:30:00',
      status: 'diproses',
      items: [{ name: 'Custom PC Ryzen 5', price: 12000000 }],
      total: 12000000,
    },
    {
      id: 'CP002',
      createdAt: '2025-05-03T12:00:00',
      status: 'diproses',
      items: [{ name: 'Custom PC Intel i7', price: 15000000 }],
      total: 15000000,
    },
  ],
  siapDikirim: [
    {
      id: 'CP003',
      createdAt: '2025-04-28T14:00:00',
      status: 'siap dikirim',
      items: [{ name: 'Custom PC GTX 3080', price: 22000000 }],
      total: 22000000,
    },
  ],
  dalamPengiriman: [],
  selesai: [
    {
      id: 'CP004',
      createdAt: '2025-04-20T09:15:00',
      status: 'selesai',
      items: [{ name: 'Custom PC RTX 3090', price: 30000000 }],
      total: 30000000,
    },
  ],
  dibatalkan: [],
};

const SuperAdminCustomPC = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  useEffect(() => {
    if (screens.lg) {
      setDrawerVisible(false);
    }
  }, [screens.lg]);

  useEffect(() => {
    // Ambil data dari transactionHistory dan customPcHistory
    const localHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const customPcHistory = JSON.parse(localStorage.getItem('customPcHistory')) || [];

    // Filter transaksi custom PC dari transactionHistory
    const customPcFromTransaction = localHistory.filter((order) => {
      return order.type === 'custom-pc' || String(order.id).startsWith('CP');
    });

    // Gabungkan data dari kedua sumber
    const allCustomPcOrders = [...customPcFromTransaction, ...customPcHistory];

    // Remove duplicates berdasarkan ID
    const uniqueOrders = allCustomPcOrders.filter((order, index, self) =>
      index === self.findIndex((o) => String(o.id) === String(order.id))
    );

    const transformed = uniqueOrders.map((order) => ({
      key: String(order.id),
      orderId: String(order.id),
      date: new Date(order.createdAt).toLocaleDateString('id-ID'),
      customer: 'Guest',
      status: order.status
        ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
        : 'Diproses',
      shipping: 'JNE - Reguler',
      total: order.total || 0,
      originalOrder: order,
    }));

    setOrders(transformed);
  }, []);

  const handleView = (record) => {
    navigate(`/superadminviewcustom/${record.orderId}`, { state: { order: record.originalOrder } });
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
      responsive: ['md'],
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
        { text: 'Diproses', value: 'Diproses' },
        { text: 'Dalam Pengiriman', value: 'Dalam Pengiriman' },
        { text: 'Siap Dikirim', value: 'Siap Dikirim' },
        { text: 'Dibatalkan', value: 'Dibatalkan' },
        { text: 'Selesai', value: 'Selesai' },
      ],
      onFilter: (value, record) => record.status === value,
      responsive: ['sm'],
    },
    {
      title: 'Pengiriman',
      dataIndex: 'shipping',
      key: 'shipping',
      responsive: ['lg'],
    },
    {
      title: 'Total Payment',
      dataIndex: 'total',
      key: 'total',
      render: (total) => {
        if (total === undefined || total === null) {
          return 'Rp 0';
        }
        return `Rp ${total.toLocaleString('id-ID')}`;
      },
      sorter: (a, b) => (a.total || 0) - (b.total || 0),
      responsive: ['md'],
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 80,
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)} size="small" />
          </Tooltip>
          {/* Tidak ada tombol Edit dan Delete */}
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SuperAdminNavbar onToggleSidebar={showDrawer} />
      <Layout>
        {screens.lg && (
          <Sider width={250} style={{ background: '#fff' }}>
            <SuperAdminSideNav collapsed={false} />
          </Sider>
        )}
        {!screens.lg && (
          <Drawer
            title="Menu"
            placement="left"
            closable
            onClose={closeDrawer}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
            width={250}
            destroyOnClose
          >
            <SuperAdminSideNav collapsed={false} />
          </Drawer>
        )}

        <Layout style={{ padding: '24px' }}>
          <Breadcrumb style={{ marginBottom: 16 }}>
            <Breadcrumb.Item>Super Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Custom PC Orders</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Table
              dataSource={orders}
              columns={columns}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SuperAdminCustomPC;
