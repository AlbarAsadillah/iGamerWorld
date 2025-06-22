import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Upload, message, Breadcrumb, Row, Col, Card, Typography, Modal, Tag } from 'antd';
import { UploadOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import AdminLayout from '../../Layout/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyProducts } from '../../data/dummyProducts';

const { Option } = Select;
const { Text } = Typography;

const EditProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [productImages, setProductImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [newVariantName, setNewVariantName] = useState('');

  // Cari produk berdasarkan id
  const product = dummyProducts.find((item) => item.id === parseInt(id));

  const addVariant = () => {
    if (newVariantName.trim() === '') {
      message.warning('Please enter variant name!');
      return;
    }

    const newVariant = {
      id: Date.now(),
      name: newVariantName.trim()
    };

    const updatedVariants = [...variants, newVariant];
    setVariants(updatedVariants);
    form.setFieldsValue({ variants: updatedVariants });

    // Reset input fields
    setNewVariantName('');

    message.success(`Variant "${newVariant.name}" added successfully!`);
  };

  const removeVariant = (variantId) => {
    const updatedVariants = variants.filter(variant => variant.id !== variantId);
    setVariants(updatedVariants);
    form.setFieldsValue({ variants: updatedVariants });
    message.success('Variant removed successfully!');
  };

  useEffect(() => {
    if (product) {
      const existingVariants = product.variants || [];
      setVariants(existingVariants);

      form.setFieldsValue({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        compatible: product.socket, // gunakan atribut socket
        availability: product.stockStatus,
        description: product.description,
        variants: existingVariants,
        // image: product.image, // Untuk upload, biasanya handle berbeda
      });

      // Initialize product images
      setProductImages(product.images || []);
    }
  }, [product, form]);

  const handleDeleteImage = (imageIndex) => {
    Modal.confirm({
      title: 'Hapus Gambar',
      icon: <ExclamationCircleOutlined />,
      content: 'Apakah Anda yakin ingin menghapus gambar ini?',
      okText: 'Ya, Hapus',
      okType: 'danger',
      cancelText: 'Batal',
      onOk() {
        const updatedImages = productImages.filter((_, index) => index !== imageIndex);
        setProductImages(updatedImages);
        message.success('Gambar berhasil dihapus');
      },
    });
  };

  const onFinish = (values) => {
    const updatedProductData = {
      ...values,
      variants: variants
    };
    console.log('Updated product data:', updatedProductData);
    message.success('Product updated successfully!');
    navigate('/admin-product');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <AdminLayout>
      <div className="admin-page">
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
          <Breadcrumb.Item>Edit Product</Breadcrumb.Item>
        </Breadcrumb>
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
                    <Input placeholder="Input Placeholder" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select category!' }]}
                  >
                    <Select placeholder="Input Placeholder">
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
                      placeholder="Input Placeholder"
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
                    <Select placeholder="Input Placeholder">
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
                    <Select placeholder="Input Placeholder">
                      <Option value="Ready Stock">Ready Stock</Option>
                      <Option value="Out of Stock">Out of Stock</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              {/* Product Variants Row */}
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Product Variants"
                    name="variants"
                  >
                    <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', padding: '16px' }}>
                      {/* Add New Variant */}
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

                      {/* Display Added Variants */}
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
                    <Input.TextArea rows={4} placeholder="Input Placeholder" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  {/* Current Images Preview */}
                  {productImages && productImages.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <Text strong style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}>
                        Gambar Produk Saat Ini ({productImages.length}):
                      </Text>
                      <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
                        {productImages.map((image, index) => (
                          <Col key={index} xs={12} sm={8} md={6} lg={4}>
                            <Card
                              style={{
                                fontFamily: 'Poppins, sans-serif',
                                position: 'relative'
                              }}
                              styles={{ body: { padding: 8 } }}
                              hoverable
                            >
                              <img
                                src={image}
                                alt={`${product.name} - ${index + 1}`}
                                style={{
                                  width: '100%',
                                  height: 150,
                                  objectFit: 'cover',
                                  borderRadius: 6,
                                  border: '1px solid #d9d9d9'
                                }}
                              />
                              <div style={{
                                marginTop: 8,
                                textAlign: 'center',
                                fontFamily: 'Poppins, sans-serif'
                              }}>
                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                  Gambar {index + 1}
                                </Text>
                              </div>
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                                size="small"
                                onClick={() => handleDeleteImage(index)}
                                style={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                  borderRadius: '50%',
                                  width: 28,
                                  height: 28,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                title="Hapus gambar"
                              />
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}

                  <Form.Item
                    label="Upload Gambar Baru (Opsional)"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                    extra="Upload gambar baru jika ingin mengganti gambar yang sudah ada"
                  >
                    <Upload
                      name="image"
                      listType="picture"
                      beforeUpload={() => false}
                      accept="image/*"
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />} style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Pilih Gambar Baru
                      </Button>
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
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Form>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;