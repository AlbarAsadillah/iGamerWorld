import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Button, Breadcrumb, Card, Table, Input, Modal, Image } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideNav from '../../components/AdminSideNav';
import { useNavigate, useParams } from 'react-router-dom';

// Dummy data lengkap untuk custom PC orders
const dummyCustomPcOrders = [
    {
        id: 'CP001',
        createdAt: '2025-05-01T10:30:00',
        status: 'diproses',
        customer: 'Budi Santoso',
        phone: '081234567890',
        address: 'Jl. Melati No. 12, Jakarta',
        shipping: 'JNE Reguler',
        shippingCost: 25000,
        resi: 'JNE123456789',
        total: 12000000,
        items: [
            {
                id: 'CPU001',
                name: 'Custom PC Ryzen 5',
                price: 12000000,
                quantity: 1,
                category: 'Custom PC',
                image: '/images/custompc/ryzen5.png',
                description: 'Custom PC dengan prosesor Ryzen 5',
            },
        ],
    },
    {
        id: 'CP002',
        createdAt: '2025-05-03T12:00:00',
        status: 'selesai',
        customer: 'Siti Aminah',
        phone: '089876543210',
        address: 'Jl. Kenanga No. 3, Bandung',
        shipping: 'TIKI ONS',
        shippingCost: 30000,
        resi: 'TIKI987654321',
        total: 15000000,
        items: [
            {
                id: 'CPU002',
                name: 'Custom PC Intel i7',
                price: 15000000,
                quantity: 1,
                category: 'Custom PC',
                image: '/images/custompc/intel-i7.png',
                description: 'Custom PC dengan prosesor Intel i7',
            },
        ],
    },
];

const { Content } = Layout;

