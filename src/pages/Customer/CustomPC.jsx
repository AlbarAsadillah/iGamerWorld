import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CustomPC = () => {
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [isAssembled, setIsAssembled] = useState(false);
  const [pickupMethod, setPickupMethod] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleAddComponent = () => {
    // Arahkan ke halaman lain (contoh: /components)
    navigate('/components');
  };

  const handleToggleAssembled = () => {
    setIsAssembled(!isAssembled);
    setTotalPrice(isAssembled ? totalPrice - 100000 : totalPrice + 100000); // Biaya tambahan Rp 100.000
  };

  const handlePickupMethodChange = (method) => {
    setPickupMethod(method);
  };

  const handleSubmit = () => {
    alert('Form Custom PC berhasil dikirim!');
  };

  return (
    <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
      <h2 className="mb-4 text-start">Custom PC</h2>
      <Row className="mb-3">
        <Col xs={12} md={8}>
          <Form.Control
            type="text"
            placeholder="Komponen"
            readOnly
            value={selectedComponents.join(', ') || 'Belum ada komponen dipilih'}
            style={{ backgroundColor: '#333', color: '#fff', border: '1px solid #444' }}
          />
        </Col>
        <Col xs={12} md={4}>
          <Button variant="warning" onClick={handleAddComponent} style={{ width: '100%' }}>
            Pilih Komponen
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12}>
          <Form.Check
            type="checkbox"
            label="Dirakit oleh toko (Biaya tambahan)"
            checked={isAssembled}
            onChange={handleToggleAssembled}
            style={{ color: '#fff' }}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label style={{ color: '#fff' }}>Metode pengambilan</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ width: '100%' }}>
                {pickupMethod || 'Pilih Metode'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handlePickupMethodChange('Ambil di Toko')}>Ambil di Toko</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePickupMethodChange('Dikirim ke Rumah')}>Dikirim ke Rumah</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <p style={{ color: '#fff', marginTop: '32px' }}>
            <strong>Total Harga:</strong> Rp {totalPrice.toLocaleString('id-ID')}
          </p>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Button variant="warning" onClick={handleSubmit} style={{ width: '100%' }}>
            Kirim Form Perakitan
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomPC;