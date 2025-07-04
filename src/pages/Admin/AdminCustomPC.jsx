import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Breadcrumb,
  Tag,
  Space,
  Tooltip,
  Modal,
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

const AdminCustomPC = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const loadOrders = () => {
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
      customer: 'Albar A',
      status: order.status === 'dalamPengiriman'
        ? 'Dalam Pengiriman'
        : order.status === 'menungguVerifikasi'
        ? 'Menunggu Verifikasi'
        : order.status === 'diproses'
        ? 'Diproses'
        : order.status === 'selesai'
        ? 'Selesai'
        : order.status === 'dibatalkan'
        ? 'Dibatalkan'
        : order.status
        ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
        : 'Diproses',
      shipping: 'JNE - Reguler',
      total: order.total || 0,
      originalOrder: order,
    }));

    setOrders(transformed);
  };

  useEffect(() => {
    // Initial load
    loadOrders();

    // Listen for updates
    const handleUpdate = () => {
      loadOrders();
    };

    window.addEventListener('transactionHistoryUpdated', handleUpdate);

    // Cleanup
    return () => window.removeEventListener('transactionHistoryUpdated', handleUpdate);
  }, []);

  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Are you sure you want to delete this custom PC order?',
      icon: <ExclamationCircleOutlined />,
      content: `Order ID: ${record.orderId}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Hapus dari kedua localStorage
        const localHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        const customPcHistory = JSON.parse(localStorage.getItem('customPcHistory')) || [];
        
        const updatedHistory = localHistory.filter((item) => String(item.id) !== record.orderId);
        const updatedCustomPc = customPcHistory.filter((item) => String(item.id) !== record.orderId);
        
        localStorage.setItem('transactionHistory', JSON.stringify(updatedHistory));
        localStorage.setItem('customPcHistory', JSON.stringify(updatedCustomPc));
        
        setOrders((prev) => prev.filter((item) => item.key !== record.key));
        window.dispatchEvent(new Event('transactionHistoryUpdated'));
      },
    });
  };

  const handleView = (record) => {
    navigate(`/adminviewcustom/${record.orderId}`, { state: { order: record.originalOrder } });
  };

  const handleEdit = (record) => {
    navigate(`/admineditcustom/${record.orderId}`, { state: { order: record.originalOrder } });
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
        { text: 'Menunggu Verifikasi', value: 'Menunggu Verifikasi' },
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
      render: (total) => `Rp ${total.toLocaleString('id-ID')}`,
      sorter: (a, b) => a.total - b.total,
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
          <Breadcrumb.Item>Custom PC Orders</Breadcrumb.Item>
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

export default AdminCustomPC;
