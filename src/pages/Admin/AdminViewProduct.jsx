import { Layout, Row, Col, Button, Descriptions, Image, Space, Breadcrumb } from 'antd'; // Ant Design components
import AdminNavbar from '../../components/AdminNavbar'; // Import AdminNavbar
import AdminSideNav from '../../components/AdminSideNav'; // Import AdminSideNav
import { useNavigate, useParams } from 'react-router-dom'; // Import hooks for navigation and params
import { dummyProducts } from '../../data/dummyProducts'; // Import dummy data

const { Content } = Layout;

const AdminViewProduct = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const { id } = useParams(); // Get product ID from URL params

  // Find the product by ID
  const product = dummyProducts.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Admin Navbar */}
      <AdminNavbar />

      <Layout>
        {/* Admin Sidebar */}
        <AdminSideNav />

        <Layout style={{ padding: '0 24px 24px' }}>
          {/* Breadcrumb */}
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
            <Breadcrumb.Item>View Product</Breadcrumb.Item>
          </Breadcrumb>

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Row gutter={16}>
              {/* Product Image */}
              <Col xs={24} md={8}>
                <Image
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Space style={{ marginTop: '16px' }}>
                  {product.images.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Additional ${index}`}
                      width={50}
                      height={50}
                      style={{
                        objectFit: 'cover',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </Space>
              </Col>

              {/* Product Details */}
              <Col xs={24} md={16}>
                <Descriptions
                  title=""
                  bordered
                  labelStyle={{ textAlign: 'left' }} // Rata kiri untuk label
                  contentStyle={{ textAlign: 'left' }} // Rata kiri untuk konten
                >
                  <Descriptions.Item label="Name" span={3}>
                    {product.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Category" span={3}>
                    {product.category}
                  </Descriptions.Item>
                  <Descriptions.Item label="Subcategory" span={3}>
                    {product.subcategory}
                  </Descriptions.Item>
                  <Descriptions.Item label="Brand" span={3}>
                    {product.brand}
                  </Descriptions.Item>
                  <Descriptions.Item label="Socket" span={3}>
                    {product.socket ? product.socket : '-'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price" span={3}>
                    Rp {product.price.toLocaleString('id-ID')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Stock Status" span={3}>
                    {product.stockStatus}
                  </Descriptions.Item>
                  <Descriptions.Item label="Stock" span={3}>
                    {product.stock}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description" span={3}>
                    {product.description}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>

            {/* Back Button */}
            <Row gutter={16} style={{ marginTop: '24px' }}>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button type="default" onClick={() => navigate('/admin-product')}>
                  Back
                </Button>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminViewProduct;