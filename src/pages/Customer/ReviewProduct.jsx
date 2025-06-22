import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft } from 'lucide-react';
import { message } from 'antd';
import Button1 from '../../components/Button';  // Komponen Tombol yang sudah Anda buat
import Button2 from '../../components/Button2';  // Komponen Button2 yang baru dibuat


const ReviewProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Redirect jika tidak ada data order
    if (!order) {
      message.error('Data pesanan tidak ditemukan');
      navigate('/history');
    }
  }, [order, navigate]);

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleStarHover = (starValue) => {
    setHoverRating(starValue);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || rating);
      stars.push(
        <Star
          key={i}
          size={32}
          fill={isFilled ? '#FFD700' : 'transparent'}
          stroke={isFilled ? '#FFD700' : '#666'}
          style={{ cursor: 'pointer', margin: '0 4px' }}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
        />
      );
    }
    return stars;
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Sangat Buruk';
      case 2: return 'Buruk';
      case 3: return 'Cukup';
      case 4: return 'Baik';
      case 5: return 'Sangat Baik';
      default: return 'Pilih Rating';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      message.error('Silakan berikan rating untuk produk ini');
      return;
    }

    if (comment.trim().length < 10) {
      message.error('Komentar minimal 10 karakter');
      return;
    }

    setIsSubmitting(true);

    try {
      // Buat data review
      const reviewData = {
        id: `REV${Date.now()}`,
        orderId: order.id,
        rating: rating,
        comment: comment.trim(),
        customerName: order.customerName || 'Customer',
        date: new Date().toISOString(),
        createdAt: new Date().toLocaleDateString('id-ID')
      };

      // Simpan ke localStorage
      const existingReviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
      const updatedReviews = [reviewData, ...existingReviews];
      localStorage.setItem('productReviews', JSON.stringify(updatedReviews));

      message.success('Review berhasil dikirim! Terima kasih atas feedback Anda.');
      
      // Kembali ke halaman history setelah 1.5 detik
      setTimeout(() => {
        navigate('/history');
      }, 1500);

    } catch (error) {
      console.error('Error submitting review:', error);
      message.error('Gagal mengirim review. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!order) {
    return null;
  }

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', paddingTop: '35px', paddingBottom: '35px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            {/* Header */}
            <div className="d-flex align-items-center mb-4">
              <Button
                variant="link"
                onClick={() => navigate('/history')}
                style={{ 
                  color: '#FFD700', 
                  textDecoration: 'none', 
                  padding: '0',
                  marginRight: '15px'
                }}
              >
                <ArrowLeft size={24} />
              </Button>
              <h5 style={{ color: '#FFD700', margin: 0, fontWeight: '600' }}>
                Kembali
              </h5>
            </div>

            {/* Order Info Card */}
            <Card style={{ backgroundColor: '#333', border: 'none', marginBottom: '30px' }}>
              <Card.Body style={{ padding: '20px' }}>
                <h5 style={{ color: '#ccc', marginBottom: '8px' }}>
                  <strong>Order ID:</strong> {order.id}
                </h5>
                {/* Tambahkan info lain jika perlu */}
              </Card.Body>
            </Card>

            {/* Review Form */}
            <Card style={{ backgroundColor: '#333', border: 'none', textAlign: 'left' }}>
              <Card.Body style={{ padding: '30px' }}>
                <Form onSubmit={handleSubmit}>
                  {/* Rating Section */}
                  <div className="text-left mb-4">
                    <h5 style={{ color: '#fff', marginBottom: '20px' }}>
                      Berikan Rating Anda
                    </h5>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                      {renderStars()}
                    </div>
                    <p style={{ color: rating > 0 ? '#FFD700' : '#666', fontSize: '18px', fontWeight: '600', margin: 0, textAlign: 'center' }}>
                      {getRatingText(rating)}
                    </p>
                  </div>

                  {/* Comment Section */}
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#fff', fontWeight: '600', marginBottom: '15px' }}>
                      Tulis Review Anda
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Bagikan pengalaman Anda dengan produk ini... (minimal 10 karakter)"
                      style={{ backgroundColor: '#ffffff', border: '1px solid #555', color: 'black', borderRadius: '8px', padding: '15px', fontSize: '14px', resize: 'vertical' }}
                      maxLength={500}
                    />
                    <div style={{ color: '#666', fontSize: '12px', textAlign: 'right', marginTop: '5px' }}>
                      {comment.length}/500 karakter
                    </div>
                  </Form.Group>

                  {/* Submit Button */}
                  <div className="text-center">
                    <Button1
                    label= {isSubmitting ? 'Mengirim Review...' : 'Kirim Review'}
                      type="submit"
                      disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
                      style={{ backgroundColor: '#FFD700', border: 'none', color: '#212121', fontWeight: '600', padding: '12px 40px', borderRadius: '8px', fontSize: '16px', minWidth: '200px' }}
                    >
                      
                    </Button1>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReviewProduct;
