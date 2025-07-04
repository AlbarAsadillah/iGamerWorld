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
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import AdminLayout from '../../Layout/AdminLayout';
import { dummyProducts } from '../../data/dummyProducts';
import { brandMeta } from '../../data/brandMeta';
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

  const [searchText, setSearchText] = useState('');
  const [metadataModalVisible, setMetadataModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('categories');

  const [categories, setCategories] = useState([
    { id: 1, name: 'Aksesoris', subcategories: ['Mouse', 'Keyboard', 'Headset', 'Mousepad'] },
    { id: 2, name: 'Komponen', subcategories: ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard'] },
    { id: 3, name: 'PC Bundling', subcategories: ['Gaming PC', 'Office PC', 'Workstation'] },
  ]);

  const [brands, setBrands] = useState([...brandMeta]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState(null);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandLogo, setNewBrandLogo] = useState(null);

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

  const handleAddBrand = () => {
    if (newBrandName && newBrandLogo) {
      const logoUrl = URL.createObjectURL(newBrandLogo);
      setBrands([...brands, { name: newBrandName, logo: logoUrl }]);
      setNewBrandName('');
      setNewBrandLogo(null);
      message.success('Brand added!');
    } else {
      message.error('Please input brand name and logo!');
    }
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
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
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

        {/* Search Bar & Metadata Button sejajar */}
        <Row gutter={[16, 16]} align="middle" justify="space-between" style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input.Search
              placeholder="Search product..."
              allowClear
              enterButton="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} style={{ textAlign: 'right' }}>
            <Space direction="horizontal" style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                onClick={() => navigate('/admin-add-product')}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Add New Product
              </Button>
              <Button
                icon={<SettingOutlined />}
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

        <Modal
          title="Metadata Management"
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
              >
                Categories
              </Button>
              <Button
                type={activeTab === 'subcategories' ? 'primary' : 'default'}
                onClick={() => setActiveTab('subcategories')}
              >
                Subcategories
              </Button>
              <Button
                type={activeTab === 'brands' ? 'primary' : 'default'}
                onClick={() => setActiveTab('brands')}
              >
                Brands
              </Button>
            </Space>
          </div>

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <Title level={4}>Manage Categories</Title>
              <div style={{ marginBottom: 24, padding: 16, backgroundColor: '#f6ffed', borderRadius: 8 }}>
                <Text strong>Add New Category</Text>
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    placeholder="Enter category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onPressEnter={handleAddCategory}
                  />
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddCategory}
                  >
                    Add
                  </Button>
                </Space.Compact>
              </div>
              <List
                header={<Text strong>Existing Categories ({categories.length})</Text>}
                bordered
                dataSource={categories}
                renderItem={(category) => (
                  <List.Item
                    actions={[
                      <Popconfirm
                        title="Delete this category?"
                        onConfirm={() => handleDeleteCategory(category.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger size="small">Delete</Button>
                      </Popconfirm>
                    ]}
                  >
                    <div>
                      <Text strong>{category.name}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {category.subcategories.length} subcategories
                      </Text>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          )}

          {/* Subcategories Tab */}
          {activeTab === 'subcategories' && (
            <div>
              <Title level={4}>Manage Subcategories</Title>
              <div style={{ marginBottom: 24, padding: 16, backgroundColor: '#f6ffed', borderRadius: 8 }}>
                <Text strong>Add New Subcategory</Text>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Select
                    placeholder="Select category"
                    value={selectedCategoryForSub}
                    onChange={setSelectedCategoryForSub}
                    style={{ width: '100%' }}
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
                    />
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleAddSubcategory}
                      disabled={!selectedCategoryForSub}
                    >
                      Add
                    </Button>
                  </Space.Compact>
                </Space>
              </div>
              {categories.map(category => (
                <div key={category.id} style={{ marginBottom: 24 }}>
                  <Divider orientation="left">{category.name}</Divider>
                  {category.subcategories.length > 0 ? (
                    <List
                      size="small"
                      bordered
                      dataSource={category.subcategories}
                      renderItem={(subcategory) => (
                        <List.Item
                          actions={[
                            <Popconfirm
                              title="Delete this subcategory?"
                              onConfirm={() => handleDeleteSubcategory(category.id, subcategory)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button danger size="small">Delete</Button>
                            </Popconfirm>
                          ]}
                        >
                          <Text>{subcategory}</Text>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Text type="secondary" italic>No subcategories yet</Text>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Brands Tab */}
          {activeTab === 'brands' && (
            <div>
              <Title level={4}>Manage Brands</Title>
              <div style={{ marginBottom: 24, padding: 16, backgroundColor: '#f6ffed', borderRadius: 8 }}>
                <Text strong>Add New Brand</Text>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Input
                    placeholder="Enter brand name"
                    value={newBrandName}
                    onChange={e => setNewBrandName(e.target.value)}
                    style={{ width: 300 }}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={e => setNewBrandLogo(e.target.files[0])}
                    style={{ width: 300 }}
                  />
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddBrand}
                  >
                    Add
                  </Button>
                </Space>
              </div>
              <List
                header={<Text strong>Existing Brands ({brands.length})</Text>}
                bordered
                dataSource={brands}
                renderItem={brand => (
                  <List.Item
                    actions={[
                      <Popconfirm
                        title="Delete this brand?"
                        onConfirm={() => setBrands(brands.filter(b => b.name !== brand.name))}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger size="small">Delete</Button>
                      </Popconfirm>
                    ]}
                  >
                    <img src={brand.logo} alt={brand.name} style={{ width: 32, height: 32, objectFit: 'contain', marginRight: 12 }} />
                    <Text strong>{brand.name}</Text>
                  </List.Item>
                )}
              />
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminProduct;
