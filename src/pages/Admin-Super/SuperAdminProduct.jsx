import React, { useState } from 'react';
import {
  Button,
  Table,
  Space,
  Breadcrumb,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import SuperAdminLayout from '../../components/SuperAdminLayout';
import { dummyProducts } from '../../data/dummyProducts';
import { useNavigate } from 'react-router-dom';

const SuperAdminProduct = () => {
  const navigate = useNavigate();

  const [dataSource] = useState(
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

  const handleView = (record) => {
    navigate(`/superadmin-view-product/${record.productId}`);
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
          {/* Tombol View */}
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          <Button
            style={{ background: '#FFD600', color: '#000', border: 'none' }}
            onClick={() => navigate(`/superadmin-product-review/${record.productId}`)}
          >
            Review
          </Button>
          {/* Tombol edit dan delete dihilangkan */}
        </Space>
      ),
    },
  ];

  return (
    <SuperAdminLayout>
      <div className="admin-page">
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>Super Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
        </Breadcrumb>

        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          style={{ marginTop: 16 }}
        />
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminProduct;
