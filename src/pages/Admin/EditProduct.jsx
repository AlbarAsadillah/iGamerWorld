import { useEffect } from 'react';
import { Layout, Form, Input, InputNumber, Button, Select, Upload, message, Breadcrumb, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideNav from '../../components/AdminSideNav';
import { useNavigate, useParams } from 'react-router-dom';
import { dummyProducts } from '../../data/dummyProducts';

const { Content } = Layout;
const { Option } = Select;

const EditProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  // Cari produk berdasarkan id
  const product = dummyProducts.find((item) => item.id === parseInt(id));

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        compatible: product.socket, // gunakan atribut socket
        availability: product.stockStatus,
        description: product.description,
        // image: product.image, // Untuk upload, biasanya handle berbeda
      });
    }
  }, [product, form]);

  const onFinish = () => {
    message.success('Product updated successfully!');
    navigate('/admin-product');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminNavbar />
      <Layout>
        <AdminSideNav />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
            <Breadcrumb.Item>Edit Product</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
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
                      <Option value="Pre Order">Pre Order</Option>
                      <Option value="Out of Stock">Out of Stock</Option>
                    </Select>
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
                  <Form.Item
                    label="Upload Image"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
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
                    Save Changes
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

export default EditProduct;