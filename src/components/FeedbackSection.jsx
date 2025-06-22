import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Star } from 'lucide-react';

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Load feedbacks from localStorage
    const savedFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    
    // Filter only positive feedbacks (rating 4-5) for homepage display
    const positiveFeedbacks = savedFeedbacks.filter(feedback => feedback.rating >= 4);

    // Always show dummy data for demo purposes, or if insufficient feedback
    const dummyFeedbacks = [
      {
        id: 1,
        name: 'Ahmad Rizki',
        rating: 5,
        message: 'Pelayanan sangat memuaskan! Produk gaming yang dijual berkualitas tinggi dan pengiriman cepat. Sangat recommended untuk para gamers!',
        date: '2024-01-15'
      },
      {
        id: 2,
        name: 'Sari Dewi',
        rating: 5,
        message: 'Website mudah digunakan dan customer service responsif. Setup PC gaming saya jadi lebih mudah berkat bantuan tim iGamerWorld.',
        date: '2024-01-12'
      },
      {
        id: 3,
        name: 'Budi Santoso',
        rating: 4,
        message: 'Harga kompetitif dan produk original. Sudah beberapa kali beli disini dan selalu puas dengan kualitasnya.',
        date: '2024-01-10'
      },
      {
        id: 4,
        name: 'Maya Putri',
        rating: 5,
        message: 'Pengalaman belanja yang luar biasa! Produk sesuai deskripsi dan packaging rapi. Tim support sangat membantu.',
        date: '2024-01-08'
      }
    ];

    // Use dummy data if we have less than 4 positive feedbacks, otherwise use real data
    console.log('Positive feedbacks found:', positiveFeedbacks.length);
    console.log('Using dummy data:', positiveFeedbacks.length < 4);

    if (positiveFeedbacks.length < 4) {
      setFeedbacks(dummyFeedbacks);
      console.log('Set dummy feedbacks:', dummyFeedbacks.length);
    } else {
      setFeedbacks(positiveFeedbacks);
      console.log('Set real feedbacks:', positiveFeedbacks.length);
    }
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        fill={index < rating ? '#ffc107' : 'none'}
        color={index < rating ? '#ffc107' : '#dee2e6'}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  console.log('Current feedbacks state:', feedbacks.length);
  console.log('Feedbacks to render:', feedbacks.slice(0, 4).length);

  if (feedbacks.length === 0) {
    return null;
  }

  return (
    <>
      {/* Minimalist CSS */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .feedback-card {
            animation: fadeInUp 0.6s ease-out;
            animation-fill-mode: both;
          }

          .feedback-card:nth-child(1) { animation-delay: 0.1s; }
          .feedback-card:nth-child(2) { animation-delay: 0.2s; }
          .feedback-card:nth-child(3) { animation-delay: 0.3s; }
          .feedback-card:nth-child(4) { animation-delay: 0.4s; }
        `}
      </style>

      <section style={{
        padding: '60px 0 50px 0',
        position: 'relative'
      }}>

        <Container>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{
              fontWeight: '600',
              color: '#FFD700',
              marginBottom: '12px'
            }}>
              Customer Reviews
            </h2>
            <p style={{
              color: '#6c757d',
              fontSize: '1rem',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
              Testimoni Dari Para Pelanggan iGamerWorld
            </p>
          </div>

          <Row className="justify-content-center">
            {feedbacks.slice(0, 4).map((feedback, index) => (
              <Col lg={6} md={12} xs={12} key={feedback.id || index} className="mb-4">
                <Card
                  className="feedback-card"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '20px',
                    color: '#2c3e50',
                    height: '160px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <Card.Body style={{ padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%', gap: '20px' }}>
                    {/* Left Section - Customer Info & Stars */}
                    <div style={{
                      minWidth: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <h6 style={{
                        color: '#FFFFFF',
                        marginBottom: '8px',
                        fontWeight: '600',
                        fontSize: '16px',
                        textAlign: 'center'
                      }}>
                        {feedback.name}
                      </h6>

                      {/* Rating Stars */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '8px',
                        gap: '3px'
                      }}>
                        {renderStars(feedback.rating)}
                      </div>

                      <p style={{
                        color: '#6c757d',
                        fontSize: '12px',
                        margin: 0,
                        textAlign: 'center'
                      }}>
                        {formatDate(feedback.date)}
                      </p>
                    </div>

                    {/* Right Section - Feedback Message */}
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '20px',
                      borderLeft: '2px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <p style={{
                        fontSize: '14px',
                        lineHeight: '1.4',
                        color: '#495057',
                        margin: 0,
                      }}>
                        "{feedback.message.length > 120
                          ? feedback.message.substring(0, 120) + '...'
                          : feedback.message
                        }"
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default FeedbackSection;
