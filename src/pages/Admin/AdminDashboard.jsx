import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Avatar,
  Breadcrumb,
  Typography,
  Select,
  Space,
} from 'antd';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import AdminLayout from '../../Layout/AdminLayout';

import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
} from '@ant-design/icons';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { Text } = Typography;
const { Option } = Select;

const AdminDashboard = () => {
  // State for year selection
  const [selectedYear, setSelectedYear] = useState(2024);

  // Available years
  const availableYears = [2022, 2023, 2024, 2025];

  // Sample data for multiple years
  const yearlyData = {
    2022: [800000, 900000, 850000, 950000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000, 1700000],
    2023: [900000, 1200000, 1000000, 1100000, 950000, 1250000, 1350000, 1450000, 1800000, 2000000, 1750000, 1900000],
    2024: [1000000, 1500000, 1200000, 1300000, 1100000, 1400000, 1600000, 1700000, 2500000, 2700000, 2000000, 2200000],
    2025: [1200000, 1600000, 1400000, 1500000, 1300000, 1600000, 1800000, 1900000, 2800000, 3000000, 2300000, 2500000]
  };

  // Get current chart data based on selected year
  const getCurrentChartData = () => {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: selectedYear.toString(),
          data: yearlyData[selectedYear],
          backgroundColor: 'rgba(24, 144, 255, 0.6)',
          borderColor: '#1890ff',
          borderWidth: 1,
        },
      ],
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Sales per Month - ${selectedYear}`,
        font: {
          family: 'Poppins, sans-serif',
          size: 16,
          weight: '600'
        }
      },
      legend: {
        labels: {
          font: {
            family: 'Poppins, sans-serif'
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Poppins, sans-serif'
          }
        }
      },
      y: {
        ticks: {
          font: {
            family: 'Poppins, sans-serif'
          },
          callback: function(value) {
            return 'Rp ' + (value / 1000000).toFixed(1) + 'M';
          }
        }
      }
    }
  };

  const productsData = [
    { key: '1', product: 'Logitech G102', image: '/images/products/logitech-g102-1.png', sold: 10, stock: 12 },
    { key: '2', product: 'Ajazz AK35I', image: '/images/products/ajazz-ak35i.png', sold: 9, stock: 15 },
    { key: '3', product: 'Ajazz Apex', image: '/images/products/ajazz-apex.png', sold: 9, stock: 15 },
  ];

  // Sample data for top customers
  const topCustomersData = [
    {
      key: '1',
      name: 'Ahmad Rizki',
      email: 'ahmad.rizki@email.com',
      totalTransactions: 45,
      totalSpent: 125000000,
      lastOrder: '2024-12-15',
      avatar: '/images/avatars/user1.png',
      rank: 1
    },
    {
      key: '2',
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@email.com',
      totalTransactions: 38,
      totalSpent: 98500000,
      lastOrder: '2024-12-14',
      avatar: '/images/avatars/user2.png',
      rank: 2
    },
    {
      key: '3',
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      totalTransactions: 42,
      totalSpent: 87200000,
      lastOrder: '2024-12-13',
      avatar: '/images/avatars/user3.png',
      rank: 3
    },
    {
      key: '4',
      name: 'Diana Putri',
      email: 'diana.putri@email.com',
      totalTransactions: 29,
      totalSpent: 76800000,
      lastOrder: '2024-12-12',
      avatar: '/images/avatars/user4.png',
      rank: 4
    },
    {
      key: '5',
      name: 'Eko Prasetyo',
      email: 'eko.prasetyo@email.com',
      totalTransactions: 35,
      totalSpent: 65400000,
      lastOrder: '2024-12-11',
      avatar: '/images/avatars/user5.png',
      rank: 5
    }
  ];

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (img) => <Avatar shape="square" size={40} src={img} alt="product" />,
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Terjual',
      dataIndex: 'sold',
      key: 'sold',
    },
    {
      title: 'Stok',
      dataIndex: 'stock',
      key: 'stock',
    },
  ];

  // Columns for top customers table
  const customerColumns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 60,
      render: (rank) => (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 30,
          height: 30,
          borderRadius: '50%',
          backgroundColor: rank <= 3 ? '#FFD700' : '#f0f0f0',
          color: rank <= 3 ? '#fff' : '#666',
          fontWeight: '600',
          fontSize: '12px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          {rank}
        </div>
      ),
    },
    {
      title: 'Pelanggan',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar
            size={32}
            src={record.avatar}
            style={{ backgroundColor: '#1890ff' }}
          >
            {name.charAt(0)}
          </Avatar>
          <div>
            <div style={{
              fontWeight: '500',
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif',
              color: '#333'
            }}>
              {name}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#666',
              fontFamily: 'Poppins, sans-serif'
            }}>
              {record.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Transaksi',
      dataIndex: 'totalTransactions',
      key: 'totalTransactions',
      align: 'center',
      render: (count) => (
        <div style={{
          fontWeight: '600',
          fontFamily: 'Poppins, sans-serif'
        }}>
          {count}x
        </div>
      ),
    },
    {
      title: 'Total Belanja',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      align: 'right',
      render: (amount) => (
        <div style={{
          fontWeight: '600',
          fontFamily: 'Poppins, sans-serif'
        }}>
          Rp {(amount / 1000000).toFixed(1)}M
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="admin-page">
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic title="Total Produk" value={150} prefix={<ShoppingOutlined style={{ color: '#1890ff' }} />} />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic title="Produk Terjual" value={76} prefix={<ShoppingCartOutlined style={{ color: '#52c41a' }} />} />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic title="Total Transaksi" value={23000000} prefix={<DollarOutlined style={{ color: '#faad14' }} />} />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Card>
                  <Statistic title="Total Pelanggan" value={200} prefix={<UserOutlined style={{ color: '#eb2f96' }} />} />
                </Card>
              </Col>
            </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={14}>
          <Card
            title={
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <span style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Sales Analytics
                </span>
                <Space>
                  <Text style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#666' }}>
                    Tahun:
                  </Text>
                  <Select
                    value={selectedYear}
                    onChange={setSelectedYear}
                    style={{ width: 100, fontFamily: 'Poppins, sans-serif' }}
                    size="small"
                  >
                    {availableYears.map(year => (
                      <Option key={year} value={year} style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {year}
                      </Option>
                    ))}
                  </Select>
                </Space>
              </div>
            }
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <div style={{ height: 350, width: '100%' }}>
              <Bar
                data={getCurrentChartData()}
                options={chartOptions}
              />
            </div>

            {/* Instructions */}
            <div style={{
              marginTop: 16,
              padding: '12px 16px',
              backgroundColor: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #bae6fd'
            }}>
              <Text style={{ fontSize: '12px', color: '#0369a1', fontFamily: 'Poppins, sans-serif' }}>
                💡 Gunakan selector tahun di atas untuk melihat data penjualan tahun yang berbeda.
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title={
              <span style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '18px',
                fontWeight: '600',
                color: '#333'
              }}>
                Produk & Pelanggan Unggulan
              </span>
            }
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {/* Produk Unggulan Section */}
            <div style={{ marginBottom: 24 }}>
              <Text style={{
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif',
                display: 'block',
                marginBottom: 12
              }}>
                Produk Unggulan
              </Text>
              <Table
                columns={columns}
                dataSource={productsData}
                pagination={false}
                scroll={{ x: true }}
                size="small"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
            </div>

            {/* Top Customers Section */}
            <div>
              <Text style={{
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif',
                display: 'block',
                marginBottom: 12
              }}>
                Top Pelanggan
              </Text>
              <Table
                columns={customerColumns}
                dataSource={topCustomersData}
                pagination={false}
                scroll={{ x: true }}
                size="small"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              />
            </div>
          </Card>
        </Col>
      </Row>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
