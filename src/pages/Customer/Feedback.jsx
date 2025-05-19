import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Feedback = () => {
  const [feedback, setFeedback] = useState(''); // State untuk teks feedback
  const [rating, setRating] = useState(0); // State untuk rating
  const [showModal, setShowModal] = useState(false); // State untuk modal

  const handleRating = (value) => {
    setRating(value); // Set nilai rating berdasarkan klik
  };

  const handleSubmit = () => {
    if (!feedback || rating === 0) {
      alert('Harap isi feedback dan pilih rating!');
      return;
    }
    setShowModal(true); // Tampilkan modal
    setFeedback('');
    setRating(0);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Tutup modal
  };

  return (
    <>
      <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
        <h2 className="mb-4 text-start">Feedback</h2>
        <Row>
          <Col xs={12}>
            {/* Input Feedback */}
            <Form.Group className="mb-4">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Type your feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xs={12} className="d-flex justify-content-center">
            {/* Rating Bintang */}
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                onClick={() => handleRating(value)}
                style={{ cursor: 'pointer', fontSize: '24px', color: '#FFD700', margin: '0 5px' }}
              >
                <FontAwesomeIcon icon={faStar} style={{ opacity: value <= rating ? 1 : 0.4 }} />
              </span>
            ))}
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="d-flex justify-content-end">
            {/* Tombol Simpan */}
            <Button variant="warning" onClick={handleSubmit}>
              Simpan
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered animation>
        <Modal.Body
          style={{
            backgroundColor: '#212121',
            color: '#fff',
            textAlign: 'center',
            borderRadius: '10px',
          }}
        >
          <h3 style={{ marginBottom: '20px' }}>Terimakasih Atas Saran Nya</h3>
          <Button variant="warning" onClick={handleCloseModal}>
            Tutup
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Feedback;