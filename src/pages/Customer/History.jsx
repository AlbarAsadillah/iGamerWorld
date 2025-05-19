import React, { useState } from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';

const History = () => {
  // Contoh data riwayat transaksi
  const historyData = {
    diproses: [
      { id: 123, total: 2489000 },
      { id: 245, total: 2489000 },
      { id: 213, total: 2489000 },
      { id: 315, total: 2489000 },
    ],
    siapDikirim: [],
    dalamPengiriman: [],
    selesai: [],
    dibatalkan: [],
  };

  const [activeTab, setActiveTab] = useState('diproses'); // Tab aktif

  return (
    <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
      <h2 className="mb-4 text-start">Riwayat Pesanan</h2>

      {/* Tabs */}
      <Nav variant="tabs" className="mb-4" style={{ borderBottom: '1px solid #FFD700' }}>
        {Object.keys(historyData).map((tab) => (
          <Nav.Item key={tab}>
            <Nav.Link
              onClick={() => setActiveTab(tab)}
              style={{
                color: activeTab === tab ? '#FFD700' : '#fff',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                borderBottom: activeTab === tab ? '2px solid #FFD700' : 'none',
                cursor: 'pointer',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Content */}
      <div
        style={{
          backgroundColor: '#333',
          borderRadius: '10px',
          border: '1px solid #FFD700',
          padding: '20px',
        }}
      >
        {historyData[activeTab].length === 0 ? (
          <p style={{ color: '#fff', textAlign: 'center' }}>Belum ada pesanan pada tab ini.</p>
        ) : (
          <Row>
            {historyData[activeTab].map((order) => (
              <Col xs={12} key={order.id} className="mb-3">
                <Card
                  style={{
                    backgroundColor: '#212121',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '10px',
                  }}
                >
                  <Card.Body>
                    <Card.Text>
                      <strong>Order Id:</strong> {order.id}
                    </Card.Text>
                    <Card.Text>
                      <strong>Total:</strong> Rp {order.total.toLocaleString('id-ID')}
                    </Card.Text>
                  </Card.Body>
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