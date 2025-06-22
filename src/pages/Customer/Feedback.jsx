import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Feedback = () => {
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);
  }, []);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (!feedback.trim() || rating === 0) {
      alert('Harap isi feedback dan pilih rating!');
      return;
    }
    setShowModal(true);
    setFeedback('');
    setRating(0);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container
        className="py-5"
        style={{
          minHeight: '100vh',
          backgroundColor: '#212121',
          color: '#fff',
          borderRadius: '10px',
          marginTop: 20,
          marginBottom: 20,
          padding: 70,
        }}
      >
        <h2 className="mb-4 text-start">Feedback</h2>
        <Row>
          {/* Username di kiri */}
          <Col xs={12} md={4} style={{ borderRight: '1px solid #444', paddingRight: 30 }}>
            {/* <h5 style={{ marginBottom: 20 }}>Username</h5> */}
            <div
              style={{
                backgroundColor: '#333',
                padding: 20,
                borderRadius: 10,
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              {username || 'Guest'}
            </div>
          </Col>

          {/* Form feedback di kanan */}
          <Col xs={12} md={8} style={{ paddingLeft: 30 }}>
            <Form.Group className="mb-4">
              <Form.Label style={{ textAlign: 'left', display: 'block' }}>
                FEEDBACK
              </Form.Label>

              {/* Bintang rating rata kiri */}
              <div className="mb-3 d-flex justify-content-start">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    onClick={() => handleRating(value)}
                    style={{ cursor: 'pointer', fontSize: 28, color: '#FFD700', margin: '0 8px' }}
                  >
                    <FontAwesomeIcon icon={faStar} style={{ opacity: value <= rating ? 1 : 0.4 }} />
                  </span>
                ))}
              </div>

              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Tulis feedback Anda di sini"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={{ backgroundColor: '#fff', color: '#000', borderRadius: 10 }}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="warning" onClick={handleSubmit}>
                Simpan
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal konfirmasi */}
      <Modal show={showModal} onHide={handleCloseModal} centered animation>
        <Modal.Body
          style={{
            backgroundColor: '#212121',
            color: '#fff',
            textAlign: 'center',
            borderRadius: 10,
          }}
        >
          <h3 style={{ marginBottom: 20 }}>Terimakasih Atas Saran Nya</h3>
          <Button variant="warning" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Feedback;
