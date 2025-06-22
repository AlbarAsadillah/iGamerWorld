import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button, Upload, message, Form, Breadcrumb, Card, Image, Typography, Input, Select, Space, Divider, Switch } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideNav from '../../components/SuperAdminSideNav';

const { Content } = Layout;
const { Title, Text } = Typography;

const SuperAdminWebSettings = () => {
  // State untuk multi main banner
  const [mainBannerFiles, setMainBannerFiles] = useState([]);
  const [mainBannerPreviews, setMainBannerPreviews] = useState([]);

  // Footer banner tetap satu file
  const [footerBannerFile, setFooterBannerFile] = useState(null);
  const [footerBannerPreview, setFooterBannerPreview] = useState(null);

  // Media coverage multi file
  const [mediaCoverageFiles, setMediaCoverageFiles] = useState([]);
  const [mediaCoveragePreviews, setMediaCoveragePreviews] = useState([]);

  // State untuk metode pengiriman
  const [shippingMethods, setShippingMethods] = useState([
    { id: 1, name: 'JNE', cost: 25000, active: true },
    { id: 2, name: 'J&T Express', cost: 20000, active: true },
    { id: 3, name: 'SiCepat', cost: 22000, active: false },
  ]);

  // State untuk metode pembayaran
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Transfer Bank BCA', accountNumber: '1234567890', active: true },
    { id: 2, name: 'Transfer Bank Mandiri', accountNumber: '0987654321', active: true },
    { id: 3, name: 'Transfer Bank BRI', accountNumber: '1122334455', active: false },
  ]);

  // Update preview URLs untuk main banner
  useEffect(() => {
    const urls = mainBannerFiles.map(file => URL.createObjectURL(file));
    setMainBannerPreviews(urls);
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [mainBannerFiles]);

  // Update preview URL untuk footer banner
  useEffect(() => {
    if (footerBannerFile) {
      const url = URL.createObjectURL(footerBannerFile);
      setFooterBannerPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setFooterBannerPreview(null);
    }
  }, [footerBannerFile]);

  // Update preview URLs untuk media coverage
  useEffect(() => {
    const urls = mediaCoverageFiles.map(file => URL.createObjectURL(file));
    setMediaCoveragePreviews(urls);
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [mediaCoverageFiles]);

  // Load settings from localStorage
  useEffect(() => {
    const savedShippingMethods = localStorage.getItem('shippingMethods');
    const savedPaymentMethods = localStorage.getItem('paymentMethods');

    if (savedShippingMethods) {
      setShippingMethods(JSON.parse(savedShippingMethods));
    }

    if (savedPaymentMethods) {
      setPaymentMethods(JSON.parse(savedPaymentMethods));
    }
  }, []);

  // Handlers upload untuk main banner (multi file)
  const handleMainBannerUpload = (file) => {
    setMainBannerFiles(prev => [...prev, file]);
    message.success('Main banner image added!');
    return false;
  };

  // Handler upload untuk footer banner (single file)
  const handleFooterBannerUpload = (file) => {
    setFooterBannerFile(file);
    message.success('Footer banner updated successfully!');
    return false;
  };

  // Handler upload untuk media coverage (max 3)
  const handleMediaCoverageUpload = (file) => {
    if (mediaCoverageFiles.length >= 3) {
      message.error('You can only upload up to 3 media coverage images.');
      return false;
    }
    setMediaCoverageFiles(prev => [...prev, file]);
    message.success('Media coverage image added!');
    return false;
  };

  // Handlers untuk metode pengiriman
  const addShippingMethod = () => {
    const newId = Math.max(...shippingMethods.map(m => m.id), 0) + 1;
    setShippingMethods(prev => [...prev, {
      id: newId,
      name: '',
      cost: 0,
      active: true
    }]);
  };

  const updateShippingMethod = (id, field, value) => {
    setShippingMethods(prev => prev.map(method =>
      method.id === id ? { ...method, [field]: value } : method
    ));
  };

  const deleteShippingMethod = (id) => {
    setShippingMethods(prev => prev.filter(method => method.id !== id));
  };

  // Handlers untuk metode pembayaran
  const addPaymentMethod = () => {
    const newId = Math.max(...paymentMethods.map(m => m.id), 0) + 1;
    setPaymentMethods(prev => [...prev, {
      id: newId,
      name: '',
      accountNumber: '',
      active: true
    }]);
  };

  const updatePaymentMethod = (id, field, value) => {
    setPaymentMethods(prev => prev.map(method =>
      method.id === id ? { ...method, [field]: value } : method
    ));
  };

  const deletePaymentMethod = (id) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  // Save settings
  const saveSettings = () => {
    // Save to localStorage
    localStorage.setItem('shippingMethods', JSON.stringify(shippingMethods));
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
    message.success('Settings saved successfully!');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminNavbar />
      <Layout>
        <Layout.Sider width={250} style={{ background: '#fff' }}>
          <AdminSideNav collapsed={false} />
        </Layout.Sider>

        <Layout style={{ padding: '24px' }}>
          <Breadcrumb style={{ marginBottom: 16 }}>
            <Breadcrumb.Item>Super Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Web Settings</Breadcrumb.Item>
          </Breadcrumb>

          <Content
            style={{
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: 24,
            }}
          >
            <Row gutter={32}>
              {/* Left: Upload forms */}
              <Col xs={24} md={12}>
                <Card title="Main Banner Settings" style={{ marginBottom: 24 }}>
                  <Form layout="vertical">
                    <Form.Item label="Upload Main Banner Images">
                      <Upload
                        accept="image/*"
                        multiple
                        beforeUpload={handleMainBannerUpload}
                        showUploadList={{ showRemoveIcon: true }}
                        onRemove={(file) =>
                          setMainBannerFiles(files => files.filter(f => f.uid !== file.uid))
                        }
                        fileList={mainBannerFiles}
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                  </Form>
                </Card>

                <Card title="Footer Banner Settings" style={{ marginBottom: 24 }}>
                  <Form layout="vertical">
                    <Form.Item label="Upload Footer Banner Image">
                      <Upload
                        accept="image/*"
                        maxCount={1}
                        beforeUpload={handleFooterBannerUpload}
                        showUploadList={{ showRemoveIcon: true }}
                        onRemove={() => setFooterBannerFile(null)}
                        fileList={footerBannerFile ? [footerBannerFile] : []}
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                  </Form>
                </Card>

                <Card title="Media Coverage Images" extra={<Text type="secondary">Max 3 images</Text>}>
                  <Form layout="vertical">
                    <Form.Item label="Upload Media Coverage Images">
                      <Upload
                        accept="image/*"
                        multiple
                        beforeUpload={handleMediaCoverageUpload}
                        showUploadList={{ showRemoveIcon: true }}
                        onRemove={(file) =>
                          setMediaCoverageFiles(files => files.filter(f => f.uid !== file.uid))
                        }
                        fileList={mediaCoverageFiles}
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>

              {/* Right: Metode Pengiriman dan Pembayaran */}
              <Col xs={24} md={12}>
                <Card title="Metode Pengiriman" style={{ marginBottom: 24 }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {shippingMethods.map((method) => (
                      <Card key={method.id} size="small" style={{ backgroundColor: '#fafafa' }}>
                        <Row gutter={16} align="middle">
                          <Col span={8}>
                            <Input
                              placeholder="Nama kurir"
                              value={method.name}
                              onChange={(e) => updateShippingMethod(method.id, 'name', e.target.value)}
                            />
                          </Col>
                          <Col span={6}>
                            <Input
                              placeholder="Biaya"
                              type="number"
                              value={method.cost}
                              onChange={(e) => updateShippingMethod(method.id, 'cost', parseInt(e.target.value) || 0)}
                              addonBefore="Rp"
                            />
                          </Col>
                          <Col span={4}>
                            <Switch
                              checked={method.active}
                              onChange={(checked) => updateShippingMethod(method.id, 'active', checked)}
                              checkedChildren="Aktif"
                              unCheckedChildren="Nonaktif"
                            />
                          </Col>
                          <Col span={6}>
                            <Button
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => deleteShippingMethod(method.id)}
                              shape="circle"
                              title="Hapus metode pengiriman"
                            />
                          </Col>
                        </Row>
                      </Card>
                    ))}
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={addShippingMethod}
                      style={{ width: '100%' }}
                    >
                      Tambah Metode Pengiriman
                    </Button>
                  </Space>
                </Card>

                <Card title="Metode Pembayaran">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {paymentMethods.map((method) => (
                      <Card key={method.id} size="small" style={{ backgroundColor: '#fafafa' }}>
                        <Row gutter={16} align="middle">
                          <Col span={6}>
                            <Input
                              placeholder="Nama bank"
                              value={method.name}
                              onChange={(e) => updatePaymentMethod(method.id, 'name', e.target.value)}
                            />
                          </Col>
                          <Col span={10}>
                            <Input
                              placeholder="No. Rekening"
                              value={method.accountNumber}
                              onChange={(e) => updatePaymentMethod(method.id, 'accountNumber', e.target.value)}
                            />
                          </Col>
                          <Col span={3}>
                            <Switch
                              checked={method.active}
                              onChange={(checked) => updatePaymentMethod(method.id, 'active', checked)}
                              checkedChildren="Aktif"
                              unCheckedChildren="Nonaktif"
                            />
                          </Col>
                          <Col span={5}>
                            <Button
                              danger
                              icon={<DeleteOutlined />}
                              onClick={() => deletePaymentMethod(method.id)}
                              shape="circle"
                              title="Hapus metode pembayaran"
                            />
                          </Col>
                        </Row>
                      </Card>
                    ))}
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={addPaymentMethod}
                      style={{ width: '100%' }}
                    >
                      Tambah Metode Pembayaran
                    </Button>
                  </Space>
                </Card>

                <Divider />

                <Button
                  type="primary"
                  size="large"
                  onClick={saveSettings}
                  style={{ width: '100%' }}
                >
                  Simpan Pengaturan
                </Button>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SuperAdminWebSettings;
