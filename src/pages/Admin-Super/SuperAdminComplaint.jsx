import React, { useState } from 'react';
import {
  Table,
  Button,
  Breadcrumb,
  Tag,
  Space,
  Modal,
  Tooltip,
  Typography,
  Card,
  Row,
  Col,
} from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import SuperAdminLayout from '../../components/SuperAdminLayout';

const { confirm } = Modal;
const { Text, Paragraph } = Typography;

// Dummy data pengaduan (sama dengan AdminComplaint)
const complaintData = [
  {
    id: 'C001',
    customerName: 'Ahmad Rizki',
    email: 'ahmad.rizki@email.com',
    subject: 'Produk Rusak',
    message: 'Produk yang saya terima dalam kondisi rusak. Mouse tidak berfungsi dengan baik.',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00',
    orderId: 'ORD001',
  },
  {
    id: 'C002',
    customerName: 'Siti Nurhaliza',
    email: 'siti.nur@email.com',
    subject: 'Pengiriman Terlambat',
    message: 'Pesanan saya sudah 5 hari belum sampai, padahal estimasi 2-3 hari.',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-01-14T14:20:00',
    orderId: 'ORD002',
  },
  {
    id: 'C003',
    customerName: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    subject: 'Kesalahan Produk',
    message: 'Produk yang dikirim tidak sesuai dengan yang saya pesan. Saya pesan keyboard gaming tapi yang datang keyboard biasa.',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-01-13T09:15:00',
    orderId: 'ORD003',
  },
  {
    id: 'C004',
    customerName: 'Maya Sari',
    email: 'maya.sari@email.com',
    subject: 'Layanan Customer Service',
    message: 'Customer service tidak responsif ketika saya menanyakan status pesanan.',
    status: 'pending',
    priority: 'low',
    createdAt: '2024-01-12T16:45:00',
    orderId: 'ORD004',
  },
];

const SuperAdminComplaint = () => {
  const [complaints, setComplaints] = useState(complaintData);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const priorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

  const priorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'Tinggi';
      case 'medium':
        return 'Sedang';
      case 'low':
        return 'Rendah';
      default:
        return priority;
    }
  };

  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Apakah Anda yakin ingin menghapus pengaduan ini?',
      icon: <ExclamationCircleOutlined />,
      content: `Pengaduan ID: ${record.id}`,
      okText: 'Ya',
      okType: 'danger',
      cancelText: 'Tidak',
      onOk() {
        setComplaints((prev) => prev.filter((item) => item.id !== record.id));
      },
    });
  };

  const handleView = (record) => {
    setSelectedComplaint(record);
    setDetailModalVisible(true);
  };

  const columns = [
    {
      title: 'ID Pengaduan',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Nama Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text) => (
        <Text style={{ maxWidth: 200 }} ellipsis={{ tooltip: text }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Prioritas',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={priorityColor(priority)} style={{ fontWeight: 500 }}>
          {priorityText(priority)}
        </Tag>
      ),
      filters: [
        { text: 'Tinggi', value: 'high' },
        { text: 'Sedang', value: 'medium' },
        { text: 'Rendah', value: 'low' },
      ],
      onFilter: (value, record) => record.priority === value,
    },
    {
      title: 'Tanggal',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('id-ID'),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Lihat Detail">
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)} size="small" />
          </Tooltip>
          <Tooltip title="Hapus">
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
    <SuperAdminLayout>
      <div className="admin-page">
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>Super Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Pengaduan</Breadcrumb.Item>
        </Breadcrumb>

        <Table
          dataSource={complaints}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          rowKey="id"
        />
      </div>

      {/* Detail Modal */}
      <Modal
        title="Detail Pengaduan"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedComplaint && (
          <div>
            <Card>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>ID Pengaduan:</Text>
                  <br />
                  <Text>{selectedComplaint.id}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Order ID:</Text>
                  <br />
                  <Text>{selectedComplaint.orderId}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Nama Customer:</Text>
                  <br />
                  <Text>{selectedComplaint.customerName}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Email:</Text>
                  <br />
                  <Text>{selectedComplaint.email}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Prioritas:</Text>
                  <br />
                  <Tag color={priorityColor(selectedComplaint.priority)}>
                    {priorityText(selectedComplaint.priority)}
                  </Tag>
                </Col>
                <Col span={24}>
                  <Text strong>Subject:</Text>
                  <br />
                  <Text>{selectedComplaint.subject}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Pesan:</Text>
                  <br />
                  <Paragraph>{selectedComplaint.message}</Paragraph>
                </Col>
                <Col span={24}>
                  <Text strong>Tanggal:</Text>
                  <br />
                  <Text>{new Date(selectedComplaint.createdAt).toLocaleString('id-ID')}</Text>
                </Col>
              </Row>
            </Card>

            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <Space>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </SuperAdminLayout>
  );
};

export default SuperAdminComplaint;
