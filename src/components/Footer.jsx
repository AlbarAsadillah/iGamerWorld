import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    // Tambahkan deteksi mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <footer
            style={{
                backgroundColor: '#FFD700',
                padding: isMobile ? '18px 0' : '40px 0',
                color: '#000',
                fontSize: isMobile ? '11px' : '14px',
            }}
        >
            <Container>
                <Row className="mb-4">
                    {/* Tentang Kami */}
                    <Col md={2} xs={12} style={{ marginBottom: isMobile ? 12 : 0 }}>
                        <h5 style={{ fontWeight: 'semibold', textAlign: 'left', fontSize: isMobile ? '13px' : '16px' }}>Tentang Kami</h5>
                        <p style={{textAlign:'left', fontSize: isMobile ? '11px' : undefined}}>iGamerWorld adalah platform e-commerce yang menyediakan produk gaming dan aksesoris komputer berkualitas untuk memenuhi kebutuhan para gamer dan tech enthusiast di Indonesia.</p>
                    </Col>
                    {/* Bantuan */}
                    <Col md={1} xs={6} style={{ marginBottom: isMobile ? 12 : 0 }}>
                        <h5 style={{ fontWeight: 'semibold', textAlign: 'left', fontSize: isMobile ? '13px' : '16px' }}>Bantuan</h5>
                        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', fontSize: isMobile ? '11px' : undefined }}>
                            <li>
                                <Link to="/pengaduan" style={{ textDecoration: 'none', color: '#000' }}>
                                    Pengaduan
                                </Link>
                            </li>
                        </ul>
                    </Col>
                    {/* Customer Care */}
                    <Col md={3} xs={12} style={{ marginBottom: isMobile ? 12 : 0 }}>
                        <h5 style={{ fontWeight: 'semibold', textAlign: 'left', fontSize: isMobile ? '13px' : '16px' }}>Customer Care</h5>
                        <p style={{ textAlign: 'left', fontSize: isMobile ? '11px' : undefined }}>
                            Grand City, Ruko Sentra Niaga Block RSN 3 No.18, Jaka Setia
                            <br />
                            Senin-Sabtu, 10.00 - 18.00 WIB
                            <br />
                            081295736010 (Message Only)
                        </p>
                    </Col>
                    {/* Toko Kami */}
                    <Col md={3} xs={12} style={{ marginBottom: isMobile ? 12 : 0 }}>
                        <h5 style={{ fontWeight: 'semibold', textAlign: 'left', fontSize: isMobile ? '13px' : '16px' }}>Toko Kami</h5>
                        <p style={{ textAlign: 'left', fontSize: isMobile ? '11px' : undefined }}>
                            Jl. Klampis Aji I No. 19, Klampis Ngasem, Kec. Sukolilo, Surabaya, Jawa Timur 60117
                            <br />
                            Setiap Hari, 10.00 - 18.00 WIB
                            <br />
                            081310766339 (WA Message Only)
                        </p>
                    </Col>
                    {/* Metode Pembayaran */}
                    <Col md={3} xs={12}>
                        <h5 style={{ fontWeight: 'semibold', textAlign: 'left', fontSize: isMobile ? '13px' : '16px' }}>Metode Pembayaran</h5>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', textAlign: 'left' }}>
                            <img src="/images/BCA.png" alt="BCA" style={{ height: isMobile ? '28px' : '40px' }} />
                            <img src="/images/BRI.png" alt="BRI" style={{ height: isMobile ? '28px' : '40px' }} />
                            <img src="/images/Jenius.png" alt="Mandiri" style={{ height: isMobile ? '28px' : '40px' }} />
                            <img src="/images/BNI.png" alt="BNI" style={{ height: isMobile ? '28px' : '40px' }} />
                        </div>
                    </Col>
                </Row>
                {/* Footer Bottom */}
                <Row>
                    <Col>
                        <hr style={{ borderColor: '#000' }} />
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 6 : 0 }}>
                            <img src="/images/logo.png" alt="Logo" style={{ height: isMobile ? '36px' : '60px' }} />
                            <p style={{ margin: 0, fontSize: isMobile ? '10px' : '14px' }}>© 2025 iGamerWorld. All rights reserved.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;