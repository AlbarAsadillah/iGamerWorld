import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd'; // Import komponen dari Ant Design
import { useNavigate } from 'react-router-dom'; // Import hook untuk navigasi
import Lottie from 'lottie-react'; // Import Lottie as default
import animationData from '../../assets/login-animation.json'; // Path ke animasi Lottie kamu

const AdminLogin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { username, password } = values;

    // Simulasi login (di dunia nyata, kamu akan memverifikasi username dan password melalui API)
    if (username === 'admin' && password === 'admin123') {
      // Simulasi role sebagai 'admin'
      localStorage.setItem('role', 'admin');
      navigate('/admin-dashboard');
    } else if (username === 'superadmin' && password === 'superadmin123') {
      // Simulasi role sebagai 'superadmin'
      localStorage.setItem('role', 'superadmin');
      navigate('/super-admin-dashboard');
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {/* Bagian animasi Lottie di sebelah kiri */}
          <div style={{ flex: 1, padding: '20px' }}>
            <Lottie animationData={animationData} loop={true} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>

          {/* Form bagian kanan */}
          <div style={{ flex: 1, padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login Admin</h2>
            <Form
              name="admin-login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="Type your username" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Type your password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff',
                  }}
                >
                  Login
                </Button>
              </Form.Item>
              {errorMessage && <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>}
            </Form>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminLogin;
