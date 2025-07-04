import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd'; // Import komponen dari Ant Design
import { useNavigate, Link } from 'react-router-dom'; // Import hook untuk navigasi
import Lottie from 'lottie-react'; // Import Lottie as default
import animationData from '../../assets/login-animation.json'; // Path ke animasi Lottie kamu
import Button1 from '../../components/Button';  // Komponen Tombol yang sudah Anda buat

const AdminLogin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { email, password } = values;

    // Simulasi login (di dunia nyata, kamu akan memverifikasi username dan password melalui API)
    if (email === 'admin@gmail.com' && password === 'admin123') {
      // Simulasi role sebagai 'admin'
      localStorage.setItem('role', 'admin');
      navigate('/admin-dashboard');
    } else if (email === 'superadmin@gmail.com' && password === 'superadmin123') {
      // Simulasi role sebagai 'superadmin'
      localStorage.setItem('role', 'superadmin');
      navigate('/superadmin-dashboard');
    } else {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh', padding: 20, backgroundColor: '#fff' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Card
          style={{
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Row gutter={0} style={{ minHeight: 400 }}>
            {/* Kolom animasi Lottie */}
            <Col xs={24} md={12} style={{ backgroundColor: '#f0f2f5' }}>
              <div style={{ padding: 20, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lottie animationData={animationData} loop={true} style={{ width: '100%', maxHeight: 360 }} />
              </div>
            </Col>

            {/* Kolom form */}
            <Col xs={24} md={12} style={{ padding: 30, backgroundColor: '#fff' }}>
              <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#000' }}>Login Admin</h2>
              <Form
                name="admin-login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input placeholder="Type your email" />
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
                  label="Login"
                    type="primary"
                    htmlType="submit"
                    style={{width:'100%', }}
                  >
                    Login
                  </Button>
                </Form.Item>

                <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
                  <Link
                    to="/superadmin-forgot-password"
                    style={{
                      color: '#FFD700',
                      textDecoration: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '14px'
                    }}
                  >
                    Lupa Password?
                  </Link>
                </Form.Item>

                {errorMessage && <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>}
              </Form>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminLogin;
