import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

const Address = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Albar As’adillah',
      phone: '086732125321',
      address: 'Jl. Amir Mahmud no. 35 Surabaya, Jawa Timur 6049',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Mikael Renaldi',
      phone: '086732125321',
      address: 'Jl. Amir Mahmud no. 35 Surabaya, Jawa Timur 6049',
      isDefault: false,
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    province: '',
    city: '',
    postalCode: '',
    note: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address) {
      alert('Harap isi semua field yang wajib!');
      return;
    }

    const newId = addresses.length + 1;
    setAddresses([...addresses, { ...newAddress, id: newId, isDefault: false }]);
    setNewAddress({
      name: '',
      phone: '',
      address: '',
      province: '',
      city: '',
      postalCode: '',
      note: '',
    });
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id ? { ...addr, isDefault: true } : { ...addr, isDefault: false }
      )
    );
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
      <h2 className="mb-4 text-start">Alamat</h2>
      <Row>
        {/* Daftar Alamat */}
        <Col md={7}>
          {addresses.map((addr) => (
            <Card
              key={addr.id}
              className="mb-3"
              style={{
                backgroundColor: '#333',
                color: '#fff',
                borderRadius: '10px',
                border: '1px solid #FFD700',
              }}
            >
              <Card.Body>
                <Card.Title>{addr.name}</Card.Title>
                <Card.Text>{addr.phone}</Card.Text>
                <Card.Text>{addr.address}</Card.Text>
                <div className="d-flex gap-2">
                  <Button variant="warning" size="sm">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteAddress(addr.id)}>
                    Nonaktifkan
                  </Button>
                  {addr.isDefault ? (
                    <Button variant="success" size="sm" disabled>
                      Utama
                    </Button>
                  ) : (
                    <Button variant="warning" size="sm" onClick={() => handleSetDefault(addr.id)}>
                      Gunakan
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Form Tambah Alamat */}
        <Col md={5}>
          <Card
            style={{
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: '10px',
              border: '1px solid #FFD700',
            }}
          >
            <Card.Body>
              <h5 className="mb-4">Tambah Alamat</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nama penerima</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Input Placeholder"
                    name="name"
                    value={newAddress.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nomor HP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Input Placeholder"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alamat lengkap</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Input Placeholder"
                    name="address"
                    value={newAddress.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Provinsi</Form.Label>
                      <Form.Select name="province" value={newAddress.province} onChange={handleInputChange}>
                        <option value="">Dropdown Item</option>
                        <option value="Jawa Timur">Jawa Timur</option>
                        <option value="Jawa Barat">Jawa Barat</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Kota/Kabupaten</Form.Label>
                      <Form.Select name="city" value={newAddress.city} onChange={handleInputChange}>
                        <option value="">Dropdown Item</option>
                        <option value="Surabaya">Surabaya</option>
                        <option value="Bandung">Bandung</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Kode Pos</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Input Placeholder"
                    name="postalCode"
                    value={newAddress.postalCode}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Catatan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Input Placeholder"
                    name="note"
                    value={newAddress.note}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="warning" onClick={handleAddAddress}>
                  Tambahkan
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Address;