const AdminViewCustom = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [resi, setResi] = useState('');
    const [paymentProofModal, setPaymentProofModal] = useState(false);
    const [selectedPaymentProof, setSelectedPaymentProof] = useState(null);

    useEffect(() => {
        // Cari order di localStorage (transactionHistory dan customPcHistory)
        const localHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        const customPcHistory = JSON.parse(localStorage.getItem('customPcHistory')) || [];

        // Cari di transactionHistory terlebih dahulu
        let foundOrder = localHistory.find((o) => String(o.id) === orderId);

        // Jika tidak ditemukan, cari di customPcHistory
        if (!foundOrder) {
            foundOrder = customPcHistory.find((o) => String(o.id) === orderId);
        }

        // Jika masih tidak ditemukan, coba cari di dummyCustomPcOrders sebagai fallback
        if (!foundOrder) {
            foundOrder = dummyCustomPcOrders.find((o) => String(o.id) === orderId);
        }

        if (foundOrder) {
            setOrder({
                orderId: foundOrder.id,
                invoice: `INV-${foundOrder.id}`,
                date: new Date(foundOrder.createdAt || foundOrder.orderDate).toLocaleDateString('id-ID'),
                customer: foundOrder.customerName || foundOrder.customer || 'Guest',
                phone: foundOrder.customerPhone || foundOrder.phone || '-',
                address: foundOrder.customerAddress || foundOrder.address || '-',
                status: foundOrder.status
                    ? foundOrder.status.charAt(0).toUpperCase() + foundOrder.status.slice(1)
                    : 'Diproses',
                shipping: foundOrder.shippingMethod || foundOrder.shipping || 'JNE - Reguler',
                shippingCost: foundOrder.shippingCost || 25000,
                resi: foundOrder.resi || '-',
                total: foundOrder.total || foundOrder.totalAmount || 0,
                items: (foundOrder.items || []).map((item) => ({
                    id: item.id || item.productId,
                    name: item.name,
                    category: item.category || '-',
                    price: item.price || 0,
                    quantity: item.quantity || item.qty || 1,
                    image: item.image || '/images/products/default.png',
                })),
            });
            setResi(foundOrder.resi || '-');
        } else {
            // Jika order tidak ditemukan, tampilkan pesan kosong
            setOrder(null);
            setResi('');
        }
    }, [orderId]);

    const handleViewPaymentProof = () => {
        // Cek di customPcHistory untuk bukti bayar
        const localCustomPc = JSON.parse(localStorage.getItem('customPcHistory')) || [];
        const localOrder = localCustomPc.find((o) => String(o.id) === orderId);

        // Jika tidak ada di customPcHistory, cek di transactionHistory
        if (!localOrder || !localOrder.paymentProof) {
            const localOrders = JSON.parse(localStorage.getItem('transactionHistory')) || [];
            const transactionOrder = localOrders.find((o) => String(o.id) === orderId);

            if (transactionOrder && transactionOrder.paymentProof) {
                setSelectedPaymentProof(transactionOrder.paymentProof);
                setPaymentProofModal(true);
            }
        } else {
            setSelectedPaymentProof(localOrder.paymentProof);
            setPaymentProofModal(true);
        }
    };

    if (!order) return <div style={{ padding: 32, color: '#fff' }}>Order not found</div>;

    const columns = [
        {
            title: 'Product Id',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: 'Item',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img
                        src={record.image}
                        alt={record.name}
                        style={{ width: 32, height: 32, objectFit: 'contain' }}
                    />
                    {text}
                </span>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            align: 'center',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            render: (price) => `Rp ${(price || 0).toLocaleString('id-ID')}`,
        },
        {
            title: 'QTY',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (quantity) => quantity || 1,
        },
        {
            title: 'Sub Total',
            key: 'subtotal',
            align: 'right',
            render: (_, record) => {
                const price = record.price || 0;
                const quantity = record.quantity || 1;
                return `Rp ${(price * quantity).toLocaleString('id-ID')}`;
            },
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminNavbar />
            <Layout>
                <AdminSideNav />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>Custom PC Orders</Breadcrumb.Item>
                        <Breadcrumb.Item>View Order</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content>
                        <Card
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: '#fff',
                                borderRadius: 8,
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            }}
                        >
                            <Row>
                                <Col xs={24} md={16} style={{ textAlign: 'left' }}>
                                    <div style={{ fontWeight: 600, fontSize: 16 }}>{order.invoice}</div>
                                    <div>{order.customer}</div>
                                    <div>{order.phone}</div>
                                    <div>{order.address}</div>
                                </Col>
                                <Col
                                    xs={24}
                                    md={8}
                                    style={{
                                        textAlign: 'right',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '8px',
                                    }}
                                >
                                    <div style={{ fontWeight: 600, marginBottom: 8, textAlign: 'left' }}>
                                        Invoice Info
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>Order Id</span>
                                        <span>{order.orderId}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>Date</span>
                                        <span>{order.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>Status</span>
                                        <span>{order.status}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Table
                                style={{ marginTop: 32, marginBottom: 16 }}
                                columns={columns}
                                dataSource={order.items}
                                pagination={false}
                                rowKey="id"
                                bordered={false}
                            />
                            <Row gutter={16} style={{ marginBottom: 16 }}>
                                <Col xs={24} md={6}>
                                    <div>Biaya Pengiriman</div>
                                    <Input
                                        value={order.shippingCost.toLocaleString('id-ID')}
                                        disabled
                                        style={{ marginTop: 4 }}
                                    />
                                </Col>
                                <Col xs={24} md={6}>
                                    <div>Pengiriman</div>
                                    <Input value={order.shipping} disabled style={{ marginTop: 4 }} />
                                </Col>
                                <Col xs={24} md={6}>
                                    <div>No. Resi</div>
                                    <Input
                                        placeholder="Masukkan Nomor Resi"
                                        style={{ marginTop: 4 }}
                                        value={resi}
                                        disabled
                                    />
                                </Col>
                                <Col xs={24} md={6}>
                                    <div>Total Pesanan</div>
                                    <Input value={order.total.toLocaleString('id-ID')} disabled style={{ marginTop: 4 }} />
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={24} style={{ textAlign: 'left', marginTop: 24 }}>
                                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                        <Button
                                            onClick={() => navigate('/admin-custom-pc')}
                                            style={{
                                                display: 'inline-block',
                                                width: 'auto',
                                                margin: 0,
                                            }}
                                        >
                                            Back
                                        </Button>

                                        {(() => {
                                            // Cek di customPcHistory untuk bukti bayar
                                            const localCustomPc = JSON.parse(localStorage.getItem('customPcHistory')) || [];
                                            const localOrder = localCustomPc.find((o) => String(o.id) === orderId);

                                            // Jika tidak ada di customPcHistory, cek di transactionHistory
                                            if (!localOrder || !localOrder.paymentProof) {
                                                const localOrders = JSON.parse(localStorage.getItem('transactionHistory')) || [];
                                                const transactionOrder = localOrders.find((o) => String(o.id) === orderId);

                                                return transactionOrder && transactionOrder.paymentProof ? (
                                                    <Button
                                                        icon={<FileImageOutlined />}
                                                        onClick={handleViewPaymentProof}
                                                        style={{
                                                            backgroundColor: '#1890ff',
                                                            borderColor: '#1890ff',
                                                            color: '#fff'
                                                        }}
                                                    >
                                                        Lihat Bukti Bayar
                                                    </Button>
                                                ) : null;
                                            } else {
                                                return (
                                                    <Button
                                                        icon={<FileImageOutlined />}
                                                        onClick={handleViewPaymentProof}
                                                        style={{
                                                            backgroundColor: '#1890ff',
                                                            borderColor: '#1890ff',
                                                            color: '#fff'
                                                        }}
                                                    >
                                                        Lihat Bukti Bayar
                                                    </Button>
                                                );
                                            }
                                        })()}
                                    </div>
                                </Col>
                            </Row>

                        </Card>
                    </Content>
                </Layout>
            </Layout>

            {/* Modal Bukti Bayar */}
            <Modal
                title="Bukti Pembayaran"
                open={paymentProofModal}
                onCancel={() => setPaymentProofModal(false)}
                footer={[
                    <Button key="close" onClick={() => setPaymentProofModal(false)}>
                        Tutup
                    </Button>
                ]}
                width={600}
            >
                {selectedPaymentProof && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '16px' }}>
                            <p><strong>Bank:</strong> {selectedPaymentProof.bankName}</p>
                            <p><strong>Atas Nama:</strong> {selectedPaymentProof.accountName}</p>
                            <p><strong>Nomor Rekening:</strong> {selectedPaymentProof.accountNumber}</p>
                            <p><strong>Waktu Upload:</strong> {new Date(selectedPaymentProof.uploadedAt).toLocaleString('id-ID')}</p>
                        </div>
                        <Image
                            src={selectedPaymentProof.image}
                            alt="Bukti Pembayaran"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '400px',
                                border: '1px solid #d9d9d9',
                                borderRadius: '6px'
                            }}
                        />
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default AdminViewCustom;
