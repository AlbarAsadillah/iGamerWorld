import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const LuputanMedia = () => {
    const mediaCoverage = [
        {
            logo: '/images/media/1.png',
        },
        {
            logo: '/images/media/2.png',
        },
        {
            logo: '/images/media/3.png',
        },
    ];

    return (
        <section
            style={{
                backgroundImage: 'url("/images/bg-2.jpg")', // Ganti dengan path gambar background
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'white',
                padding: '40px',
            }}
        >
            <Container>
                <h2 className="text-center mb-5" style={{ color: 'black' }}>Liputan Media</h2>
                <Row className="g-4 justify-content-center">
                    {mediaCoverage.map((media, index) => (
                        <Col key={index} md={4}>
                            <Card className="border-0 text-center p-0 bg-transparent">
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '450px', // Tinggi card
                                        width: '100%', // Lebar penuh
                                    }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={media.logo}
                                        alt="Media Logo"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain', // Menjaga proporsi gambar
                                        }}
                                    />
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default LuputanMedia;