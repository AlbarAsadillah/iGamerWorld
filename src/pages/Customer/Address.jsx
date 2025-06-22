import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card, Modal } from 'react-bootstrap';

const Address = () => {
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('addresses');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: 'Albar As’adillah',
            phone: '086732125321',
            address: 'Jl. Amir Mahmud no. 35 Surabaya, Jawa Timur 6049',
            province: 'Jawa Timur',
            city: 'Surabaya',
            postalCode: '6049',
            note: '',
            isDefault: true,
          },
        ];
  });

  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    province: '',
    city: '',
    postalCode: '',
    note: '',
  });

  const [editAddress, setEditAddress] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address) {
      alert('Harap isi semua field yang wajib!');
      return;
    }

    const newId = Date.now();
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
    const updated = addresses.map((addr) =>
      addr.id === id ? { ...addr, isDefault: true } : { ...addr, isDefault: false }
    );
    setAddresses(updated);
    const selected = updated.find((a) => a.id === id);
    localStorage.setItem('selectedAddress', JSON.stringify(selected));
    alert('Alamat utama telah disimpan.');
  };

  const handleDeleteAddress = (id) => {
    let filtered = addresses.filter((addr) => addr.id !== id);
    const deleted = addresses.find((addr) => addr.id === id);
    if (deleted?.isDefault && filtered.length > 0) {
      filtered = filtered.map((addr, i) =>
        i === 0 ? { ...addr, isDefault: true } : { ...addr, isDefault: false }
      );
      localStorage.setItem('selectedAddress', JSON.stringify(filtered[0]));
    }
    setAddresses(filtered);
  };

  const handleEditClick = (addr) => {
    setEditAddress({ ...addr });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === editAddress.id ? { ...editAddress } : addr))
    );
    setShowEditModal(false);
  };

  return (
    <>
      <style>
        {`
          .custom-modal .modal-content {
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }

          .custom-modal .modal-body {
            padding: 0 !important;
          }
        `}
      </style>
      <Container
        className="py-5"
        style={{
          minHeight: '100vh',
          backgroundColor: '#212121',
          color: '#fff',
          borderRadius: '10px',
          marginTop: '20px',
          marginBottom: '20px',
          textAlign: 'left',
          padding: '70px',
        }}
      >
        <h2 className="mb-4 text-start">Alamat</h2>
        <Row>
          <Col xs={12} lg={7} className="mb-4">
            {addresses.length === 0 ? (
              <p>Belum ada alamat tersimpan.</p>
            ) : (
              addresses.map((addr) => (
                <Card key={addr.id} className="mb-3" style={{ backgroundColor: '#0d0d0d', color: '#fff', borderRadius: '10px' }}>
                  <Card.Body>
                    <Card.Title>{addr.name}</Card.Title>
                    <Card.Text>{addr.phone}</Card.Text>
                    <Card.Text>{addr.address}</Card.Text>
                    {addr.province && <Card.Text>Provinsi: {addr.province}</Card.Text>}
                    {addr.city && <Card.Text>Kota: {addr.city}</Card.Text>}
                    {addr.postalCode && <Card.Text>Kode Pos: {addr.postalCode}</Card.Text>}
                    {addr.note && <Card.Text>Catatan: {addr.note}</Card.Text>}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '15px',
                      marginTop: '10px'
                    }}>
                      <span
                        onClick={() => handleEditClick(addr)}
                        style={{
                          color: '#FFD700',
                          fontSize: '14px',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => handleDeleteAddress(addr.id)}
                        style={{
                          color: '#FFD700',
                          fontSize: '14px',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                      >
                        Hapus
                      </span>
                      {addr.isDefault ? (
                        <span
                          style={{
                            color: '#28a745',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                        >
                          Utama
                        </span>
                      ) : (
                        <span
                          onClick={() => handleSetDefault(addr.id)}
                          style={{
                            color: '#FFD700',
                            fontSize: '14px',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                          onMouseLeave={(e) => e.target.style.opacity = '1'}
                        >
                          Gunakan
                        </span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
          </Col>

          <Col xs={12} lg={5}>
            <Card style={{ backgroundColor: '#0d0d0d', color: '#fff', borderRadius: '10px' }}>
              <Card.Body>
                <h5 className="mb-4">Tambah Alamat</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama penerima *</Form.Label>
                    <Form.Control name="name" value={newAddress.name} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nomor HP *</Form.Label>
                    <Form.Control name="phone" value={newAddress.phone} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Alamat lengkap *</Form.Label>
                    <Form.Control as="textarea" name="address" value={newAddress.address} onChange={handleInputChange} />
                  </Form.Group>
                  <Row>
                    <Col xs={12} sm={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Provinsi</Form.Label>
                        <Form.Select name="province" value={newAddress.province} onChange={handleInputChange}>
                          <option value="">Pilih Provinsi</option>
                          <option value="Jawa Timur">Jawa Timur</option>
                          <option value="Jawa Barat">Jawa Barat</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Kota/Kabupaten</Form.Label>
                        <Form.Select name="city" value={newAddress.city} onChange={handleInputChange}>
                          <option value="">Pilih Kota</option>
                          <option value="Surabaya">Surabaya</option>
                          <option value="Bandung">Bandung</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Kode Pos</Form.Label>
                    <Form.Control name="postalCode" value={newAddress.postalCode} onChange={handleInputChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Catatan</Form.Label>
                    <Form.Control name="note" value={newAddress.note} onChange={handleInputChange} />
                  </Form.Group>
                  <Button variant="warning" onClick={handleAddAddress}>Tambahkan</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size="lg"
        contentClassName="custom-modal"
      >
        <Modal.Body style={{
          backgroundColor: '#0d0d0d',
          color: '#fff',
          borderRadius: '10px',
          padding: '0',
          border: 'none'
        }}>
          {editAddress && (
            <Card style={{ backgroundColor: '#0d0d0d', color: '#fff', borderRadius: '10px', border: 'none' }}>
              <Card.Body>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h5 className="mb-0">Edit Alamat</h5>
                  <Button
                    variant="link"
                    onClick={() => setShowEditModal(false)}
                    style={{
                      color: '#fff',
                      fontSize: '24px',
                      textDecoration: 'none',
                      padding: '0',
                      border: 'none',
                      background: 'none'
                    }}
                  >
                    ×
                  </Button>
                </div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama penerima *</Form.Label>
                    <Form.Control name="name" value={editAddress.name} onChange={handleEditFormChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nomor HP *</Form.Label>
                    <Form.Control name="phone" value={editAddress.phone} onChange={handleEditFormChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Alamat lengkap *</Form.Label>
                    <Form.Control as="textarea" name="address" value={editAddress.address} onChange={handleEditFormChange} />
                  </Form.Group>
                  <Row>
                    <Col xs={12} sm={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Provinsi</Form.Label>
                        <Form.Select name="province" value={editAddress.province} onChange={handleEditFormChange}>
                          <option value="">Pilih Provinsi</option>
                          <option value="Jawa Timur">Jawa Timur</option>
                          <option value="Jawa Barat">Jawa Barat</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Kota/Kabupaten</Form.Label>
                        <Form.Select name="city" value={editAddress.city} onChange={handleEditFormChange}>
                          <option value="">Pilih Kota</option>
                          <option value="Surabaya">Surabaya</option>
                          <option value="Bandung">Bandung</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Kode Pos</Form.Label>
                    <Form.Control name="postalCode" value={editAddress.postalCode} onChange={handleEditFormChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Catatan</Form.Label>
                    <Form.Control name="note" value={editAddress.note} onChange={handleEditFormChange} />
                  </Form.Group>
                  <Button variant="warning" onClick={handleSaveEdit}>Simpan Perubahan</Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Address;
