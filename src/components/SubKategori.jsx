import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button1 from './Button'; 


const SubKategori = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const categories = [
        { icon: <img src="/images/icons/motherboard.png" alt="Motherboard" style={{ width: '50px', height: '50px' }} />, name: 'Motherboard', subkategori: 'motherboard' },
        { icon: <img src="/images/icons/cpu.png" alt="CPU" style={{ width: '50px', height: '50px' }} />, name: 'Processor', subkategori: 'processor' },
        { icon: <img src="/images/icons/ram.png" alt="RAM" style={{ width: '50px', height: '50px' }} />, name: 'RAM', subkategori: 'ram' },
        { icon: <img src="/images/icons/gpu.png" alt="GPU" style={{ width: '50px', height: '50px' }} />, name: 'GPU',subkategori: 'gpu' },
        { icon: <img src="/images/icons/headset.png" alt="Headset" style={{ width: '50px', height: '50px' }} />, name: 'Headset',subkategori: 'headset' },
        { icon: <img src="/images/icons/mouse.png" alt="Mouse" style={{ width: '50px', height: '50px' }} />, name: 'Mouse',subkategori: 'mouse' },
        { icon: <img src="/images/icons/keyboard.png" alt="Keyboard" style={{ width: '50px', height: '50px' }} />, name: 'Keyboard', subkategori: 'keyboard' },
        { icon: <img src="/images/icons/pc-gaming.png" alt="Pc-gaming" style={{ width: '50px', height: '50px' }} />, name: 'PC Gaming', subkategori: 'pc-gaming' },
        { icon: <img src="/images/icons/pc-editing.png" alt="Pc-Editing" style={{ width: '50px', height: '50px' }} />, name: 'PC Editing', subkategori: 'pc-editing' },
        { icon: <img src="/images/icons/pc-kerja.png" alt="Pc-Kerja" style={{ width: '50px', height: '50px' }} />, name: 'PC Kerja', subkategori: 'pc-kerja' },
        { icon: <img src="/images/icons/monitor.png" alt="Monitor" style={{ width: '50px', height: '50px' }} />, name: 'Monitor', subkategori: 'monitor' },
        { icon: <img src="/images/icons/storage.png" alt="Storage" style={{ width: '50px', height: '50px' }} />, name: 'Storage', subkategori: 'storage' },
        { icon: <img src="/images/icons/psu.png" alt="PSU" style={{ width: '50px', height: '50px' }} />, name: 'PSU', subkategori: 'psu' },
        { icon: <img src="/images/icons/casing.png" alt="Casing" style={{ width: '50px', height: '50px' }} />, name: 'Casing', subkategori: 'casing' },
        { icon: <img src="/images/icons/fan.png" alt="Fan" style={{ width: '50px', height: '50px' }} />, name: 'Fan', subkategori: 'fan' },
        { icon: <img src="/images/icons/cooler.png" alt="Cooler" style={{ width: '50px', height: '50px' }} />, name: 'Cooler', subkategori: 'cooler' },
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCategoryClick = (subkategori) => {
        setShowModal(false); // close modal if open
        navigate(`/catalog?subkategori=${subkategori}`);
    };

    return (
        <section
            style={{
                backgroundColor: '#212121',
                backgroundImage: 'url("/images/bg-subkategori.png")',
                height: isMobile ? 'auto' : '860px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: isMobile ? '32px' : '72px',
            }}
        >
            <Container className="m-0">
                <header>
                    <h2 className="text-warning mb-4 text-start">Sub Kategori</h2>
                </header>
                {isMobile ? (
                    <>
                        <Button1 label="Lihat Sub Kategori" onClick={() => setShowModal(true)}>
                        </Button1>
                        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                            <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)', color: '#FFD700', borderBottom: '1px solid #FFD700' }}>
                                <Modal.Title style={{ color: '#FFD700', fontWeight: 700 }}>Sub Kategori</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)', color: '#fff', borderRadius: '0 0 8px 8px' }}>
                                <Row className="g-3">
                                    {categories.map((category, index) => (
                                        <Col key={index} xs={6}>
                                            <button
                                                onClick={() => handleCategoryClick(category.subkategori)}
                                                className="btn p-0 w-100"
                                                style={{ background: 'none', border: 'none', textAlign: 'inherit' }}
                                            >
                                                <Card className="text-center text-dark border-0 shadow-sm card-hover mb-2" style={{ backgroundColor: '#212121' }}>
                                                    <Card.Body>
                                                        <div className="mb-2">{category.icon}</div>
                                                        <Card.Title className="fs-6 text-truncate" style={{ maxWidth: '100%', color: '#ffffff' }}>
                                                            {category.name}
                                                        </Card.Title>
                                                    </Card.Body>
                                                </Card>
                                            </button>
                                        </Col>
                                    ))}
                                </Row>
                            </Modal.Body>
                        </Modal>
                    </>
                ) : (
                    <Row className="g-4">
                        {categories.map((category, index) => (
                            <Col key={index} xs={6} sm={4} md={3} lg={2}>
                                <button
                                    onClick={() => handleCategoryClick(category.subkategori)}
                                    className="btn p-0 w-100"
                                    style={{ background: 'none', border: 'none', textAlign: 'inherit' }}
                                >
                                    <Card className="text-center text-white border-0 shadow-sm card-hover"
                                        style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease', backgroundColor: '#212121' }}
                                    >
                                        <Card.Body>
                                            <div className="mb-3">{category.icon}</div>
                                            <Card.Title className="fs-6 text-truncate" style={{ maxWidth: '100%' }}>
                                                {category.name}
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </button>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
            <style>
                {`
                    .card-hover:hover {
                        transform: translateY(-10px);
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    }
                    @media (max-width: 768px) {
                        section {
                            padding: 48px;
                        }
                        h2 {
                            font-size: 1.5rem;
                        }
                    }
                    @media (max-width: 576px) {
                        section {
                            padding: 32px;
                        }
                        h2 {
                            font-size: 1.25rem;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default SubKategori;