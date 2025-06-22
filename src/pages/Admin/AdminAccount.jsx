import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Tabs,
  message,
  Breadcrumb,
  Grid,
} from 'antd';
import AdminLayout from '../../Layout/AdminLayout';

const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

const AdminAccount = () => {
  const [form] = Form.useForm();
  const [passForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();

  // Dummy admin profile data
  const adminData = {
    username: 'admin123',
    email: 'admin@example.com',
    fullName: 'Admin iGamerWorld',
  };

  const onProfileFinish = (values) => {
    setLoading(true);
    // Simulasi simpan data profil
    setTimeout(() => {
      setLoading(false);
      message.success('Profil berhasil diperbarui!');
    }, 1000);
  };

  const onPasswordFinish = (values) => {
    setLoading(true);
    if (values.newPassword !== values.confirmPassword) {
      message.error('Password baru dan konfirmasi tidak sama!');
      setLoading(false);
      return;
    }
    // Simulasi ganti password
    setTimeout(() => {
      setLoading(false);
      message.success('Password berhasil diubah!');
      passForm.resetFields();
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Account</Breadcrumb.Item>
        </Breadcrumb>
      <Card>
        <Tabs defaultActiveKey="1" type="line" centered={screens.xs ? false : true}>
          <TabPane tab="Profil" key="1">
            <Form
              form={form}
              layout="vertical"
              initialValues={adminData}
              onFinish={onProfileFinish}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Username wajib diisi!' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Nama Lengkap"
                name="fullName"
                rules={[{ required: true, message: 'Nama lengkap wajib diisi!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Email wajib diisi!' },
                  { type: 'email', message: 'Format email tidak valid!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block={screens.xs}>
                  Simpan Profil
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Ganti Password" key="2">
            <Form form={passForm} layout="vertical" onFinish={onPasswordFinish}>
              <Form.Item
                label="Password Lama"
                name="oldPassword"
                rules={[{ required: true, message: 'Password lama wajib diisi!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Password Baru"
                name="newPassword"
                rules={[{ required: true, message: 'Password baru wajib diisi!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Konfirmasi Password Baru"
                name="confirmPassword"
                rules={[{ required: true, message: 'Konfirmasi password wajib diisi!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block={screens.xs}>
                  Ubah Password
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAccount;
