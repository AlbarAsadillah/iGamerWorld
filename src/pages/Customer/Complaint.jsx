import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    subject: '',
    priority: 'medium',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi pengiriman data
    setTimeout(() => {
      // Simpan ke localStorage (simulasi database)
      const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      const newComplaint = {
        id: `C${String(complaints.length + 1).padStart(3, '0')}`,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      complaints.push(newComplaint);
      localStorage.setItem('complaints', JSON.stringify(complaints));

      setShowAlert(true);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        orderId: '',
        subject: '',
        priority: 'medium',
        message: ''
      });

      // Hide alert after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <Card className="shadow-lg border-0">
                <Card.Header 
                  className="text-center py-4" 
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    borderRadius: '0.5rem 0.5rem 0 0'
                  }}
                >
                  <h2 className="mb-0" style={{ fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>
                    Form Pengaduan
                  </h2>
                  <p className="mb-0 mt-2" style={{ opacity: 0.9 }}>
                    Sampaikan keluhan atau masalah Anda kepada kami
                  </p>
                </Card.Header>
                
                <Card.Body className="p-5">
                  {showAlert && (
                    <Alert variant="success" className="mb-4">
                      <Alert.Heading>Pengaduan Berhasil Dikirim!</Alert.Heading>
                      <p className="mb-0">
                        Terima kasih atas pengaduan Anda. Tim kami akan segera menindaklanjuti dan menghubungi Anda dalam 1x24 jam.
                      </p>
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: '500', fontFamily: 'Poppins, sans-serif' }}>
                            Nama Lengkap *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Masukkan nama lengkap Anda"
                            style={{ 
                              borderRadius: '8px',
                              border: '2px solid #e9ecef',
                              padding: '12px 16px',
                              fontFamily: 'Poppins, sans-serif'
                            }}
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: '500', fontFamily: 'Poppins, sans-serif' }}>
                            Email *
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="contoh@email.com"
                            style={{ 
                              borderRadius: '8px',
                              border: '2px solid #e9ecef',
                              padding: '12px 16px',
                              fontFamily: 'Poppins, sans-serif'
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: '500', fontFamily: 'Poppins, sans-serif' }}>
                            Order ID (Opsional)
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="orderId"
                            value={formData.orderId}
                            onChange={handleInputChange}
                            placeholder="Contoh: ORD001"
                            style={{ 
                              borderRadius: '8px',
                              border: '2px solid #e9ecef',
                              padding: '12px 16px',
                              fontFamily: 'Poppins, sans-serif'
                            }}
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: '500', fontFamily: 'Poppins, sans-serif' }}>
                            Prioritas *
                          </Form.Label>
                          <Form.Select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            required
                            style={{ 
                              borderRadius: '8px',
                              border: '2px solid #e9ecef',
                              padding: '12px 16px',
                              fontFamily: 'Poppins, sans-serif'
                            }}
                          >
                            <option value="low">Rendah</option>
                            <option value="medium">Sedang</option>
                            <option value="high">Tinggi</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: '500', fontFamily: 'Poppins, sans-serif' }}>
                        Subject Pengaduan *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Contoh: Produk Rusak, Pengiriman Terlambat, dll"
                        style={{ 
                          borderRadius: '8px',
                          border: '2px solid #e9ecef',
                          padding: '12px 16px',
                          fontFamily: 'Poppins, sans-serif'
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label style={{ fontWeight: '500', fontFamily: 'Poppins, sans-serif' }}>
                        Detail Pengaduan *
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Jelaskan detail masalah atau keluhan Anda..."
                        style={{ 
                          borderRadius: '8px',
                          border: '2px solid #e9ecef',
                          padding: '12px 16px',
                          fontFamily: 'Poppins, sans-serif',
                          resize: 'vertical'
                        }}
                      />
                    </Form.Group>

                    <div className="text-center">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                          borderRadius: '25px',
                          padding: '12px 40px',
                          fontSize: '16px',
                          fontWeight: '600',
                          fontFamily: 'Poppins, sans-serif',
                          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                        className="px-5 py-3"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Mengirim...
                          </>
                        ) : (
                          'Kirim Pengaduan'
                        )}
                      </Button>
                    </div>
                  </Form>

                  <div className="mt-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <h6 style={{ fontWeight: '600', fontFamily: 'Poppins, sans-serif', color: '#495057' }}>
                      Informasi Penting:
                    </h6>
                    <ul style={{ fontSize: '14px', color: '#6c757d', fontFamily: 'Poppins, sans-serif' }}>
                      <li>Pengaduan akan ditindaklanjuti dalam 1x24 jam</li>
                      <li>Pastikan email yang Anda masukkan aktif untuk komunikasi lebih lanjut</li>
                      <li>Sertakan Order ID jika pengaduan terkait dengan pesanan tertentu</li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Complaint;
