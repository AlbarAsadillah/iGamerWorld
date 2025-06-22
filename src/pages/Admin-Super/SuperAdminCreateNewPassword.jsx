import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert, Typography, Divider, Modal, Row, Col } from 'antd';
import { LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SuperAdminCreateNewPassword = () => {
  const [form] = Form.useForm();
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsLoading(true);

    // Simulasi API call
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 1500);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/admin-login');
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
          maxWidth: '800px',
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
            Create New Password
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

        <Row gutter={32}>
          {/* Kolom Kiri - Form */}
          <Col xs={24} md={12}>
            {showAlert && (
              <Alert
                message={alertMessage}
                type="error"
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
              name="create-new-password"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
          <Form.Item
            name="password"
            label={
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>
                New Password
              </span>
            }
            rules={[
              { required: true, message: 'Password wajib diisi!' },
              { min: 8, message: 'Password harus minimal 8 karakter!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#666' }} />}
              placeholder="Masukkan password baru"
              size="large"
              style={{
                borderRadius: '8px',
                fontFamily: 'Poppins, sans-serif'
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>
                Confirm New Password
              </span>
            }
            dependencies={['password']}
            rules={[
              { required: true, message: 'Konfirmasi password wajib diisi!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Konfirmasi password tidak cocok!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#666' }} />}
              placeholder="Konfirmasi password baru"
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
              {isLoading ? 'Processing...' : 'Cretae New Password'}
            </Button>
          </Form.Item>
            </Form>

          </Col>

          {/* Kolom Kanan - Syarat Password */}
          <Col xs={24} md={12}>
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              padding: '12px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Title
                level={4}
                style={{
                  fontWeight: '600',
                  fontFamily: 'Poppins, sans-serif',
                  color: '#495057',
                  marginBottom: '20px',
                  textAlign: 'left'
                }}
              >
                Syarat Password:
              </Title>
              <ul style={{
                fontSize: '16px',
                color: '#6c757d',
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '0',
                paddingLeft: '20px',
                textAlign: 'left',
                lineHeight: '1.8'
              }}>
                <li style={{ marginBottom: '12px' }}>Minimal 8 karakter</li>
                <li style={{ marginBottom: '12px' }}>Kombinasi huruf dan angka direkomendasikan</li>
                <li style={{ marginBottom: '12px' }}>Hindari menggunakan informasi pribadi</li>
                <li style={{ marginBottom: '0' }}>Password akan dienkripsi dengan aman</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Success Modal */}
      <Modal
        open={showModal}
        onCancel={handleModalClose}
        footer={null}
        centered
        closable={false}
        width={400}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Title
            level={3}
            style={{
              fontWeight: '600',
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '15px',
              color: '#333'
            }}
          >
            Password Berhasil Diperbarui!
          </Title>
          <Text
            style={{
              color: '#666',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16px',
              display: 'block',
              marginBottom: '25px'
            }}
          >
            Password super admin Anda telah berhasil diperbarui. Silakan login dengan password baru.
          </Text>
          <Button
            type="primary"
            onClick={handleModalClose}
            size="large"
            style={{
              borderRadius: '25px',
              padding: '8px 30px',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'Poppins, sans-serif',
              height: 'auto'
            }}
          >
            Kembali ke Login
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SuperAdminCreateNewPassword;
