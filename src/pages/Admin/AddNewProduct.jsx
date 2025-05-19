import { Layout, Form, Input, InputNumber, Button, Select, Upload, message, Breadcrumb, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideNav from '../../components/AdminSideNav';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Option } = Select;

const AddNewProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = () => {
    message.success('Product added successfully!');
    navigate('/admin-product');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AdminNavbar />
      <Layout>
        <AdminSideNav />
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
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              {/* Baris 1: 4 kolom */}
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
              {/* Baris 2: 2 kolom */}
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
                      <Option value="Pre Order">Pre Order</Option>
                      <Option value="Out of Stock">Out of Stock</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              {/* Baris 3: Description */}
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input description!' }]}
                  >
                    <Input.TextArea rows={4} placeholder="Descriptionr" />
                  </Form.Item>
                </Col>
              </Row>
              {/* Baris 4: Upload Image */}
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
              {/* Baris 5: Tombol */}
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