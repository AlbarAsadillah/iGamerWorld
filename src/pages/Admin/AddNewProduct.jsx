import React, { useState } from 'react';
import { Layout, Form, Input, InputNumber, Button, Select, Upload, message, Breadcrumb, Row, Col, Tag } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideNav from '../../components/AdminSideNav';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Option } = Select;

const AddNewProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [variants, setVariants] = useState([]);
  const [newVariantName, setNewVariantName] = useState('');

  const addVariant = () => {
    if (newVariantName.trim() && !variants.find(v => v.name === newVariantName.trim())) {
      const newVariant = {
        id: Date.now(),
        name: newVariantName.trim()
      };
      setVariants([...variants, newVariant]);
      setNewVariantName('');
    }
  };

  const removeVariant = (variantId) => {
    setVariants(variants.filter(v => v.id !== variantId));
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    console.log('Variants:', variants);
    message.success('Product added successfully!');
    navigate('/admin-product');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminSideNav />
      <Layout>
        <AdminNavbar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
            <Breadcrumb.Item>Add New Product</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: '8px',
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="Product name"
                    name="name"
                    rules={[{ required: true, message: 'Please input product name!' }]}
                  >
                    <Input placeholder="Product Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select category!' }]}
                  >
                    <Select placeholder="Category">
                      <Option value="Aksesoris">Aksesoris</Option>
                      <Option value="Komponen">Komponen</Option>
                      <Option value="PC Bundling">PC Bundling</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input price!' }]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: '100%' }}
                      placeholder="Price"
                      formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[{ required: true, message: 'Please input stock!' }]}
                  >
                    <InputNumber min={0} style={{ width: '100%' }} placeholder="1" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Compatible to"
                    name="compatible"
                  >
                    <Select placeholder="Socket">
                      <Option value="AMD">AMD</Option>
                      <Option value="Intel">Intel</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Availability"
                    name="availability"
                  >
                    <Select placeholder="Status">
                      <Option value="Ready Stock">Ready Stock</Option>
                      <Option value="Out of Stock">Out of Stock</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Product Variants"
                    name="variants"
                  >
                    <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', padding: '16px' }}>
                      <div style={{ marginBottom: '16px' }}>
                        <h6 style={{ marginBottom: '12px', fontWeight: '600' }}>Add New Variant:</h6>
                        <Row gutter={8} align="middle">
                          <Col xs={24} sm={16}>
                            <Input
                              placeholder="Variant name (e.g., Red, Large, 256GB, Blue Switch)"
                              value={newVariantName}
                              onChange={(e) => setNewVariantName(e.target.value)}
                              onPressEnter={addVariant}
                            />
                          </Col>
                          <Col xs={24} sm={8}>
                            <Button
                              type="primary"
                              icon={<PlusOutlined />}
                              onClick={addVariant}
                              style={{ width: '100%' }}
                            >
                              Add Variant
                            </Button>
                          </Col>
                        </Row>
                      </div>

                      {variants.length > 0 && (
                        <div>
                          <h6 style={{ marginBottom: '12px', fontWeight: '600' }}>Added Variants:</h6>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {variants.map((variant) => (
                              <Tag
                                key={variant.id}
                                closable
                                onClose={() => removeVariant(variant.id)}
                                style={{
                                  padding: '4px 12px',
                                  fontSize: '14px',
                                  borderRadius: '16px',
                                  border: '1px solid #d9d9d9',
                                  backgroundColor: '#f0f0f0'
                                }}
                              >
                                {variant.name}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      )}

                      {variants.length === 0 && (
                        <div style={{
                          textAlign: 'center',
                          color: '#999',
                          fontStyle: 'italic',
                          padding: '20px 0'
                        }}>
                          No variants added yet. Add variants like colors, sizes, or specifications.
                        </div>
                      )}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input description!' }]}
                  >
                    <Input.TextArea rows={4} placeholder="Description" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Upload Image"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                    rules={[{ required: true, message: 'Please upload product image!' }]}
                  >
                    <Upload name="image" listType="picture" beforeUpload={() => false}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end" gutter={16}>
                <Col>
                  <Button onClick={() => navigate('/admin-product')}>Cancel</Button>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Add product
                  </Button>
                </Col>
              </Row>
            </Form>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AddNewProduct;
