import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Table,
  Space,
  Breadcrumb,
  Modal,
  Input,
  Form,
  Select,
  Typography,
  Divider,
  List,
  Popconfirm,
  message,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import AdminLayout from '../../Layout/AdminLayout';
import { dummyProducts } from '../../data/dummyProducts';
import { useNavigate } from 'react-router-dom';



const { confirm } = Modal;
const { Title, Text } = Typography;
const { Option } = Select;

const AdminProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState(
    dummyProducts.map((product) => ({
      key: product.id.toString(),
      productId: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
    }))
  );

  // Metadata modal state
  const [metadataModalVisible, setMetadataModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('categories');

  // Sample categories and subcategories data
  const [categories, setCategories] = useState([
    { id: 1, name: 'Aksesoris', subcategories: ['Mouse', 'Keyboard', 'Headset', 'Mousepad'] },
    { id: 2, name: 'Komponen', subcategories: ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard'] },
    { id: 3, name: 'PC Bundling', subcategories: ['Gaming PC', 'Office PC', 'Workstation'] },
  ]);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState(null);

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

  const handleDelete = (record) => {
    setDataSource((prevData) =>
      prevData.filter((item) => item.productId !== record.productId)
    );
  };

  const handleView = (record) => {
    navigate(`/admin-view-product/${record.productId}`);
  };

  // Metadata management functions
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName.trim(),
        subcategories: []
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      message.success('Category added successfully!');
    }
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    message.success('Category deleted successfully!');
  };

  const handleAddSubcategory = () => {
    if (newSubcategoryName.trim() && selectedCategoryForSub) {
      setCategories(categories.map(cat => {
        if (cat.id === selectedCategoryForSub) {
          return {
            ...cat,
            subcategories: [...cat.subcategories, newSubcategoryName.trim()]
          };
        }
        return cat;
      }));
      setNewSubcategoryName('');
      message.success('Subcategory added successfully!');
    }
  };

  const handleDeleteSubcategory = (categoryId, subcategoryName) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          subcategories: cat.subcategories.filter(sub => sub !== subcategoryName)
        };
      }
      return cat;
    }));
    message.success('Subcategory deleted successfully!');
  };

  const columns = [
    {
      title: 'Product Id',
      dataIndex: 'productId',
      key: 'productId',
      sorter: (a, b) => a.productId - b.productId,
    },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'product',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <Space align="center">
          <img
            src={record.image}
            alt={record.name}
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
          />
          <span>{record.name}</span>
        </Space>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Aksesoris', value: 'Aksesoris' },
        { text: 'Komponen', value: 'Komponen' },
        { text: 'PC Bundling', value: 'PC Bundling' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `Rp ${price.toLocaleString('id-ID')}`,
      sorter: (a, b) => a.price - b.price,
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
          {/* <Button icon={<EyeOutlined />} onClick={() => handleView(record)} /> */}
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin-edit-product/${record.productId}`)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => showDeleteConfirm(record)}
          />
          <Button
            style={{ background: '#FFD600', color: '#000', border: 'none' }}
            onClick={() => navigate(`/admin-product-review/${record.productId}`)}
          >
            Review
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="admin-page">
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
        </Breadcrumb>

        <Row gutter={[16, 16]} justify="end">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                type="primary"
                block
                onClick={() => navigate('/admin-add-product')}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Add New Product
              </Button>
              <Button
                icon={<SettingOutlined />}
                block
                onClick={() => setMetadataModalVisible(true)}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Metadata
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          style={{ marginTop: 16 }}
        />

        {/* Metadata Management Modal */}
        <Modal
          title={
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: '600' }}>
              Metadata Management
            </span>
          }
          open={metadataModalVisible}
          onCancel={() => setMetadataModalVisible(false)}
          footer={null}
          width={800}
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Button
                type={activeTab === 'categories' ? 'primary' : 'default'}
                onClick={() => setActiveTab('categories')}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Categories
              </Button>
              <Button
                type={activeTab === 'subcategories' ? 'primary' : 'default'}
                onClick={() => setActiveTab('subcategories')}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Subcategories
              </Button>
            </Space>
          </div>

          {activeTab === 'categories' && (
            <div>
              <Title level={4} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Manage Categories
              </Title>

              {/* Add New Category */}
              <div style={{ marginBottom: 24, padding: 16, backgroundColor: '#f6ffed', borderRadius: 8 }}>
                <Text strong style={{ fontFamily: 'Poppins, sans-serif', display: 'block', marginBottom: 12 }}>
                  Add New Category
                </Text>
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    placeholder="Enter category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onPressEnter={handleAddCategory}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddCategory}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Add
                  </Button>
                </Space.Compact>
              </div>

              {/* Categories List */}
              <List
                header={
                  <Text strong style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Existing Categories ({categories.length})
                  </Text>
                }
                bordered
                dataSource={categories}
                renderItem={(category) => (
                  <List.Item
                    actions={[
                      <Popconfirm
                        title="Are you sure you want to delete this category?"
                        description="This will also delete all subcategories under this category."
                        onConfirm={() => handleDeleteCategory(category.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          danger
                          size="small"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    ]}
                  >
                    <div>
                      <Text strong style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {category.name}
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px' }}>
                        {category.subcategories.length} subcategories
                      </Text>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          )}

          {activeTab === 'subcategories' && (
            <div>
              <Title level={4} style={{ fontFamily: 'Poppins, sans-serif' }}>
                Manage Subcategories
              </Title>

              {/* Add New Subcategory */}
              <div style={{ marginBottom: 24, padding: 16, backgroundColor: '#f6ffed', borderRadius: 8 }}>
                <Text strong style={{ fontFamily: 'Poppins, sans-serif', display: 'block', marginBottom: 12 }}>
                  Add New Subcategory
                </Text>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Select
                    placeholder="Select category"
                    value={selectedCategoryForSub}
                    onChange={setSelectedCategoryForSub}
                    style={{ width: '100%', fontFamily: 'Poppins, sans-serif' }}
                  >
                    {categories.map(category => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                  <Space.Compact style={{ width: '100%' }}>
                    <Input
                      placeholder="Enter subcategory name"
                      value={newSubcategoryName}
                      onChange={(e) => setNewSubcategoryName(e.target.value)}
                      onPressEnter={handleAddSubcategory}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleAddSubcategory}
                      disabled={!selectedCategoryForSub}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Add
                    </Button>
                  </Space.Compact>
                </Space>
              </div>

              {/* Subcategories List */}
              {categories.map(category => (
                <div key={category.id} style={{ marginBottom: 24 }}>
                  <Divider orientation="left">
                    <Text strong style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {category.name} ({category.subcategories.length})
                    </Text>
                  </Divider>
                  {category.subcategories.length > 0 ? (
                    <List
                      size="small"
                      bordered
                      dataSource={category.subcategories}
                      renderItem={(subcategory) => (
                        <List.Item
                          actions={[
                            <Popconfirm
                              title="Are you sure you want to delete this subcategory?"
                              onConfirm={() => handleDeleteSubcategory(category.id, subcategory)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                danger
                                size="small"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                              >
                                Delete
                              </Button>
                            </Popconfirm>
                          ]}
                        >
                          <Text style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {subcategory}
                          </Text>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Text type="secondary" style={{ fontFamily: 'Poppins, sans-serif', fontStyle: 'italic' }}>
                      No subcategories yet
                    </Text>
                  )}
                </div>
              ))}
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminProduct;
