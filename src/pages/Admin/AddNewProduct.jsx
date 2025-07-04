import React, { useState } from 'react';
import { Layout, Form, Input, InputNumber, Button, Select, Upload, message, Breadcrumb, Row, Col, Tag } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideNav from '../../components/AdminSideNav';
import AdminLayout from '../../Layout/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { brandMeta } from '../../data/brandMeta';

const { Content } = Layout;
const { Option } = Select;

const AddNewProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [variants, setVariants] = useState([]);
  const [newVariant, setNewVariant] = useState({ name: '', price: null, stock: null, image: null });
  const [variantImageFileList, setVariantImageFileList] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [imageError, setImageError] = useState('');
  const [showPriceInput, setShowPriceInput] = useState(true);

  const handleVariantImage = (info) => {
    let fileObj = null;
    if (info.file.status === 'removed') {
      setNewVariant({ ...newVariant, image: null });
      setVariantImageFileList([]);
    } else if (info.file.originFileObj) {
      fileObj = info.file.originFileObj;
      setNewVariant({ ...newVariant, image: fileObj });
      setVariantImageFileList([info.file]);
    } else if (info.file instanceof File) {
      fileObj = info.file;
      setNewVariant({ ...newVariant, image: fileObj });
      setVariantImageFileList([info.file]);
    }
  };

  const addVariant = () => {
    if (
      newVariant.name.trim() &&
      newVariant.price !== null &&
      newVariant.stock !== null &&
      newVariant.image &&
      !variants.find(v => v.name === newVariant.name.trim())
    ) {
      const variantToAdd = {
        id: Date.now(),
        name: newVariant.name.trim(),
        price: newVariant.price,
        stock: newVariant.stock,
        image: newVariant.image,
      };
      const updatedVariants = [...variants, variantToAdd];
      setVariants(updatedVariants);
      setNewVariant({ name: '', price: null, stock: null, image: null });
      setVariantImageFileList([]);
      setShowPriceInput(false);
    }
  };

  const removeVariant = (variantId) => {
    const updatedVariants = variants.filter(v => v.id !== variantId);
    setVariants(updatedVariants);
    if (updatedVariants.length === 0) setShowPriceInput(true);
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    console.log('Variants:', variants);
    message.success('Product added successfully!');
    navigate('/admin-product');
  };

  const handleProductImageChange = ({ fileList }) => {
    setProductImages(fileList);
    setImageError('');
  };

  const beforeProductImageUpload = (file) => {
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isImage) {
      setImageError('Only JPG/PNG/WEBP files are allowed!');
      return Upload.LIST_IGNORE;
    }
    if (!isLt2M) {
      setImageError('Image must be smaller than 2MB!');
      return Upload.LIST_IGNORE;
    }
    if (productImages.length >= 5) {
      setImageError('Maximum 5 images allowed!');
      return Upload.LIST_IGNORE;
    }
    setImageError('');
    return true;
  };

  return (
    <AdminLayout>
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
          maxWidth: 1200,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* Foto Produk di atas */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Product Image</div>
          <Upload.Dragger
            name="image"
            listType="picture-card"
            fileList={productImages}
            onChange={handleProductImageChange}
            beforeUpload={() => false}
            action="#"
            multiple
            maxCount={5}
            accept="image/jpeg,image/png,image/webp"
            onRemove={file => {
              setProductImages(productImages.filter(f => f.uid !== file.uid));
            }}
            style={{ width: '100%' }}
          >
            {productImages.length < 5 && (
              <div>
                <UploadOutlined style={{ fontSize: 32, color: '#999' }} />
                <div style={{ marginTop: 8, color: '#888' }}>Drag & drop atau klik untuk upload (max 5)</div>
              </div>
            )}
          </Upload.Dragger>
          {imageError && <div style={{ color: 'red', marginTop: 4 }}>{imageError}</div>}
          <div style={{ color: '#888', fontSize: 12, marginTop: 4 }}>Hanya JPG/PNG/WEBP, max 2MB per gambar. Gambar pertama jadi cover.</div>
        </div>
        <Row gutter={32}>
          {/* Kolom kiri: input field utama */}
          <Col xs={24} md={14}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item label="Product name" name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
                <Input placeholder="Product Name" />
              </Form.Item>
              <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select category!' }]}>
                <Select placeholder="Category">
                  <Option value="Aksesoris">Aksesoris</Option>
                  <Option value="Komponen">Komponen</Option>
                  <Option value="PC Bundling">PC Bundling</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Subcategory" name="subcategory" rules={[{ required: true, message: 'Please select subcategory!' }]}>
                <Select placeholder="Subcategory">
                  <Option value="Mouse">Mouse</Option>
                  <Option value="Keyboard">Keyboard</Option>
                  <Option value="Headset">Headset</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Brand" name="brand" rules={[{ required: true, message: 'Please input brand!' }]}>
                <Select placeholder="Brand" showSearch optionFilterProp="children">
                  {brandMeta.map(b => (
                    <Option key={b.name} value={b.name}>
                      <img src={b.logo} alt={b.name} style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }} />
                      {b.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {showPriceInput && (
                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price!' }]}>
                  <InputNumber min={0} style={{ width: '100%' }} placeholder="Price" formatter={value => `Rp ${value}`} parser={value => value.replace(/Rp\s?|(,*)/g, '')} />
                </Form.Item>
              )}
              <Form.Item label="Compatible to" name="compatible">
                <Select placeholder="Socket">
                  <Option value="None">None</Option>
                  <Option value="AMD">AMD</Option>
                  <Option value="Intel">Intel</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input description!' }]}>
                <Input.TextArea rows={4} placeholder="Description" />
              </Form.Item>
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
          </Col>
          {/* Kolom kanan: daftar variant */}
          <Col xs={24} md={10}>
            <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', padding: '16px', background: '#fafafa' }}>
              <h6 style={{ marginBottom: '12px', fontWeight: '600' }}>Add New Variant:</h6>
              <Row gutter={8} align="middle">
                <Col xs={24} sm={12}>
                  <Input
                    placeholder="Variant name (e.g., Red, Large, 256GB, Blue Switch)"
                    value={newVariant.name}
                    onChange={e => setNewVariant({ ...newVariant, name: e.target.value })}
                  />
                </Col>
                <Col xs={24} sm={6}>
                  <InputNumber
                    min={0}
                    placeholder="Price"
                    value={newVariant.price}
                    formatter={value => `Rp ${value}`}
                    parser={value => value.replace(/Rp\s?|(,*)/g, '')}
                    onChange={price => setNewVariant({ ...newVariant, price })}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col xs={24} sm={6}>
                  <InputNumber
                    min={0}
                    placeholder="Stock"
                    value={newVariant.stock}
                    onChange={stock => setNewVariant({ ...newVariant, stock })}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col xs={24} sm={24} style={{ marginTop: 8 }}>
                  <Upload
                    name="variantImage"
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false}
                    onChange={handleVariantImage}
                    onRemove={() => {
                      setNewVariant({ ...newVariant, image: null });
                      setVariantImageFileList([]);
                    }}
                    fileList={variantImageFileList}
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                </Col>
                <Col xs={24} sm={24} style={{ marginTop: 8 }}>
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
              {variants.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <h6 style={{ marginBottom: '12px', fontWeight: '600' }}>Added Variants:</h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {variants.map((variant) => (
                      <div key={variant.id} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0f0f0', borderRadius: 16, padding: '4px 12px', border: '1px solid #d9d9d9' }}>
                        <Tag
                          closable
                          onClose={() => removeVariant(variant.id)}
                          style={{
                            padding: 0,
                            fontSize: '14px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            marginRight: 0
                          }}
                        >
                          {variant.name}
                        </Tag>
                        <span>Rp {variant.price}</span>
                        <span>Stock: {variant.stock}</span>
                        {variant.image && variant.image instanceof File && (
                          <img src={URL.createObjectURL(variant.image)} alt={variant.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                        )}
                      </div>
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
          </Col>
        </Row>
      </Content>
    </AdminLayout>
  );
};

export default AddNewProduct;
