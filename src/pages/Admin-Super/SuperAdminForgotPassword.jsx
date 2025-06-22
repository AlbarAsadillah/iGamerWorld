import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert, Typography, Divider } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SuperAdminForgotPassword = () => {
  const [form] = Form.useForm();
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsLoading(true);

    // Simulasi API call
    setTimeout(() => {
      setAlertMessage('Link reset password telah dikirim ke email Anda. Mengalihkan ke halaman reset password...');
      setShowAlert(true);
      setIsLoading(false);
      form.resetFields();

      // Redirect ke halaman create new password setelah 2 detik
      setTimeout(() => {
        navigate('/superadmin-create-new-password');
      }, 2000);
    }, 1500);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title
            level={2}
            style={{
              fontWeight: '700',
              color: '#333',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '8px'
            }}
          >
            Lupa Password
          </Title>
          <Text
            style={{
              color: '#666',
              fontSize: '16px',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            Super Admin Portal
          </Text>
          <Divider style={{ margin: '16px 0', borderColor: '#FFD700' }} />
        </div>

        {showAlert && (
          <Alert
            message="Berhasil!"
            description={alertMessage}
            type="success"
            showIcon
            style={{
              marginBottom: '24px',
              fontFamily: 'Poppins, sans-serif'
            }}
            closable
            onClose={() => setShowAlert(false)}
          />
        )}

        <Form
          form={form}
          name="forgot-password"
          onFinish={onFinish}
          layout="vertical"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <Form.Item
            name="email"
            label={
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>
                Email Super Admin
              </span>
            }
            rules={[
              { required: true, message: 'Email wajib diisi!' },
              { type: 'email', message: 'Format email tidak valid!' }
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#666' }} />}
              placeholder="Masukkan email super admin Anda"
              size="large"
              style={{
                borderRadius: '8px',
                fontFamily: 'Poppins, sans-serif'
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              size="large"
              style={{
                borderRadius: '8px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                height: '48px'
              }}
            >
              {isLoading ? 'Processing...' : 'Send Email'}
            </Button>
          </Form.Item>
        </Form>


        {/* <Divider style={{ margin: '24px 0' }} /> */}

        {/* <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '16px'
        }}>
          <Title
            level={5}
            style={{
              fontWeight: '600',
              fontFamily: 'Poppins, sans-serif',
              color: '#495057',
              marginBottom: '12px'
            }}
          >
            Informasi Reset Password:
          </Title>
          <ul style={{
            fontSize: '14px',
            color: '#6c757d',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '0',
            paddingLeft: '20px'
          }}>
            <li>Setelah submit, Anda akan diarahkan ke halaman reset password</li>
            <li>Masukkan email yang terdaftar sebagai super admin</li>
            <li>Password baru harus minimal 8 karakter</li>
            <li>Hubungi IT support jika mengalami kesulitan</li>
          </ul>
        </div> */}
      </Card>
    </div>
  );
};

export default SuperAdminForgotPassword;
