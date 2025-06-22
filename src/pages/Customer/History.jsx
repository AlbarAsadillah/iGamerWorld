import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { FiShoppingBag } from 'react-icons/fi';

const customPcDataDummy = {
  menungguPembayaran: [
    {
      id: 'CP001',
      createdAt: '2025-05-01T10:30:00',
      status: 'menunggu-pembayaran',
      type: 'custom-pc',
      customPcName: 'Custom PC RTX 3060 + AMD Ryzen 5 5600X',
      items: [
        { id: 'gpu1', name: 'RTX 3060', price: 6000000, quantity: 1 },
        { id: 'cpu1', name: 'AMD Ryzen 5 5600X', price: 3500000, quantity: 1 },
        { id: 'ram1', name: 'Corsair 16GB DDR4', price: 1500000, quantity: 1 },
        { id: 'mobo1', name: 'MSI B450 Tomahawk', price: 1000000, quantity: 1 }
      ],
      total: 12000000,
      subtotal: 12000000,
      shippingCost: 0,
    },
    {
      id: 'CP002',
      createdAt: '2025-05-03T12:00:00',
      status: 'menunggu-pembayaran',
      type: 'custom-pc',
      customPcName: 'Custom PC RTX 3070 + Intel Core i7-12700K',
      items: [
        { id: 'gpu2', name: 'RTX 3070', price: 8500000, quantity: 1 },
        { id: 'cpu2', name: 'Intel Core i7-12700K', price: 4500000, quantity: 1 },
        { id: 'ram2', name: 'G.Skill 32GB DDR4', price: 2000000, quantity: 1 }
      ],
      total: 15000000,
      subtotal: 15000000,
      shippingCost: 0,
    },
  ],
  menungguVerifikasi: [
    {
      id: 'CP005',
      createdAt: '2025-06-05T14:30:00',
      status: 'menunggu-verifikasi',
      type: 'custom-pc',
      customPcName: 'Custom PC RTX 4070 + Intel Core i5-13600K',
      items: [
        { id: 'gpu5', name: 'RTX 4070', price: 10000000, quantity: 1 },
        { id: 'cpu5', name: 'Intel Core i5-13600K', price: 4000000, quantity: 1 },
        { id: 'ram5', name: 'Kingston Fury 32GB DDR4', price: 2200000, quantity: 1 }
      ],
      total: 16200000,
      subtotal: 16200000,
      shippingCost: 0,
      uploadedAt: '2025-06-05T15:00:00',
    },
  ],
  diProses: [
    {
      id: 'CP003',
      createdAt: '2025-04-28T14:00:00',
      status: 'di-proses',
      type: 'custom-pc',
      customPcName: 'Custom PC RTX 3080 + AMD Ryzen 7 5800X',
      items: [
        { id: 'gpu3', name: 'RTX 3080', price: 12000000, quantity: 1 },
        { id: 'cpu3', name: 'AMD Ryzen 7 5800X', price: 5000000, quantity: 1 },
        { id: 'ram3', name: 'Corsair 32GB DDR4', price: 2500000, quantity: 1 },
        { id: 'mobo3', name: 'ASUS ROG Strix X570', price: 2500000, quantity: 1 }
      ],
      total: 22000000,
      subtotal: 22000000,
      shippingCost: 0,
    },
  ],
  dalamPengiriman: [
    {
      id: 'CP005',
      createdAt: '2025-06-10T16:00:00',
      status: 'dalamPengiriman',
      type: 'custom-pc',
      customPcName: 'Custom PC RTX 4070 + Intel Core i5-13600K',
      items: [
        { id: 'gpu5', name: 'RTX 4070', price: 8000000, quantity: 1 },
        { id: 'cpu5', name: 'Intel Core i5-13600K', price: 4000000, quantity: 1 },
        { id: 'ram5', name: 'Corsair 16GB DDR5', price: 2000000, quantity: 1 },
        { id: 'mobo5', name: 'ASUS Prime Z790', price: 2000000, quantity: 1 }
      ],
      total: 16000000,
      subtotal: 16000000,
      shippingCost: 0,
      resi: 'JNE987654321',
    },
  ],
  selesai: [
    {
      id: 'CP004',
      createdAt: '2025-04-20T09:15:00',
      status: 'selesai',
      type: 'custom-pc',
      customPcName: 'Custom PC RTX 3090 + Intel Core i9-12900K',
      items: [
        { id: 'gpu4', name: 'RTX 3090', price: 20000000, quantity: 1 },
        { id: 'cpu4', name: 'Intel Core i9-12900K', price: 7000000, quantity: 1 },
        { id: 'ram4', name: 'G.Skill 64GB DDR4', price: 3000000, quantity: 1 }
      ],
      total: 30000000,
      subtotal: 30000000,
      shippingCost: 0,
    },
  ],
  dibatalkan: [],
};

