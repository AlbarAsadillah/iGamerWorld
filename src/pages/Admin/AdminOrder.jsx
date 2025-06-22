import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Breadcrumb,
  Tag,
  Space,
  Modal,
  Tooltip,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import AdminLayout from '../../Layout/AdminLayout';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

const statusColor = (status) => {
  switch (status) {
    case 'Menunggu Pembayaran':
      return 'gold';
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

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const loadOrders = () => {
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
      customer: 'Guest',
      status:
        order.status === 'diproses'
          ? 'Diproses'
          : order.status === 'dalamPengiriman'
          ? 'Dalam Pengiriman'
          : order.status === 'menungguPembayaran'
          ? 'Menunggu Pembayaran'
          : order.status === 'menungguVerifikasi'
          ? 'Menunggu Verifikasi'
          : order.status.charAt(0).toUpperCase() + order.status.slice(1),
      shipping: 'JNE - Reguler',
      total: order.total || 0, // Ensure total is never undefined
      originalOrder: order,
    }));

    setOrders(transformed);
  };

  useEffect(() => {
    loadOrders();
    window.addEventListener('transactionHistoryUpdated', loadOrders);
    return () => window.removeEventListener('transactionHistoryUpdated', loadOrders);
  }, []);

  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Are you sure you want to delete this order?',
      icon: <ExclamationCircleOutlined />,
      content: `Order ID: ${record.orderId}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const localHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        const updatedHistory = localHistory.filter((item) => String(item.id) !== record.orderId);
        localStorage.setItem('transactionHistory', JSON.stringify(updatedHistory));
        setOrders((prev) => prev.filter((item) => item.key !== record.key));
        window.dispatchEvent(new Event('transactionHistoryUpdated'));
      },
    });
  };

  const handleView = (record) => {
    navigate(`/adminvieworder/${record.orderId}`, { state: { order: record.originalOrder } });
  };

  const handleEdit = (record) => {
    navigate(`/admineditorder/${record.orderId}`, { state: { order: record.originalOrder } });
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
        { text: 'Menunggu Pembayaran', value: 'Menunggu Pembayaran' },
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
      width: 120,
      render: (_, record) => (
        <Space>
          {/* <Tooltip title="View">
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)} size="small" />
          </Tooltip> */}
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} size="small" />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => showDeleteConfirm(record)}
              size="small"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="admin-page">
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Orders</Breadcrumb.Item>
        </Breadcrumb>

        <Table
          dataSource={orders}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminOrder;
