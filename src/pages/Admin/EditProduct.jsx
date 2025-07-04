import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Upload, message, Breadcrumb, Row, Col, Tag } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import AdminLayout from '../../Layout/AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyProducts } from '../../data/dummyProducts';
import { brandMeta } from '../../data/brandMeta';

const { Option } = Select;

const EditProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = dummyProducts.find((item) => item.id === parseInt(id));

  // State untuk gambar produk
  const [productImages, setProductImages] = useState([]);
  const [imageError, setImageError] = useState('');
  // State untuk variant
  const [variants, setVariants] = useState([]);
  const [newVariant, setNewVariant] = useState({ name: '', price: null, stock: null, image: null });
  const [variantImageFileList, setVariantImageFileList] = useState([]);
  const [showPriceInput, setShowPriceInput] = useState(true);
  const [editingVariantId, setEditingVariantId] = useState(null);

  useEffect(() => {
    if (product) {
      if (product.images && product.images.length > 0) {
        setProductImages(product.images.map((img, idx) => ({
          uid: String(-idx - 1),
          name: `image-${idx + 1}`,
          status: 'done',
          url: img
        })));
      }
      // Inisialisasi variant
      setVariants(product.variants || []);
      setShowPriceInput(!(product.variants && product.variants.length > 0));
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        category: product.category,
        subcategory: product.subcategory,
        brand: product.brand,
        compatible: product.socket,
        description: product.description,
        price: (!product.variants || product.variants.length === 0) ? product.price : undefined,
      });
    }
  }, [product, form]);

  // --- Upload Gambar Produk ---
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

  // --- Variant Handler ---
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

  const onEditVariant = (variant) => {
    setEditingVariantId(variant.id);
    setNewVariant({
      name: variant.name,
      price: variant.price,
      stock: variant.stock,
      image: variant.image || null,
    });
    if (variant.image && variant.image instanceof File) {
      setVariantImageFileList([
        {
          uid: String(variant.id),
          name: variant.name,
          status: 'done',
          url: URL.createObjectURL(variant.image),
        },
      ]);
    } else if (variant.image && typeof variant.image === 'string') {
      setVariantImageFileList([
        {
          uid: String(variant.id),
          name: variant.name,
          status: 'done',
          url: variant.image,
        },
      ]);
    } else {
      setVariantImageFileList([]);
    }
  };

  const addOrUpdateVariant = () => {
    if (
      newVariant.name.trim() &&
      newVariant.price !== null &&
      newVariant.stock !== null &&
      newVariant.image
    ) {
      if (editingVariantId) {
        // Update variant
        const updatedVariants = variants.map(v =>
          v.id === editingVariantId ? { ...v, ...newVariant } : v
        );
        setVariants(updatedVariants);
        setEditingVariantId(null);
      } else {
        // Add new variant
        if (!variants.find(v => v.name === newVariant.name.trim())) {
          const variantToAdd = {
            id: Date.now(),
            name: newVariant.name.trim(),
            price: newVariant.price,
            stock: newVariant.stock,
            image: newVariant.image,
          };
          setVariants([...variants, variantToAdd]);
          setShowPriceInput(false);
        }
      }
      setNewVariant({ name: '', price: null, stock: null, image: null });
      setVariantImageFileList([]);
    }
  };

  const removeVariant = (variantId) => {
    const updatedVariants = variants.filter(v => v.id !== variantId);
    setVariants(updatedVariants);
    if (updatedVariants.length === 0) setShowPriceInput(true);
    if (editingVariantId === variantId) {
      setEditingVariantId(null);
      setNewVariant({ name: '', price: null, stock: null, image: null });
      setVariantImageFileList([]);
    }
  };

  // --- Submit ---
  const onFinish = (values) => {
    const data = {
      ...values,
      images: productImages,
      variants: variants,
    };
    console.log('Updated product:', data);
    message.success('Product updated successfully!');
    navigate('/admin-product');
  };

  if (!product) return <div>Product not found</div>;

  const initialFormValues = {
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    brand: product.brand,
    compatible: product.socket,
    description: product.description,
  };
  if (!product.variants || product.variants.length === 0) {
    initialFormValues.price = product.price;
  }

  return (
    <AdminLayout>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
        <Breadcrumb.Item>Edit Product</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Foto Produk</div>
        <Upload.Dragger
          name="image"
          listType="picture-card"
          fileList={productImages}
          onChange={handleProductImageChange}
          beforeUpload={beforeProductImageUpload}
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
            key={product.id} // force re-render jika id berubah
          >
            <Form.Item label="Product name" name="name" rules={[{ required: true, message: 'Please input product name!' }]}> 
              <Input placeholder="Product Name" value={form.getFieldValue('name') || ''} onChange={e => form.setFieldsValue({ name: e.target.value })} /> 
            </Form.Item>
            <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select category!' }]}> 
              <Select placeholder="Category" value={form.getFieldValue('category') || undefined} onChange={v => form.setFieldsValue({ category: v })}> 
                <Option value="Aksesoris">Aksesoris</Option> 
                <Option value="Komponen">Komponen</Option> 
                <Option value="PC Bundling">PC Bundling</Option> 
              </Select> 
            </Form.Item>
            <Form.Item label="Subcategory" name="subcategory" rules={[{ required: true, message: 'Please select subcategory!' }]}> 
              <Select placeholder="Subcategory" value={form.getFieldValue('subcategory') || undefined} onChange={v => form.setFieldsValue({ subcategory: v })}> 
                <Option value="Mouse">Mouse</Option> 
                <Option value="Keyboard">Keyboard</Option> 
                <Option value="Headset">Headset</Option> 
              </Select> 
            </Form.Item>
            <Form.Item label="Brand" name="brand" rules={[{ required: true, message: 'Please input brand!' }]}> 
              <Select placeholder="Brand" showSearch optionFilterProp="children" value={form.getFieldValue('brand') || undefined} onChange={v => form.setFieldsValue({ brand: v })}>
                {brandMeta.map(b => (
                  <Option key={b.name} value={b.name}>
                    <img src={b.logo} alt={b.name} style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }} />
                    {b.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {showPriceInput && (
              <>
                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price!' }]}> 
                  <InputNumber min={0} style={{ width: '100%' }} placeholder="Price" value={form.getFieldValue('price') || 0} onChange={v => form.setFieldsValue({ price: v })} formatter={value => `Rp ${value}`} parser={value => value.replace(/Rp\s?|(,*)/g, '')} />
                </Form.Item>
                <Form.Item label="Stock" name="stock" rules={[{ required: true, message: 'Please input stock!' }]}> 
                  <InputNumber min={0} style={{ width: '100%' }} placeholder="Stock" value={form.getFieldValue('stock') || 0} onChange={v => form.setFieldsValue({ stock: v })} />
                </Form.Item>
              </>
            )}
            <Form.Item label="Compatible to" name="compatible"> 
              <Select placeholder="Socket" value={form.getFieldValue('compatible') || undefined} onChange={v => form.setFieldsValue({ compatible: v })}> 
                <Option value="None">None</Option> 
                <Option value="AMD">AMD</Option> 
                <Option value="Intel">Intel</Option> 
              </Select> 
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input description!' }]}> 
              <Input.TextArea rows={4} placeholder="Description" value={form.getFieldValue('description') || ''} onChange={e => form.setFieldsValue({ description: e.target.value })} /> 
            </Form.Item>
            <Row justify="end" gutter={16}>
              <Col>
                <Button onClick={() => navigate('/admin-product')}>Cancel</Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">Save Changes</Button>
              </Col>
            </Row>
          </Form>
        </Col>
        {/* Kolom kanan: daftar variant */}
        <Col xs={24} md={10}>
          <div style={{ border: '1px solid #d9d9d9', borderRadius: '6px', padding: '16px', background: '#fafafa' }}>
            <h6 style={{ marginBottom: '12px', fontWeight: '600' }}>{editingVariantId ? 'Edit Variant:' : 'Add/Edit Variant:'}</h6>
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
                  icon={editingVariantId ? null : <PlusOutlined />}
                  onClick={addOrUpdateVariant}
                  style={{ width: '100%' }}
                >
                  {editingVariantId ? 'Update Variant' : 'Add Variant'}
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
                      {variant.image && typeof variant.image === 'string' && (
                        <img src={variant.image} alt={variant.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                      )}
                      {variant.image && variant.image instanceof File && (
                        <img src={URL.createObjectURL(variant.image)} alt={variant.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
                      )}
                      <Button size="small" onClick={() => onEditVariant(variant)} style={{ marginLeft: 8 }}>Edit</Button>
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
    </AdminLayout>
  );
};

export default EditProduct;