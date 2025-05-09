import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Cpu, HardDrive, Monitor, MousePointer, Keyboard, Headphones, Power, Fan, Box, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubKategori = () => {
    const navigate = useNavigate();

    const categories = [
        { icon: <Cpu size={32} color="#FFD700" />, name: 'Motherboard', count: '1 Produk', link: '/kategori/motherboard' },
        { icon: <Cpu size={32} color="#FFD700" />, name: 'Processor', count: '1 Produk', link: '/kategori/processor' },
        { icon: <HardDrive size={32} color="#FFD700" />, name: 'RAM', count: '1 Produk', link: '/kategori/ram' },
        { icon: <Monitor size={32} color="#FFD700" />, name: 'GPU', count: '1 Produk', link: '/kategori/gpu' },
        { icon: <Headphones size={32} color="#FFD700" />, name: 'Headset', count: '1 Produk', link: '/kategori/headset' },
        { icon: <MousePointer size={32} color="#FFD700" />, name: 'Mouse', count: '1 Produk', link: '/kategori/mouse' },
        { icon: <Keyboard size={32} color="#FFD700" />, name: 'Keyboard', count: '1 Produk', link: '/kategori/keyboard' },
        { icon: <Monitor size={32} color="#FFD700" />, name: 'PC Gaming', count: '1 Produk', link: '/kategori/pc-gaming' },
        { icon: <Settings size={32} color="#FFD700" />, name: 'PC Editing', count: '1 Produk', link: '/kategori/pc-editing' },
        { icon: <Monitor size={32} color="#FFD700" />, name: 'PC Kerja', count: '1 Produk', link: '/kategori/pc-kerja' },
        { icon: <Monitor size={32} color="#FFD700" />, name: 'Monitor', count: '1 Produk', link: '/kategori/monitor' },
        { icon: <HardDrive size={32} color="#FFD700" />, name: 'Storage', count: '1 Produk', link: '/kategori/storage' },
        { icon: <Power size={32} color="#FFD700" />, name: 'PSU', count: '1 Produk', link: '/kategori/psu' },
        { icon: <Box size={32} color="#FFD700" />, name: 'Casing', count: '1 Produk', link: '/kategori/casing' },
        { icon: <Fan size={32} color="#FFD700" />, name: 'Fan', count: '1 Produk', link: '/kategori/fan' },
        { icon: <Settings size={32} color="#FFD700" />, name: 'Cooler', count: '1 Produk', link: '/kategori/cooler' },
    ];

    const handleCategoryClick = (link) => {
        navigate(link);
    };

    return (
        <section
            style={{
                backgroundColor: '#0D0D0D',
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
                                onClick={() => handleCategoryClick(category.link)}
                                className="btn p-0 w-100"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    textAlign: 'inherit',
                                }}
                            >
                                <Card
                                    className="text-center bg-dark text-white border-0 shadow-sm card-hover"
                                    style={{
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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