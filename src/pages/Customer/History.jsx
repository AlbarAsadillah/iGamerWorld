import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { message } from 'antd';

const History = () => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState('all');

  // Inisialisasi dari localStorage, fallback ke 'menungguPembayaran' kalau belum ada
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('lastActiveTab') || 'menungguPembayaran');

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

  const [isMobile, setIsMobile] = useState(false);

  // Dummy Data (seperti data kamu sebelumnya, atau bisa load dari localStorage)
  useEffect(() => {
    // Simulasi load dari localStorage dan dummy data gabungan
    const saved = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const customPcSaved = JSON.parse(localStorage.getItem('customPcHistory')) || [];

    const grouped = {
      menungguPembayaran: saved.filter(t => t.status === 'menungguPembayaran' || t.status === 'menunggu-pembayaran'),
      menungguVerifikasi: saved.filter(t => t.status === 'menungguVerifikasi' || t.status === 'menunggu-verifikasi'),
      diProses: saved.filter(t => t.status === 'diProses' || t.status === 'diproses' || t.status === 'di-proses'),
      dalamPengiriman: saved.filter(t => t.status === 'dalamPengiriman' || t.status === 'dalam pengiriman'),
      selesai: saved.filter(t => t.status === 'selesai'),
      dibatalkan: saved.filter(t => t.status === 'dibatalkan'),
    };

    const customGrouped = {
      menungguPembayaran: customPcSaved.filter(t => t.status === 'menungguPembayaran' || t.status === 'menunggu-pembayaran'),
      menungguVerifikasi: customPcSaved.filter(t => t.status === 'menungguVerifikasi' || t.status === 'menunggu-verifikasi'),
      diProses: customPcSaved.filter(t => t.status === 'diProses' || t.status === 'diproses' || t.status === 'di-proses'),
      dalamPengiriman: customPcSaved.filter(t => t.status === 'dalamPengiriman' || t.status === 'dalam pengiriman'),
      selesai: customPcSaved.filter(t => t.status === 'selesai'),
      dibatalkan: customPcSaved.filter(t => t.status === 'dibatalkan'),
    };

    setHistoryData(grouped);
    setCustomPcHistory(customGrouped);
  }, []);

  // Simpan tab terakhir ke localStorage setiap ganti tab
  useEffect(() => {
    localStorage.setItem('lastActiveTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 576);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatTabName = (tab) =>
    tab
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());

  const menus = [
    { id: 'all', label: 'All' },
    { id: 'produk', label: 'Produk' },
    { id: 'customPC', label: 'Custom PC' },
  ];

  // Helper untuk merge tanpa duplikat berdasarkan id, prioritas status selesai jika ada
  function mergeWithoutDuplicate(arr1, arr2) {
    const map = new Map();
    arr1.concat(arr2).forEach(item => {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      } else {
        // Jika sudah ada, pilih yang statusnya selesai, atau status terbaru
        const existing = map.get(item.id);
        if (item.status === 'selesai') {
          map.set(item.id, item);
        } else if (existing.status !== 'selesai') {
          // Jika belum selesai dua-duanya, ambil yang updatedAt/completedAt lebih baru jika ada
          const existingTime = new Date(existing.completedAt || existing.updatedAt || existing.createdAt || 0).getTime();
          const itemTime = new Date(item.completedAt || item.updatedAt || item.createdAt || 0).getTime();
          if (itemTime > existingTime) {
            map.set(item.id, item);
          }
        }
      }
    });
    return Array.from(map.values());
  }

  const mergedAllData = {};
  ['menungguPembayaran', 'menungguVerifikasi', 'diProses', 'dalamPengiriman', 'selesai', 'dibatalkan'].forEach((status) => {
    mergedAllData[status] = mergeWithoutDuplicate(historyData[status] || [], customPcHistory[status] || []);
  });

  const currentData =
    activeMenu === 'produk' ? historyData :
    activeMenu === 'customPC' ? customPcHistory :
    mergedAllData;

  // Fungsi untuk format status agar konsisten tampilannya
  const getStatusLabel = (status) => {
    if (status === 'dalamPengiriman' || status === 'dalam pengiriman') return 'Dalam Pengiriman';
    if (status === 'menungguPembayaran' || status === 'menunggu-pembayaran') return 'Menunggu Pembayaran';
    if (status === 'menungguVerifikasi' || status === 'menunggu-verifikasi') return 'Menunggu Verifikasi';
    if (status === 'diproses' || status === 'diProses' || status === 'di-proses') return 'Diproses';
    if (status === 'selesai') return 'Selesai';
    if (status === 'dibatalkan') return 'Dibatalkan';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Fungsi untuk menyelesaikan pesanan
  const handleCompleteOrder = (order) => {
    // Update di kedua storage jika ada
    ['customPcHistory', 'transactionHistory'].forEach((storageKey) => {
      const existing = JSON.parse(localStorage.getItem(storageKey)) || [];
      const updated = existing.map((t) =>
        t.id === order.id ? { ...t, status: 'selesai', completedAt: new Date().toISOString() } : t
      );
      localStorage.setItem(storageKey, JSON.stringify(updated));
    });
    // Refresh data
    regroupHistoryData();
    window.dispatchEvent(new Event('transactionHistoryUpdated'));
    message.success('Pesanan berhasil diselesaikan!');
    setHistoryData((prev) => {
      const grouped = { ...prev };
      Object.keys(grouped).forEach((status) => {
        grouped[status] = grouped[status].map((t) =>
          t.id === order.id ? { ...t, status: 'selesai', completedAt: new Date().toISOString() } : t
        );
      });
      return grouped;
    });
    setCustomPcHistory((prev) => {
      const grouped = { ...prev };
      Object.keys(grouped).forEach((status) => {
        grouped[status] = grouped[status].map((t) =>
          t.id === order.id ? { ...t, status: 'selesai', completedAt: new Date().toISOString() } : t
        );
      });
      return grouped;
    });
  };

  // Fungsi untuk regroup data history setelah update status
  const regroupHistoryData = () => {
    const saved = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const customPcSaved = JSON.parse(localStorage.getItem('customPcHistory')) || [];

    const grouped = {
      menungguPembayaran: saved.filter(t => t.status === 'menungguPembayaran' || t.status === 'menunggu-pembayaran'),
      menungguVerifikasi: saved.filter(t => t.status === 'menungguVerifikasi' || t.status === 'menunggu-verifikasi'),
      diProses: saved.filter(t => t.status === 'diProses' || t.status === 'diproses' || t.status === 'di-proses'),
      dalamPengiriman: saved.filter(t => t.status === 'dalamPengiriman' || t.status === 'dalam pengiriman'),
      selesai: saved.filter(t => t.status === 'selesai'),
      dibatalkan: saved.filter(t => t.status === 'dibatalkan'),
    };

    const customGrouped = {
      menungguPembayaran: customPcSaved.filter(t => t.status === 'menungguPembayaran' || t.status === 'menunggu-pembayaran'),
      menungguVerifikasi: customPcSaved.filter(t => t.status === 'menungguVerifikasi' || t.status === 'menunggu-verifikasi'),
      diProses: customPcSaved.filter(t => t.status === 'diProses' || t.status === 'diproses' || t.status === 'di-proses'),
      dalamPengiriman: customPcSaved.filter(t => t.status === 'dalamPengiriman' || t.status === 'dalam pengiriman'),
      selesai: customPcSaved.filter(t => t.status === 'selesai'),
      dibatalkan: customPcSaved.filter(t => t.status === 'dibatalkan'),
    };

    setHistoryData(grouped);
    setCustomPcHistory(customGrouped);
  };

  return (
    <Container
      className="py-5"
      style={{
        minHeight: '100vh',
        backgroundColor: '#212121',
        color: '#fff',
        borderRadius: isMobile ? '0' : '10px',
        marginTop: isMobile ? '0' : '20px',
        marginBottom: isMobile ? '0' : '20px',
        padding: isMobile ? '16px 4px' : '70px',
        width: isMobile ? '100vw' : undefined,
      }}
    >
      <h2 className="mb-4 text-start" style={{ fontSize: isMobile ? '1.2rem' : '2rem' }}>Riwayat Pesanan</h2>

      {/* Menu Pilih All / Produk / Custom PC */}
      <div
        style={{
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-start',
          gap: 8,
          marginBottom: isMobile ? 16 : 40,
        }}
      >
        {menus.map((menu) => {
          const isActive = activeMenu === menu.id;
          return (
            <button
              key={menu.id}
              onClick={() => setActiveMenu(menu.id)}
              style={{
                padding: isMobile ? '6px 10px' : '8px 20px',
                borderRadius: 50,
                border: isActive ? '2px solid #FFD700' : '2px solid #555',
                backgroundColor: isActive ? '#FFD700' : 'transparent',
                color: isActive ? '#000' : '#fff',
                cursor: 'pointer',
                fontWeight: isActive ? '700' : '500',
                fontSize: isMobile ? '12px' : '14px',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
            >
              {menu.label}
            </button>
          );
        })}
      </div>

      {/* Tabs Status */}
      <Nav
        variant="tabs"
        className="mb-4"
        style={{
          justifyContent: 'center',
          display: 'flex',
          borderBottom: '1px solid #fff',
        }}
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
      >
        {Object.keys(currentData).map((tab) => (
          <Nav.Item key={tab}>
            <Nav.Link
              eventKey={tab}
              style={{
                color: activeTab === tab ? '#000' : '#fff',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                borderBottom: activeTab === tab ? '2px solid' : 'none',
                cursor: 'pointer',
                textTransform: 'capitalize',
                backgroundColor: activeTab === tab ? '#FFD700' : 'transparent',
                borderRadius: '10px 10px 0 0',
                fontSize: isMobile ? '12px' : '14px',
                padding: isMobile ? '6px 8px' : undefined,
              }}
            >
              {formatTabName(tab)}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Isi Konten Tab */}
      <div
        style={{
          backgroundColor: '#121212',
          borderRadius: '10px',
          padding: isMobile ? '10px 4px' : '20px',
          minHeight: '300px',
        }}
      >
        {currentData[activeTab]?.length === 0 ? (
          <p style={{ color: '#fff', textAlign: 'center', fontSize: isMobile ? 13 : 16 }}>
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
                    padding: isMobile ? '10px 8px' : '15px 20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/order-detail`, { state: { order } })}
                >
                  <div
                    style={{
                      marginBottom: '10px',
                      fontSize: isMobile ? '12px' : '14px',
                      color: '#ccc',
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      justifyContent: isMobile ? 'flex-start' : 'flex-start',
                      alignItems: isMobile ? 'flex-start' : 'center',
                      gap: isMobile ? '6px' : '30px',
                    }}
                  >
                    <div>{new Date(order.createdAt).toLocaleDateString('id-ID')}</div>

                    <div
                      style={{
                        padding: isMobile ? '2px 8px' : '4px 12px',
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
                        fontSize: isMobile ? 11 : 14,
                      }}
                    >
                      {getStatusLabel(order.status)}
                    </div>

                    <div style={{ whiteSpace: 'nowrap', fontSize: isMobile ? 11 : 14 }}>Order ID: {order.id}</div>
                  </div>

                  <hr style={{ borderColor: '#555', marginBottom: '10px' }} />

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      justifyContent: 'space-between',
                      alignItems: isMobile ? 'flex-start' : 'center',
                      marginTop: '10px',
                      gap: isMobile ? 8 : 0,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'left',
                        marginBottom: isMobile ? 6 : 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: isMobile ? '28px' : '36px',
                          color: '#FFD700',
                          marginRight: isMobile ? '10px' : '15px',
                        }}
                      >
                        <FiShoppingBag />
                      </div>
                      <div>
                        <div
                          style={{
                            fontWeight: 'bold',
                            fontSize: isMobile ? '13px' : '16px',
                            marginBottom: '4px',
                          }}
                        >
                          {order.type === 'custom-pc' && order.customPcName
                            ? order.customPcName
                            : order.items && order.items.length > 0
                            ? order.items[0].name
                            : 'Produk Tidak Diketahui'}
                        </div>
                        <div style={{ fontSize: isMobile ? '11px' : '14px', color: '#ccc' }}>
                          {order.items && order.items.length > 0
                            ? `${order.items.length} barang`
                            : 'Tidak ada produk'}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontWeight: 'bold', fontSize: isMobile ? '13px' : '16px' }}>
                      Rp {order.total?.toLocaleString('id-ID')}
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '15px',
                      textAlign: 'left',
                      display: 'flex',
                      gap: isMobile ? '8px' : '15px',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      variant="link"
                      style={{ color: '#FFD700', fontWeight: 'medium', padding: 0, fontSize: isMobile ? 12 : 14 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/order-detail', { state: { order } });
                      }}
                    >
                      Lihat Detail Transaksi
                    </Button>

                    {(order.status === 'dalamPengiriman' || order.status === 'dalam pengiriman') && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        style={{
                          borderColor: '#28a745',
                          color: '#28a745',
                          fontWeight: '600',
                          fontSize: isMobile ? '10px' : '12px',
                          padding: isMobile ? '4px 8px' : '6px 12px',
                          borderRadius: '6px',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#28a745';
                          e.target.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#28a745';
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCompleteOrder(order);
                          setActiveTab('selesai');
                        }}
                      >
                        Selesaikan Pesanan
                      </Button>
                    )}
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
