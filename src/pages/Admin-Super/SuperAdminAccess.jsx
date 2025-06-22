import React, { useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Table,
  Space,
  Tooltip,
  Modal,
  message,
  Drawer,
  Breadcrumb,
  Grid,
  Button,
  Tag,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import AdminSideNav from '../../components/SuperAdminSideNav';
import AdminNavbar from '../../components/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import AddAdminModal from '../../components/AddAdminModal';
import EditAdminModal from '../../components/EditAdminModal';

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { confirm } = Modal;

const initialData = [
  {
    key: '1',
    no: '001',
    name: 'Rudi Yulianto',
    email: 'rudi@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    key: '2',
    no: '002',
    name: 'Budi Santoso',
    email: 'budi@example.com',
    role: 'admin',
    status: 'inactive',
  },
  {
    key: '3',
    no: '003',
    name: 'Siti Aminah',
    email: 'siti@example.com',
    role: 'admin',
    status: 'active',
  },
];

const AdminAccess = () => {
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();

  // Modal state
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Sidebar open/close handlers
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  // Modal open/close handlers
  const openAddModal = () => setAddModalVisible(true);
  const closeAddModal = () => setAddModalVisible(false);

  const openEditModal = (record) => {
    setEditingRecord(record);
    setEditModalVisible(true);
  };
  const closeEditModal = () => {
    setEditingRecord(null);
    setEditModalVisible(false);
  };

  // Add new admin handler
  const handleAddAdmin = (values) => {
    const newAdmin = {
      key: Date.now().toString(),
      no: (data.length + 1).toString().padStart(3, '0'),
      ...values,
    };
    setData(prev => [...prev, newAdmin]);
    message.success('New admin added!');
    closeAddModal();
  };

  // Update admin handler
  const handleUpdateAdmin = (values) => {
    const updatedData = data.map(item =>
      item.key === editingRecord.key ? { ...item, ...values } : item
    );
    setData(updatedData);
    message.success('Admin updated!');
    closeEditModal();
  };

  // Confirm deactivate
  const confirmDeactivate = (record) => {
    confirm({
      title: `Are you sure you want to deactivate user "${record.name}"?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        const newData = data.map(item =>
          item.key === record.key ? { ...item, status: 'inactive' } : item
        );
        setData(newData);
        message.success(`User "${record.name}" deactivated`);
      },
    });
  };

  // Confirm activate
  const confirmActivate = (record) => {
    confirm({
      title: `Are you sure you want to activate user "${record.name}"?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        const newData = data.map(item =>
          item.key === record.key ? { ...item, status: 'active' } : item
        );
        setData(newData);
        message.success(`User "${record.name}" activated`);
      },
    });
  };

  // Confirm delete
  const confirmDelete = (record) => {
    confirm({
      title: `Are you sure you want to delete user "${record.name}"?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setData(data.filter(item => item.key !== record.key));
        message.success('User deleted');
      },
    });
  };

  const roleTag = (role) => role === 'admin' ? <Tag color="blue">Admin</Tag> : <Tag color="default">Unknown</Tag>;
  const statusTag = (status) => status === 'active' ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>;

  const columns = [
    {
      title: 'NO',
      dataIndex: 'no',
      key: 'no',
      sorter: (a, b) => a.no.localeCompare(b.no),
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: roleTag,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: statusTag,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => openEditModal(record)}
              size="small"
              type="primary"
            />
          </Tooltip>
          {record.status === 'active' ? (
            <Tooltip title="Deactivate">
              <Button
                icon={<PoweroffOutlined />}
                onClick={() => confirmDeactivate(record)}
                size="small"
                danger
              />
            </Tooltip>
          ) : (
            <Tooltip title="Activate">
              <Button
                icon={<PoweroffOutlined />}
                onClick={() => confirmActivate(record)}
                size="small"
                type="primary"
              />
            </Tooltip>
          )}
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => confirmDelete(record)}
              size="small"
              danger
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <AdminNavbar onToggleSidebar={showDrawer} />

        <Layout>
          {screens.lg ? (
            <Layout.Sider width={250} style={{ background: '#fff' }}>
              <AdminSideNav collapsed={false} />
            </Layout.Sider>
          ) : (
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
              <AdminSideNav collapsed={false} />
            </Drawer>
          )}

          <Layout style={{ padding: '24px' }}>
            <Breadcrumb style={{ marginBottom: 16 }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Access Control</Breadcrumb.Item>
            </Breadcrumb>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <Row gutter={[16, 16]} justify="end">
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Button type="primary" block onClick={openAddModal}>
                    Add New Admin +
                  </Button>
                </Col>
              </Row>

              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
                bordered
                rowKey="key"
                scroll={{ x: 'max-content' }}
                style={{ marginTop: 16 }}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>

      <AddAdminModal
        visible={isAddModalVisible}
        onCreate={handleAddAdmin}
        onCancel={closeAddModal}
      />

      <EditAdminModal
        visible={isEditModalVisible}
        record={editingRecord}
        onUpdate={handleUpdateAdmin}
        onCancel={closeEditModal}
      />
    </>
  );
};

export default AdminAccess;
