import { Layout, Row, Col, Button, Descriptions, Image, Space, Breadcrumb } from 'antd';
import SuperAdminNavbar from '../../components/AdminNavbar'; // navbar superadmin
import SuperAdminSideNav from '../../components/SuperAdminSideNav'; // sidenav superadmin
import { useNavigate, useParams } from 'react-router-dom';
import { dummyProducts } from '../../data/dummyProducts';

const { Content } = Layout;

const SuperAdminViewProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const product = dummyProducts.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Navbar SuperAdmin */}
      <SuperAdminNavbar />

      <Layout>
        {/* Sidebar SuperAdmin */}
        <SuperAdminSideNav />

        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Super Admin</Breadcrumb.Item>
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

              <Col xs={24} md={16}>
                <Descriptions
                  title=""
                  bordered
                  labelStyle={{ textAlign: 'left' }}
                  contentStyle={{ textAlign: 'left' }}
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

            <Row gutter={16} style={{ marginTop: '24px' }}>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button type="default" onClick={() => navigate('/superadmin-product')}>
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

export default SuperAdminViewProduct;
