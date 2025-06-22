import React, { useState } from 'react';
import { Container, Row, Col, Form, Modal } from 'react-bootstrap';
import Button1 from '../../components/Button';

const Pengaduan = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    description: '',
    orderNumber: '',
    priority: 'medium'
  });

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Categories for complaints
  const categories = [
    { value: '', label: 'Pilih Kategori Pengaduan' },
    { value: 'produk', label: 'Masalah Produk' },
    { value: 'pengiriman', label: 'Masalah Pengiriman' },
    { value: 'pembayaran', label: 'Masalah Pembayaran' },
    { value: 'pelayanan', label: 'Masalah Pelayanan' },
    { value: 'website', label: 'Masalah Website/Aplikasi' },
    { value: 'lainnya', label: 'Lainnya' }
  ];

  const priorities = [
    { value: 'low', label: 'Rendah' },
    { value: 'medium', label: 'Sedang' },
    { value: 'high', label: 'Tinggi' },
    { value: 'urgent', label: 'Mendesak' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap harus diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon harus diisi';
    }

    if (!formData.category) {
      newErrors.category = 'Kategori pengaduan harus dipilih';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subjek pengaduan harus diisi';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi pengaduan harus diisi';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Deskripsi minimal 20 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Generate complaint ID
      const complaintId = 'ADU' + Date.now().toString().slice(-8);
      
      // Save to localStorage (in real app, send to backend)
      const complaint = {
        id: complaintId,
        ...formData,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        responses: []
      };

      const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      existingComplaints.push(complaint);
      localStorage.setItem('complaints', JSON.stringify(existingComplaints));

      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: '',
      subject: '',
      description: '',
      orderNumber: '',
      priority: 'medium'
    });
    setErrors({});
  };

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
      <Row className="justify-content-center">
        <Col md={8}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '15px' }}>
              Pengaduan Pelanggan
            </h2>
            <p style={{ color: '#ccc', fontSize: '16px', lineHeight: '1.6' }}>
              Sampaikan keluhan atau masalah yang Anda alami. Tim kami akan merespons dalam 1x24 jam.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#333',
              borderRadius: '10px',
              padding: '40px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              alignItems: 'flex-start',
            }}
          >
            <Form onSubmit={handleSubmit}>
              <Row>
                {/* Nama Lengkap */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#FFD700', fontWeight: '500', textAlign: 'left', display: 'block' }}>
                      Nama Lengkap *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap Anda"
                      style={{
                        backgroundColor: '#444',
                        border: errors.name ? '1px solid #dc3545' : '1px solid #666',
                        borderRadius: '6px',
                        color: '#fff',
                        padding: '12px',
                      }}
                    />
                    {errors.name && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                        {errors.name}
                      </div>
                    )}
                  </Form.Group>
                </Col>

                {/* Email */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#FFD700', fontWeight: '500', textAlign: 'left', display: 'block' }}>
                      Email *
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Masukkan email Anda"
                      style={{
                        backgroundColor: '#444',
                        border: errors.email ? '1px solid #dc3545' : '1px solid #666',
                        borderRadius: '6px',
                        color: '#fff',
                        padding: '12px',
                      }}
                    />
                    {errors.email && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                        {errors.email}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {/* Nomor Telepon */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#FFD700', fontWeight: '500', textAlign: 'left', display: 'block' }}>
                      Nomor Telepon *
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Masukkan nomor telepon"
                      style={{
                        backgroundColor: '#444',
                        border: errors.phone ? '1px solid #dc3545' : '1px solid #666',
                        borderRadius: '6px',
                        color: '#fff',
                        padding: '12px',
                      }}
                    />
                    {errors.phone && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                        {errors.phone}
                      </div>
                    )}
                  </Form.Group>
                </Col>

                {/* Kategori */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#FFD700', fontWeight: '500', textAlign: 'left', display: 'block' }}>
                      Kategori Pengaduan *
                    </Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      style={{
                        backgroundColor: '#444',
                        border: errors.category ? '1px solid #dc3545' : '1px solid #666',
                        borderRadius: '6px',
                        color: '#fff',
                        padding: '12px',
                      }}
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value} style={{ backgroundColor: '#444' }}>
                          {cat.label}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.category && (
                      <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                        {errors.category}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {/* Nomor Pesanan */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#FFD700', fontWeight: '500', textAlign: 'left', display: 'block' }}>
                      Nomor Pesanan (Opsional)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleInputChange}
                      placeholder="Masukkan nomor pesanan jika ada"
                      style={{
                        backgroundColor: '#444',
                        border: '1px solid #666',
                        borderRadius: '6px',
                        color: '#fff',
                        padding: '12px',
                      }}
                    />
                  </Form.Group>
                </Col>

                {/* Prioritas */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#FFD700', fontWeight: '500', textAlign: 'left', display: 'block' }}>
                      Tingkat Prioritas
                    </Form.Label>
                    <Form.Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      style={{
                        backgroundColor: '#444',
                        border: '1px solid #666',
                        borderRadius: '6px',
                        color: '#fff',
                        padding: '12px',
                      }}
                    >
                      {priorities.map((priority) => (
                        <option key={priority.value} value={priority.value} style={{ backgroundColor: '#444' }}>
                          {priority.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Subjek */}
              <Form.Group className="mb-3">
                <Form.Label style={{ color: '#FFD700', fontWeight: '500', textAlign: 'left', display: 'block' }}>
                  Subjek Pengaduan *
                </Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Ringkasan singkat masalah Anda"
                  style={{
                    backgroundColor: '#444',
                    border: errors.subject ? '1px solid #dc3545' : '1px solid #666',
                    borderRadius: '6px',
                    color: '#fff',
                    padding: '12px',
                  }}
                />
                {errors.subject && (
                  <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                    {errors.subject}
                  </div>
                )}
              </Form.Group>

              {/* Deskripsi */}
              <Form.Group className="mb-4">
                <Form.Label style={{ color: '#FFD700', fontWeight: '500', textAlign: 'left', display: 'block' }}>
                  Deskripsi Pengaduan *
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Jelaskan masalah Anda secara detail (minimal 20 karakter)"
                  style={{
                    backgroundColor: '#444',
                    border: errors.description ? '1px solid #dc3545' : '1px solid #666',
                    borderRadius: '6px',
                    color: '#fff',
                    padding: '12px',
                    resize: 'vertical',
                  }}
                />
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginTop: '5px',
                  fontSize: '12px'
                }}>
                  {errors.description && (
                    <div style={{ color: '#dc3545' }}>
                      {errors.description}
                    </div>
                  )}
                  <div style={{ color: '#ccc', marginLeft: 'auto' }}>
                    {formData.description.length}/500
                  </div>
                </div>
              </Form.Group>

              {/* Submit Button */}
              <div style={{ textAlign: 'center' }}>
                <Button1
                  label="Kirim Pengaduan"
                  onClick={handleSubmit}
                  style={{ minWidth: '200px' }}
                />
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        centered
        backdrop="static"
      >
        <Modal.Header style={{ 
          backgroundColor: '#333333', 
          borderBottom: '1px solid #444',
          color: '#fff'
        }}>
          <Modal.Title style={{ color: '#FFD700' }}>
            Pengaduan Berhasil Dikirim!
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{ 
          backgroundColor: '#333333', 
          color: '#fff',
          padding: '25px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '48px', 
              marginBottom: '15px',
              color: '#28a745'
            }}>
              ✅
            </div>
            
            <h5 style={{ 
              color: '#FFD700', 
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>
              Pengaduan Anda Telah Diterima
            </h5>
            
            <p style={{ 
              color: '#ccc', 
              fontSize: '14px',
              lineHeight: '1.5',
              marginBottom: '15px'
            }}>
              Tim customer service kami akan merespons pengaduan Anda dalam waktu 1x24 jam melalui email yang telah Anda berikan.
            </p>

            <div style={{
              backgroundColor: '#444',
              borderRadius: '6px',
              padding: '10px',
              marginBottom: '15px'
            }}>
              <p style={{ 
                color: '#FFD700', 
                fontSize: '12px',
                margin: 0,
                fontWeight: 'bold'
              }}>
                ID Pengaduan: ADU{Date.now().toString().slice(-8)}
              </p>
            </div>

            <p style={{ 
              color: '#ccc', 
              fontSize: '12px',
              margin: 0
            }}>
              Simpan ID pengaduan ini untuk referensi Anda.
            </p>
          </div>
        </Modal.Body>
        
        <Modal.Footer style={{ 
          backgroundColor: '#333333', 
          borderTop: '1px solid #444'
        }}>
          <span
            onClick={handleCloseModal}
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
            Tutup
          </span>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Pengaduan;
