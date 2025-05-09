import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer
            style={{
                backgroundColor: '#FFD700', // Warna kuning
                padding: '40px 0',
                color: '#000', // Warna teks hitam
                fontSize: '14px',
            }}
        >
            <Container>
                <Row className="mb-4">
                    {/* Tentang Kami */}
                    <Col md={2}>
                        <h5 style={{ fontWeight: 'semibold', textAlign: 'left' }}>Tentang Kami</h5>
                        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                            <li>Tentang Kami</li>
                            <li>Kebijakan Privasi</li>
                            <li>Syarat & Ketentuan</li>
                        </ul>
                    </Col>

                    {/* Bantuan */}
                    <Col md={2}>
                        <h5 style={{ fontWeight: 'semibold' , textAlign: 'left'}}>Bantuan</h5>
                        <ul style={{ listStyle: 'none', padding: 0 , textAlign: 'left'}}>
                            <li>Cara Berbelanja</li>
                            <li>Cara Pembayaran</li>
                            <li>Status Pesanan</li>
                            <li>Pengembalian Produk</li>
                            <li>Hubungi Kami</li>
                            <li>Feedback</li>
                        </ul>
                    </Col>

                    {/* Customer Care */}
                    <Col md={2}>
                        <h5 style={{ fontWeight: 'semibold' , textAlign: 'left'}}>Customer Care</h5>
                        <p style={{textAlign: 'left'}}>
                            Grand City, Ruko Sentra Niaga Block RSN 3 No.18, Jaka Setia
                            <br />
                            Senin-Sabtu, 10.00 - 18.00 WIB
                            <br />
                            081295736010 (Message Only)
                        </p>
                    </Col>

                    {/* Toko Kami */}
                    <Col md={3}>
                        <h5 style={{ fontWeight: 'semibold' , textAlign: 'left'}}>Toko Kami</h5>
                        <p style={{textAlign: 'left'}}>
                            Jl. Klampis Aji I No. 19, Klampis Ngasem, Kec. Sukolilo, Surabaya, Jawa Timur 60117
                            <br />
                            Setiap Hari, 10.00 - 18.00 WIB
                            <br />
                            081310766339 (WA Message Only)
                        </p>
                    </Col>

                    {/* Metode Pembayaran */}
                    <Col md={3}>
                        <h5 style={{ fontWeight: 'semibold' , textAlign: 'left'}}>Metode Pembayaran</h5>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' , textAlign: 'left'}}>
                            <img src="/images/BCA.png" alt="BCA" style={{ height: '40px' }} />
                            <img src="/images/BRI.png" alt="BRI" style={{ height: '40px' }} />
                            <img src="/images/Jenius.png" alt="Mandiri" style={{ height: '40px' }} />
                            <img src="/images/BNI.png" alt="BNI" style={{ height: '40px' }} />
                        </div>
                    </Col>
                </Row>

                {/* Footer Bottom */}
                <Row>
                    <Col>
                        <hr style={{ borderColor: '#000' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <img src="/images/logo.png" alt="Logo" style={{ height: '60px' }} />
                            <p style={{ margin: 0 }}>© 2025 iGamerWorld. All rights reserved.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;