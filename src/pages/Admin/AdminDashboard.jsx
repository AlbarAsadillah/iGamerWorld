import { Layout, Row, Col, Card, Statistic, Table, Avatar } from 'antd';
import { Bar } from 'react-chartjs-2'; // Ganti Line dengan Bar
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import AdminSideNav from '../../components/AdminSideNav'; // Impor AdminSideNav
import AdminNavbar from '../../components/AdminNavbar'; // Impor AdminNavbar
import { Breadcrumb } from 'antd';
import { ShoppingOutlined, ShoppingCartOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons'; // Import ikon dari Ant Design

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const { Content } = Layout;

const AdminDashboard = () => {
    // Data untuk Grafik Penjualan
    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: '2024',
                data: [1000000, 1500000, 1200000, 1300000, 1100000, 1400000, 1600000, 1700000, 2500000, 2700000, 2000000, 2200000],
                backgroundColor: 'rgba(24, 144, 255, 0.6)',
                borderColor: '#1890ff',
                borderWidth: 1,
            },
        ],
    };

    // Data untuk Tabel Produk Unggulan (dengan gambar)
    const productsData = [
        { 
            key: '1', 
            product: 'Logitech G102', 
            image: '/images/products/logitech-g102-1.png', 
            sold: 10, 
            stock: 12 
        },
        { 
            key: '2', 
            product: 'Razer Kraken', 
            image: '/images/products/razer-kraken.png', 
            sold: 9, 
            stock: 15 
        },
        { 
            key: '3', 
            product: 'Vortex Series Oni R1', 
            image: '/images/products/vortex-oni-r1.png', 
            sold: 9, 
            stock: 15 
        },
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

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminNavbar /> {/* Navbar untuk admin */}

            <Layout>
                <AdminSideNav /> {/* Side navigation */}

                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
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
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Total Produk"
                                        value={150}
                                        prefix={<ShoppingOutlined style={{ color: '#1890ff' }} />} // Tambahkan ikon
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Produk Terjual"
                                        value={76}
                                        prefix={<ShoppingCartOutlined style={{ color: '#52c41a' }} />} // Tambahkan ikon
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Total Transaksi"
                                        value={23000000}
                                        prefix={<DollarOutlined style={{ color: '#faad14' }} />} // Tambahkan ikon
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Total Pelanggan"
                                        value={200}
                                        prefix={<UserOutlined style={{ color: '#eb2f96' }} />} // Tambahkan ikon
                                    />
                                </Card>
                            </Col>
                        </Row>

                        <Row gutter={16} style={{ marginTop: '20px' }}>
                            <Col span={12}>
                                <Card>
                                    <h3>Sales</h3>
                                    <Bar
                                        data={salesData}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                title: { display: true, text: 'Sales per Month' },
                                            },
                                        }}
                                        height={200} // Atur tinggi chart
                                        width={400} // Atur lebar chart
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card title="Produk Unggulan">
                                    <Table columns={columns} dataSource={productsData} pagination={false} />
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;