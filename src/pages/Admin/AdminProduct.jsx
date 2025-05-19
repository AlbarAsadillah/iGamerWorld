import { useState } from 'react';
import { Layout, Row, Col, Button, Table, Space, Breadcrumb, Modal } from 'antd'; // Ant Design components
import { EyeOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'; // Icons for actions
import AdminNavbar from '../../components/AdminNavbar'; // Import AdminNavbar
import AdminSideNav from '../../components/AdminSideNav'; // Import AdminSideNav
import { dummyProducts } from '../../data/dummyProducts'; // Import dummyProducts
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const { Content } = Layout;
const { confirm } = Modal;

const AdminProduct = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing
  const [dataSource, setDataSource] = useState(
    dummyProducts.map((product) => ({
      key: product.id.toString(),
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock, // Ambil stok asli dari dummyProducts
      image: product.image, // Add image property
    }))
  );

  // Function to show delete confirmation modal
  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Are you sure you want to delete this product?',
      icon: <ExclamationCircleOutlined />,
      content: `Product: ${record.name}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(record);
      },
    });
  };

  // Function to delete the product
  const handleDelete = (record) => {
    setDataSource((prevData) => prevData.filter((item) => item.productId !== record.productId));
  };

  // Function to view the product details
  const handleView = (record) => {
    navigate(`/admin-view-product/${record.productId}`); // Navigate to AdminViewProduct with productId
  };

  // Columns for the products table with filtering and sorting
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={image}
          alt="Product"
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
      ),
    },
    {
      title: 'Product Id',
      dataIndex: 'productId',
      key: 'productId',
      sorter: (a, b) => a.productId - b.productId, // Sort by Product Id
    },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length, // Sort by name length
      sortDirections: ['descend'],
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        {
          text: 'Aksesoris',
          value: 'Aksesoris',
        },
        {
          text: 'Komponen',
          value: 'Komponen',
        },
        {
          text: 'PC Bundling',
          value: 'PC Bundling',
        },
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `Rp ${price.toLocaleString('id-ID')}`, // Format price
      sorter: (a, b) => a.price - b.price, // Sort by price
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          <Button icon={<EditOutlined />} onClick={() => navigate(`/admin-edit-product/${record.productId}`)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => showDeleteConfirm(record)} // Show delete confirmation modal
          />
        </Space>
      ),
    },
  ];

  // Function to handle table changes (pagination, filters, sorter)
  const handleTableChange = (pagination, filters, sorter, extra) => {
    // Optional: handle table changes
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Admin Navbar */}
      <AdminNavbar />

      <Layout>
        {/* Admin Sidebar */}
        <AdminSideNav />

        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
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
              {/* Section Title and Add Product Button */}
              <Col span={24}>
                <Button type="primary" style={{ marginBottom: '16px' }} onClick={() => navigate('/admin-add-product')}>
                  Add New Product +
                </Button>
              </Col>
            </Row>

            {/* Products Table */}
            <Table
              dataSource={dataSource}
              columns={columns}
              onChange={handleTableChange} // Handle table changes like sorting/filtering
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminProduct;