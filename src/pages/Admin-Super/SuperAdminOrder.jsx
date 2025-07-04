import React, { useState, useEffect } from 'react';
import {
  Layout,
  Table,
  Button,
  Breadcrumb,
  Space,
  Tag,
  Drawer,
  Grid,
} from 'antd';
import {
  EyeOutlined,
  ExclamationCircleOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import SuperAdminNavbar from '../../components/AdminNavbar'; // navbar superadmin
import SuperAdminSideNav from '../../components/SuperAdminSideNav'; // sidenav superadmin
import { useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const statusColor = (status) => {
  switch (status) {
    case 'Diproses':
      return 'purple';
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

const SuperAdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  // Drawer visibility for mobile sidebar
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  useEffect(() => {
    if (screens.lg) {
      setDrawerVisible(false);
    }
  }, [screens.lg]);

  useEffect(() => {
    const localHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];

    // Filter hanya transaksi produk biasa (bukan custom PC)
    const regularOrders = localHistory.filter((order) => {
      // Filter berdasarkan type atau ID prefix
      return order.type === 'product' || (!order.type && !String(order.id).startsWith('CP'));
    });

    const transformed = regularOrders.map((order) => ({
      key: String(order.id),
      orderId: String(order.id),
      date: new Date(order.createdAt).toLocaleDateString('id-ID'),
      customer: 'Albar A',
      status:
        order.status === 'diproses'
          ? 'Diproses'
          : order.status.charAt(0).toUpperCase() + order.status.slice(1),
      shipping: 'JNE - Reguler',
      total: order.total || 0, // Ensure total is never undefined
      originalOrder: order,
    }));

    setOrders(transformed);
  }, []);

  const handleView = (record) => {
    navigate(`/superadminvieworder/${record.orderId}`, { state: { order: record.originalOrder } });
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
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            size="small"
          />
          {/* Tombol edit dan delete dihilangkan */}
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Navbar with toggle sidebar button */}
      <SuperAdminNavbar onToggleSidebar={showDrawer} />

      <Layout>
        {/* Sidebar desktop */}
        {screens.lg && (
          <Sider width={250} style={{ background: '#fff' }}>
            <SuperAdminSideNav collapsed={false} />
          </Sider>
        )}

        {/* Drawer sidebar mobile */}
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
            <Breadcrumb.Item>Orders</Breadcrumb.Item>
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

export default SuperAdminOrder;