const History = () => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState('all');
  const [activeTab, setActiveTab] = useState('menungguPembayaran');
  const [historyData, setHistoryData] = useState({
    menungguPembayaran: [],
    menungguVerifikasi: [],
    diProses: [],
    dalamPengiriman: [],
    selesai: [],
    dibatalkan: [],
  });
  const [customPcHistory, setCustomPcHistory] = useState({
    menungguPembayaran: [],
    menungguVerifikasi: [],
    diProses: [],
    dalamPengiriman: [],
    selesai: [],
    dibatalkan: [],
  });

  const loadHistory = () => {
    const saved = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const customPcSaved = JSON.parse(localStorage.getItem('customPcHistory')) || [];

    // Data dummy untuk produk reguler
    const productDataDummy = {
      menungguPembayaran: [
        {
          id: 'PR001',
          createdAt: '2025-06-04T10:00:00',
          status: 'menunggu-pembayaran',
          type: 'product',
          items: [
            { id: 'prod1', name: 'Gaming Mouse Logitech G502', price: 800000, quantity: 1 },
            { id: 'prod2', name: 'Mechanical Keyboard Corsair K70', price: 1500000, quantity: 1 }
          ],
          total: 2350000,
          subtotal: 2300000,
          shippingCost: 50000,
        },
      ],
      menungguVerifikasi: [
        {
          id: 'PR002',
          createdAt: '2025-06-03T14:30:00',
          status: 'menunggu-verifikasi',
          type: 'product',
          items: [
            { id: 'prod3', name: 'Gaming Headset SteelSeries', price: 1200000, quantity: 1 },
            { id: 'prod4', name: 'Webcam Logitech C920', price: 1800000, quantity: 1 }
          ],
          total: 3050000,
          subtotal: 3000000,
          shippingCost: 50000,
          uploadedAt: '2025-06-03T15:00:00',
        },
      ],
      diProses: [],
      dalamPengiriman: [
        {
          id: 'PR003',
          createdAt: '2025-06-10T14:30:00',
          status: 'dalamPengiriman',
          type: 'product',
          items: [
            { id: 'prod5', name: 'Gaming Headset SteelSeries', price: 1200000, quantity: 1 },
            { id: 'prod6', name: 'Webcam Logitech C920', price: 800000, quantity: 1 }
          ],
          total: 2050000,
          subtotal: 2000000,
          shippingCost: 50000,
          resi: 'JNE456789123',
        },
      ],
      selesai: [],
      dibatalkan: [],
    };

    // Group regular products (gabung data real + dummy)
    const grouped = {
      menungguPembayaran: [...saved.filter((t) => (t.status === 'menunggu-pembayaran' || t.status === 'menungguPembayaran') && t.type !== 'custom-pc'), ...productDataDummy.menungguPembayaran],
      menungguVerifikasi: [...saved.filter((t) => (t.status === 'menunggu-verifikasi' || t.status === 'menungguVerifikasi') && t.type !== 'custom-pc'), ...productDataDummy.menungguVerifikasi],
      diProses: [...saved.filter((t) => (t.status === 'di-proses' || t.status === 'diproses') && t.type !== 'custom-pc'), ...productDataDummy.diProses],
      dalamPengiriman: [...saved.filter((t) => (t.status === 'dalamPengiriman' || t.status === 'dalam pengiriman') && t.type !== 'custom-pc'), ...productDataDummy.dalamPengiriman],
      selesai: [...saved.filter((t) => t.status === 'selesai' && t.type !== 'custom-pc'), ...productDataDummy.selesai],
      dibatalkan: [...saved.filter((t) => t.status === 'dibatalkan' && t.type !== 'custom-pc'), ...productDataDummy.dibatalkan],
    };

    // Group custom PC orders
    const customPcGrouped = {
      menungguPembayaran: [...customPcSaved.filter((t) => (t.status === 'menunggu-pembayaran' || t.status === 'menungguPembayaran')), ...customPcDataDummy.menungguPembayaran],
      menungguVerifikasi: [...customPcSaved.filter((t) => (t.status === 'menunggu-verifikasi' || t.status === 'menungguVerifikasi')), ...customPcDataDummy.menungguVerifikasi],
      diProses: [...customPcSaved.filter((t) => (t.status === 'di-proses' || t.status === 'diproses')), ...customPcDataDummy.diProses],
      dalamPengiriman: [...customPcSaved.filter((t) => (t.status === 'dalamPengiriman' || t.status === 'dalam pengiriman')), ...customPcDataDummy.dalamPengiriman],
      selesai: [...customPcSaved.filter((t) => t.status === 'selesai'), ...customPcDataDummy.selesai],
      dibatalkan: [...customPcSaved.filter((t) => t.status === 'dibatalkan'), ...customPcDataDummy.dibatalkan],
    };

    setHistoryData(grouped);
    setCustomPcHistory(customPcGrouped);



    const queryTab = new URLSearchParams(window.location.search).get('tab');
    if (queryTab) {
      setActiveTab(queryTab);
    } else {
      // Prioritaskan menungguVerifikasi, lalu menungguPembayaran
      const verifikasiData = [...(customPcGrouped.menungguVerifikasi || []), ...(grouped.menungguVerifikasi || [])];
      const pembayaranData = [...(customPcGrouped.menungguPembayaran || []), ...(grouped.menungguPembayaran || [])];

      if (verifikasiData.length > 0) {
        setActiveTab('menungguVerifikasi');
      } else if (pembayaranData.length > 0) {
        setActiveTab('menungguPembayaran');
      } else {
        const statusOrder = ['menungguPembayaran', 'menungguVerifikasi', 'diProses', 'dalamPengiriman', 'selesai', 'dibatalkan'];
        for (const status of statusOrder) {
          const totalData = [...(customPcGrouped[status] || []), ...(grouped[status] || [])];
          if (totalData.length > 0) {
            setActiveTab(status);
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    loadHistory();
    window.addEventListener('transactionHistoryUpdated', loadHistory);
    return () => window.removeEventListener('transactionHistoryUpdated', loadHistory);
  }, []);

  const formatTabName = (tab) =>
    tab.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

  // Function to complete order
  const handleCompleteOrder = (order, e) => {
    e.stopPropagation(); // Prevent card click

    try {
      // Update transactionHistory for both regular and custom PC orders
      const saved = JSON.parse(localStorage.getItem('transactionHistory')) || [];
      const updatedSaved = saved.map(item => {
        if (item.id === order.id) {
          return { ...item, status: 'selesai' };
        }
        return item;
      });
      localStorage.setItem('transactionHistory', JSON.stringify(updatedSaved));

      // Update custom PC orders in customPcHistory
      const customPcSaved = JSON.parse(localStorage.getItem('customPcHistory')) || [];
      const updatedCustomPcSaved = customPcSaved.map(item => {
        if (item.id === order.id) {
          return { ...item, status: 'selesai' };
        }
        return item;
      });
      localStorage.setItem('customPcHistory', JSON.stringify(updatedCustomPcSaved));

      // Reload history data
      loadHistory();

      // Show success message
      message.success('Pesanan berhasil diselesaikan!');

      // Dispatch event to update other components
      window.dispatchEvent(new Event('transactionHistoryUpdated'));
    } catch (error) {
      console.error('Error completing order:', error);
      message.error('Gagal menyelesaikan pesanan. Silakan coba lagi.');
    }
  };

  const mergedAllData = {};
  ['menungguPembayaran', 'menungguVerifikasi', 'diProses', 'dalamPengiriman', 'selesai', 'dibatalkan'].forEach((status) => {
    mergedAllData[status] = [
      ...(historyData[status] || []),
      ...(customPcHistory[status] || []),
    ];
  });

  const currentData =
    activeMenu === 'produk' ? historyData : activeMenu === 'customPC' ? customPcHistory : mergedAllData;

  const menus = [
    { id: 'all', label: 'All' },
    { id: 'produk', label: 'Produk' },
    { id: 'customPC', label: 'Custom PC' },
  ];

  return (
    <Container
      className="py-5"
      style={{
        minHeight: '100vh',
        backgroundColor: '#212121',
        color: '#fff',
        borderRadius: '10px',
        marginTop: '20px',
        marginBottom: '20px',
        padding: '70px',
      }}
    >
      <h2 className="mb-4 text-start">Riwayat Pesanan</h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 12,
          marginBottom: 40,
        }}
      >
        {menus.map((menu) => {
          const isActive = activeMenu === menu.id;
          return (
            <button
              key={menu.id}
              onClick={() => setActiveMenu(menu.id)}
              style={{
                padding: '8px 20px',
                borderRadius: 50,
                border: isActive ? '2px solid #FFD700' : '2px solid #555',
                backgroundColor: isActive ? '#FFD700' : 'transparent',
                color: isActive ? '#000' : '#fff',
                cursor: 'pointer',
                fontWeight: isActive ? '700' : '500',
                fontSize: '14px',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
            >
              {menu.label}
            </button>
          );
        })}
      </div>

      <Nav
        variant="tabs"
        className="mb-4"
        style={{
          justifyContent: 'center',
          display: 'flex',
          borderBottom: '1px solid #fff',
        }}
      >
        {Object.keys(currentData).map((tab) => (
          <Nav.Item key={tab}>
            <Nav.Link
              onClick={() => setActiveTab(tab)}
              active={activeTab === tab}
              style={{
                color: activeTab === tab ? '#000' : '#fff',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                borderBottom: activeTab === tab ? '2px solid' : 'none',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {formatTabName(tab)}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <div
        style={{
          backgroundColor: '#121212',
          borderRadius: '10px',
          padding: '20px',
        }}
      >
        {currentData[activeTab].length === 0 ? (
          <p style={{ color: '#fff', textAlign: 'center' }}>
            Belum ada pesanan pada tab ini.
          </p>
        ) : (
          <Row>
            {currentData[activeTab].map((order) => (
              <Col xs={12} key={order.id} className="mb-3">
                <Card
                  style={{
                    borderRadius: '10px',
                    backgroundColor: '#212121',
                    color: '#fff',
                    padding: '15px 20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/order-detail`, { state: { order } })}
                >
                  <div
                    style={{
                      marginBottom: '10px',
                      fontSize: '14px',
                      color: '#ccc',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: '30px',
                    }}
                  >
                    <div>{new Date(order.createdAt).toLocaleDateString('id-ID')}</div>

                    <div
                      style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        backgroundColor:
                          order.status === 'selesai'
                            ? '#4CAF50'
                            : order.status === 'dibatalkan'
                            ? '#f44336'
                            : '#FFD700',
                        color: '#212121',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {order.status === 'dalamPengiriman' || order.status === 'dalam pengiriman'
                        ? 'Dalam Pengiriman'
                        : order.status === 'menungguPembayaran' || order.status === 'menunggu-pembayaran'
                        ? 'Menunggu Pembayaran'
                        : order.status === 'menungguVerifikasi' || order.status === 'menunggu-verifikasi'
                        ? 'Menunggu Verifikasi'
                        : order.status === 'diproses' || order.status === 'di-proses'
                        ? 'Diproses'
                        : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>

                    <div style={{ whiteSpace: 'nowrap' }}>Order ID: {order.id}</div>
                  </div>

                  <hr style={{ borderColor: '#555', marginBottom: '10px' }} />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'left',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '36px',
                          color: '#FFD700',
                          marginRight: '15px',
                        }}
                      >
                        <FiShoppingBag />
                      </div>
                      <div>
                        <div
                          style={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                            marginBottom: '4px',
                          }}
                        >
                          {order.type === 'custom-pc' && order.customPcName
                            ? order.customPcName
                            : order.items && order.items.length > 0
                            ? order.items[0].name
                            : 'Produk Tidak Diketahui'}
                        </div>
                        <div style={{ fontSize: '14px', color: '#ccc' }}>
                          {order.items && order.items.length > 0 ? (
                            <>
                              {order.items.length} barang
                            </>
                          ) : (
                            'Tidak ada produk'
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                      {/* Rp {order.total.toLocaleString('id-ID')} */}
                    </div>
                  </div>

                  <div style={{ marginTop: '15px', textAlign: 'left', display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <Button
                      variant="link"
                      style={{ color: '#FFD700', fontWeight: 'medium', padding: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/order-detail', { state: { order } });
                      }}
                    >
                      Lihat Detail Transaksi
                    </Button>

                    {/* Show "Selesaikan Pesanan" button only for "dalamPengiriman" status */}
                    {(order.status === 'dalamPengiriman' || order.status === 'dalam pengiriman') && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        style={{
                          borderColor: '#28a745',
                          color: '#28a745',
                          fontWeight: '600',
                          fontSize: '12px',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#28a745';
                          e.target.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#28a745';
                        }}
                        onClick={(e) => handleCompleteOrder(order, e)}
                      >
                        Selesaikan Pesanan
                      </Button>
                    )}

                    {/* Show "Review Produk" button only for "selesai" status */}
                    {/* {order.status === 'selesai' && (
                      // <Button
                      //   variant="outline-warning"
                      //   size="sm"
                      //   style={{
                      //     borderColor: '#FFD700',
                      //     color: '#FFD700',
                      //     fontWeight: '600',
                      //     fontSize: '12px',
                      //     padding: '6px 12px',
                      //     borderRadius: '6px',
                      //     transition: 'all 0.3s ease'
                      //   }}
                      //   onMouseEnter={(e) => {
                      //     e.target.style.backgroundColor = '#FFD700';
                      //     e.target.style.color = '#212121';
                      //   }}
                      //   onMouseLeave={(e) => {
                      //     e.target.style.backgroundColor = 'transparent';
                      //     e.target.style.color = '#FFD700';
                      //   }}
                      //   onClick={(e) => {
                      //     e.stopPropagation();
                      //     navigate('/review-product', { state: { order } });
                      //   }}
                      // >
                      //   ★ Review Produk
                      // </Button>
                    )} */}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
};

export default History;