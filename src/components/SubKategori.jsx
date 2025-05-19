import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Cpu, HardDrive, Monitor, MousePointer, Keyboard, Headphones, Power, Fan, Box, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubKategori = () => {
    const navigate = useNavigate();

    const categories = [
        { icon: <img src="/images/icons/motherboard.png" alt="Motherboard" style={{ width: '50px', height: '50px' }} />, name: 'Motherboard', count: '1 Produk', subkategori: 'motherboard' },
        { icon: <img src="/images/icons/cpu.png" alt="CPU" style={{ width: '50px', height: '50px' }} />, name: 'Processor', count: '1 Produk', subkategori: 'processor' },
        { icon: <img src="/images/icons/ram.png" alt="RAM" style={{ width: '50px', height: '50px' }} />, name: 'RAM', count: '1 Produk', subkategori: 'ram' },
        { icon: <img src="/images/icons/gpu.png" alt="GPU" style={{ width: '50px', height: '50px' }} />, name: 'GPU', count: '1 Produk', subkategori: 'gpu' },
        { icon: <img src="/images/icons/headset.png" alt="Headset" style={{ width: '50px', height: '50px' }} />, name: 'Headset', count: '1 Produk', subkategori: 'headset' },
        { icon: <img src="/images/icons/mouse.png" alt="Mouse" style={{ width: '50px', height: '50px' }} />, name: 'Mouse', count: '1 Produk', subkategori: 'mouse' },
        { icon: <img src="/images/icons/keyboard.png" alt="Keyboard" style={{ width: '50px', height: '50px' }} />, name: 'Keyboard', count: '1 Produk', subkategori: 'keyboard' },
        { icon: <img src="/images/icons/pc-gaming.png" alt="Pc-gaming" style={{ width: '50px', height: '50px' }} />, name: 'PC Gaming', count: '1 Produk', subkategori: 'pc-gaming' },
        { icon: <img src="/images/icons/pc-editing.png" alt="Pc-Editing" style={{ width: '50px', height: '50px' }} />, name: 'PC Editing', count: '1 Produk', subkategori: 'pc-editing' },
        { icon: <img src="/images/icons/pc-kerja.png" alt="Pc-Kerja" style={{ width: '50px', height: '50px' }} />, name: 'PC Kerja', count: '1 Produk', subkategori: 'pc-kerja' },
        { icon: <img src="/images/icons/monitor.png" alt="Monitor" style={{ width: '50px', height: '50px' }} />, name: 'Monitor', count: '1 Produk', subkategori: 'monitor' },
        { icon: <img src="/images/icons/storage.png" alt="Storage" style={{ width: '50px', height: '50px' }} />, name: 'Storage', count: '1 Produk', subkategori: 'storage' },
        { icon: <img src="/images/icons/psu.png" alt="PSU" style={{ width: '50px', height: '50px' }} />, name: 'PSU', count: '1 Produk', subkategori: 'psu' },
        { icon: <img src="/images/icons/casing.png" alt="Casing" style={{ width: '50px', height: '50px' }} />, name: 'Casing', count: '1 Produk', subkategori: 'casing' },
        { icon: <img src="/images/icons/fan.png" alt="Fan" style={{ width: '50px', height: '50px' }} />, name: 'Fan', count: '1 Produk', subkategori: 'fan' },
        { icon: <img src="/images/icons/cooler.png" alt="Cooler" style={{ width: '50px', height: '50px' }} />, name: 'Cooler', count: '1 Produk', subkategori: 'cooler' },
    ];

    const handleCategoryClick = (subkategori) => {
        navigate(`/catalog?subkategori=${subkategori}`); // Navigasi ke halaman Catalog dengan parameter subkategori
    };

    return (
        <section
            style={{
                backgroundColor: '#212121',
                backgroundImage: 'url("/images/bg-subkategori.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: '72px',
            }}
        >
            <Container className="m-0">
                <header>
                    <h2 className="text-warning mb-4 text-start">Sub Kategori</h2>
                </header>
                <Row className="g-4">
                    {categories.map((category, index) => (
                        <Col key={index} xs={6} sm={4} md={3} lg={2}>
                            <button
                                onClick={() => handleCategoryClick(category.subkategori)} // Kirim subkategori saat diklik
                                className="btn p-0 w-100"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    textAlign: 'inherit',
                                }}
                            >
                                <Card
                                    className="text-center text-white border-0 shadow-sm card-hover"
                                    style={{
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        backgroundColor: '#212121',
                                    }}
                                >
                                    <Card.Body>
                                        <div className="mb-3">{category.icon}</div>
                                        <Card.Title className="fs-6 text-truncate" style={{ maxWidth: '100%' }}>
                                            {category.name}
                                        </Card.Title>
                                        <Card.Text className="text-white">{category.count}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </button>
                        </Col>
                    ))}
                </Row>
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