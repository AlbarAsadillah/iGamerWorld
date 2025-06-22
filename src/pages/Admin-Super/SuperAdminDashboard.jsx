import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Avatar,
  Breadcrumb,
  Button,
  Typography,
  Space,
  Select,
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

import SuperAdminLayout from '../../components/SuperAdminLayout';

import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
} from '@ant-design/icons';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { Text } = Typography;
const { Option } = Select;

const SuperAdminDashboard = () => {
  const [selectedYear, setSelectedYear] = useState(2024); // Default to current year
  const [selectedMonth, setSelectedMonth] = useState(null); // null = monthly view, number = weekly view

  // Available years for selection
  const availableYears = [2020, 2021, 2022, 2023, 2024];

  // Available months
  const availableMonths = [
    { value: 1, label: 'Januari' },
    { value: 2, label: 'Februari' },
    { value: 3, label: 'Maret' },
    { value: 4, label: 'April' },
    { value: 5, label: 'Mei' },
    { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' },
    { value: 8, label: 'Agustus' },
    { value: 9, label: 'September' },
    { value: 10, label: 'Oktober' },
    { value: 11, label: 'November' },
    { value: 12, label: 'Desember' }
  ];

  // Function to get current view mode
  const getCurrentViewMode = () => {
    if (selectedMonth === null) return 'monthly';
    return 'weekly';
  };

  // Sample data for yearly sales chart
  const yearlySalesData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Penjualan (Rp)',
        data: [650000000, 750000000, 850000000, 1100000000, 1187000000],
        backgroundColor: [
          'rgba(245, 34, 45, 0.8)',
          'rgba(250, 173, 20, 0.8)',
          'rgba(82, 196, 26, 0.8)',
          'rgba(24, 144, 255, 0.8)',
          'rgba(114, 46, 209, 0.8)'
        ],
        borderColor: [
          '#f5222d',
          '#faad14',
          '#52c41a',
          '#1890ff',
          '#722ed1'
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // Sample data for monthly sales chart (current year)
  const getMonthlySalesData = (year) => {
    const baseData = {
      2024: [85000000, 92000000, 78000000, 105000000, 88000000, 96000000, 112000000, 89000000, 94000000, 108000000, 115000000, 125000000],
      2023: [75000000, 82000000, 68000000, 95000000, 78000000, 86000000, 102000000, 79000000, 84000000, 98000000, 105000000, 115000000],
      2022: [65000000, 72000000, 58000000, 85000000, 68000000, 76000000, 92000000, 69000000, 74000000, 88000000, 95000000, 105000000],
      2021: [55000000, 62000000, 48000000, 75000000, 58000000, 66000000, 82000000, 59000000, 64000000, 78000000, 85000000, 95000000],
      2020: [45000000, 52000000, 38000000, 65000000, 48000000, 56000000, 72000000, 49000000, 54000000, 68000000, 75000000, 85000000]
    };

    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'],
      datasets: [
        {
          label: 'Penjualan (Rp)',
          data: baseData[year] || baseData[2024],
          backgroundColor: 'rgba(24, 144, 255, 0.8)',
          borderColor: '#1890ff',
          borderWidth: 2,
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    };
  };

  // Sample data for weekly sales chart (by year and month)
  const getWeeklySalesData = (year, month) => {
    // Mock data for different months and years
    const weeklyData = {
      2024: {
        1: [8500000, 9200000, 7800000, 10500000], // January 2024
        2: [8800000, 9600000, 8200000, 11200000], // February 2024
        3: [7800000, 8400000, 7200000, 9800000],  // March 2024
        4: [10500000, 11300000, 9700000, 13500000], // April 2024
        5: [8800000, 9500000, 8100000, 11000000], // May 2024
        6: [9600000, 10300000, 8900000, 12200000], // June 2024
        7: [11200000, 12000000, 10400000, 14400000], // July 2024
        8: [8900000, 9600000, 8200000, 11300000], // August 2024
        9: [9400000, 10100000, 8700000, 12000000], // September 2024
        10: [10800000, 11600000, 10000000, 13600000], // October 2024
        11: [11500000, 12300000, 10700000, 14500000], // November 2024
        12: [8500000, 12300000, 9800000, 15200000], // December 2024
      },
      2023: {
        1: [7500000, 8200000, 6800000, 9500000], // January 2023
        2: [7800000, 8600000, 7200000, 10200000], // February 2023
        3: [6800000, 7400000, 6200000, 8800000],  // March 2023
        4: [9500000, 10300000, 8700000, 12500000], // April 2023
        5: [7800000, 8500000, 7100000, 10000000], // May 2023
        6: [8600000, 9300000, 7900000, 11200000], // June 2023
        7: [10200000, 11000000, 9400000, 13400000], // July 2023
        8: [7900000, 8600000, 7200000, 10300000], // August 2023
        9: [8400000, 9100000, 7700000, 11000000], // September 2023
        10: [9800000, 10600000, 9000000, 12600000], // October 2023
        11: [10500000, 11300000, 9700000, 13500000], // November 2023
        12: [11500000, 12300000, 10700000, 14500000], // December 2023
      },
      2022: {
        1: [6500000, 7200000, 5800000, 8500000], // January 2022
        2: [6800000, 7600000, 6200000, 9200000], // February 2022
        3: [5800000, 6400000, 5200000, 7800000],  // March 2022
        4: [8500000, 9300000, 7700000, 11500000], // April 2022
        5: [6800000, 7500000, 6100000, 9000000], // May 2022
        6: [7600000, 8300000, 6900000, 10200000], // June 2022
        7: [9200000, 10000000, 8400000, 12400000], // July 2022
        8: [6900000, 7600000, 6200000, 9300000], // August 2022
        9: [7400000, 8100000, 6700000, 10000000], // September 2022
        10: [8800000, 9600000, 8000000, 11600000], // October 2022
        11: [9500000, 10300000, 8700000, 12500000], // November 2022
        12: [10500000, 11300000, 9700000, 13500000], // December 2022
      },
      2021: {
        1: [5500000, 6200000, 4800000, 7500000], // January 2021
        2: [5800000, 6600000, 5200000, 8200000], // February 2021
        3: [4800000, 5400000, 4200000, 6800000],  // March 2021
        4: [7500000, 8300000, 6700000, 10500000], // April 2021
        5: [5800000, 6500000, 5100000, 8000000], // May 2021
        6: [6600000, 7300000, 5900000, 9200000], // June 2021
        7: [8200000, 9000000, 7400000, 11400000], // July 2021
        8: [5900000, 6600000, 5200000, 8300000], // August 2021
        9: [6400000, 7100000, 5700000, 9000000], // September 2021
        10: [7800000, 8600000, 7000000, 10600000], // October 2021
        11: [8500000, 9300000, 7700000, 11500000], // November 2021
        12: [9500000, 10300000, 8700000, 12500000], // December 2021
      },
      2020: {
        1: [4500000, 5200000, 3800000, 6500000], // January 2020
        2: [4800000, 5600000, 4200000, 7200000], // February 2020
        3: [3800000, 4400000, 3200000, 5800000],  // March 2020
        4: [6500000, 7300000, 5700000, 9500000], // April 2020
        5: [4800000, 5500000, 4100000, 7000000], // May 2020
        6: [5600000, 6300000, 4900000, 8200000], // June 2020
        7: [7200000, 8000000, 6400000, 10400000], // July 2020
        8: [4900000, 5600000, 4200000, 7300000], // August 2020
        9: [5400000, 6100000, 4700000, 8000000], // September 2020
        10: [6800000, 7600000, 6000000, 9600000], // October 2020
        11: [7500000, 8300000, 6700000, 10500000], // November 2020
        12: [8500000, 9300000, 7700000, 11500000], // December 2020
      }
    };

    const data = weeklyData[year]?.[month] || [8500000, 12300000, 9800000, 15200000];

    return {
      labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
      datasets: [
        {
          label: 'Penjualan (Rp)',
          data: data,
          backgroundColor: 'rgba(24, 144, 255, 0.8)',
          borderColor: '#1890ff',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  };

  // Function to get current chart data based on selections
  const getCurrentChartData = () => {
    const viewMode = getCurrentViewMode();
    switch (viewMode) {
      case 'monthly':
        return getMonthlySalesData(selectedYear);
      case 'weekly':
        return getWeeklySalesData(selectedYear, selectedMonth);
      default:
        return getMonthlySalesData(selectedYear);
    }
  };

  // Function to get chart title
  const getChartTitle = () => {
    const viewMode = getCurrentViewMode();
    switch (viewMode) {
      case 'monthly':
        return `Penjualan Per Bulan - ${selectedYear}`;
      case 'weekly':
        const monthName = availableMonths.find(m => m.value === selectedMonth)?.label || 'Desember';
        return `Penjualan Per Minggu - ${monthName} ${selectedYear}`;
      default:
        return `Penjualan Per Bulan - ${selectedYear}`;
    }
  };

  // Function to handle year selection
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null); // Reset month when year changes
  };

  // Function to handle month selection
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  // Function to go back to monthly view from weekly
  const handleGoBack = () => {
    setSelectedMonth(null); // Go back to monthly view
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: getChartTitle(),
        font: {
          size: 16,
          family: 'Poppins',
          weight: '600'
        },
        color: '#333'
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            family: 'Poppins',
            size: 12
          },
          color: '#666'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Poppins',
          size: 14,
          weight: '600'
        },
        bodyFont: {
          family: 'Poppins',
          size: 12
        },
        callbacks: {
          label: function(context) {
            return `Penjualan: Rp ${context.parsed.y.toLocaleString('id-ID')}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: 'Poppins',
            size: 11
          },
          color: '#666',
          callback: function(value) {
            return 'Rp ' + (value / 1000000).toFixed(0) + 'M';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          font: {
            family: 'Poppins',
            size: 12,
            weight: '500'
          },
          color: '#333'
        },
        grid: {
          display: false
        }
      }
    }
  };

  const productsData = [
    { key: '1', product: 'Logitech G102', image: '/images/products/logitech-g102-1.png', sold: 10, stock: 12 },
    { key: '2', product: 'Razer Kraken', image: '/images/products/razer-kraken.png', sold: 9, stock: 15 },
    { key: '3', product: 'Vortex Series Oni R1', image: '/images/products/vortex-oni-r1.png', sold: 9, stock: 15 },
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
    <SuperAdminLayout>
      <div className="admin-page">
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item>Super Admin</Breadcrumb.Item>
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
                      <Space wrap>
                        {/* Back Button - Only show in weekly view */}
                        {selectedMonth !== null && (
                          <Button
                            size="small"
                            onClick={handleGoBack}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            ← Kembali ke Bulanan
                          </Button>
                        )}

                        {/* Year Selector */}
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

                        {/* Current Selection Display */}
                        {selectedMonth !== null && (
                          <Text style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', color: '#1890ff' }}>
                            {availableMonths.find(m => m.value === selectedMonth)?.label} {selectedYear}
                          </Text>
                        )}
                      </Space>
                    </div>
                  }
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <div style={{ height: 350, width: '100%' }}>
                    <Bar
                      data={getCurrentChartData()}
                      options={{
                        ...chartOptions,
                        onClick: (event, elements) => {
                          if (elements.length > 0) {
                            const elementIndex = elements[0].index;
                            const viewMode = getCurrentViewMode();

                            if (viewMode === 'monthly') {
                              // Click on month bar -> go to weekly view
                              const clickedMonth = elementIndex + 1;
                              handleMonthSelect(clickedMonth);
                            }
                          }
                        }
                      }}
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
                      💡 {getCurrentViewMode() === 'monthly' && 'Klik pada bar bulan untuk melihat data mingguan. Gunakan selector tahun di atas untuk mengganti tahun.'}
                      {getCurrentViewMode() === 'weekly' && 'Data mingguan ditampilkan. Gunakan tombol "Kembali ke Bulanan" untuk kembali ke view bulanan.'}
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
    </SuperAdminLayout>
  );
};

export default SuperAdminDashboard;
