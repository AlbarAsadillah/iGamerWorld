import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom

const BrandSection = () => {
    const officialBrands = [
        { name: 'ASUS', logo: '/images/brands/Asus.png', link: '/brands/asus' },
        { name: 'MSI', logo: '/images/brands/MSI.png', link: '/brands/msi' },
        { name: 'GIGABYTE', logo: '/images/brands/Gigabyte.png', link: '/brands/gigabyte' },
        { name: 'Intel', logo: '/images/brands/intel.png', link: '/brands/intel' },
        { name: 'AMD', logo: '/images/brands/AMD.png', link: '/brands/amd' },
        { name: 'Logitech', logo: '/images/brands/Logitech.png', link: '/brands/logitech' },
        { name: 'Razer', logo: '/images/brands/Razer.png', link: '/brands/razer' },
        { name: 'Apple', logo: '/images/brands/Apple.png', link: '/brands/apple' },
        { name: 'JBL', logo: '/images/brands/JBL.png', link: '/brands/jbl' },
        { name: 'Fantech', logo: '/images/brands/Fantech.png', link: '/brands/fantech' },
    ];

    const eCommerce = [
        { name: 'Tokopedia', logo: '/images/ecommerce/tokopedia.png', bgColor: '#4CAF50', link: '/ecommerce/tokopedia' },
        { name: 'Shopee Mall', logo: '/images/ecommerce/shopee.png', bgColor: '#FF5722', link: '/ecommerce/shopee' },
    ];

    return (
        <section
            style={{
                backgroundColor: '#0D0D0D',
                padding: '40px 0',
            }}
        >
            <Container>
                <Row>
                    {/* Official Brands */}
                    <Col md={9}>
                        <Card style={{ backgroundColor: '#212121' }} className="text-white border-0 p-4">
                            <Card.Body>
                                <h5 className="text-warning mb-4">Official Brands</h5>
                                <Row className="g-3">
                                    {officialBrands.map((brand, index) => (
                                        <Col key={index} xs={4} sm={3} md={2} className="text-center">
                                            <Link to={brand.link}>
                                                <img
                                                    src={brand.logo}
                                                    alt={brand.name}
                                                    style={{
                                                        width: '60px',
                                                        height: '60px',
                                                        borderRadius: '50%',
                                                        backgroundColor: 'white',
                                                        padding: '10px',
                                                        transition: 'transform 0.3s ease', // Animasi hover
                                                    }}
                                                    className="brand-hover"
                                                />
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* E-commerce */}
                    <Col md={3}>
                         <Card style={{ backgroundColor: '#212121' }} className="text-white border-0 p-4">
                            <Card.Body>
                                <h5 className="text-warning mb-4">E-commerce</h5>
                                <Row className="g-3">
                                    {eCommerce.map((platform, index) => (
                                        <Col key={index}>
                                            <Link to={platform.link}>
                                                <img
                                                    src={platform.logo}
                                                    alt={platform.name}
                                                    style={{
                                                        height: '60px',
                                                        transition: 'transform 0.3s ease', // Animasi hover
                                                    }}
                                                    className="ecommerce-hover"
                                                />
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default BrandSection;