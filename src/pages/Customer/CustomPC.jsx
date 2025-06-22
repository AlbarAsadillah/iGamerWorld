import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CustomPC = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/components/cpu'); // Navigasi ke halaman pilih CPU
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/images/bg-custom.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <div
              onClick={handleStartJourney}
              style={{
                cursor: 'pointer',
                width: '100%',
                maxWidth: '700px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 'clamp(24px, 5vw, 50px)', // Responsive font size
                textAlign: 'center',
                userSelect: 'none',
                transition: 'all 0.3s ease',
                padding: '20px',
                margin: '0 auto',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#FFD700'; // kuning emas
                e.currentTarget.style.transform = 'scale(1.05)'; // Reduced scale for mobile
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Start Your Journey
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomPC;
