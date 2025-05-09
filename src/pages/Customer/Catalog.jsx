import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FilterProduct from '../../components/FilterProduct';
import ProductCard, { dummyProducts } from '../../components/ProductCard';

const Catalog = () => {
    return (
        <Container className="py-5" style={{ minHeight: '100vh', width : '100%' }}>
            <Row>
                {/* Sidebar Filter */}
                <Col xs={12} md={3}>
                    <FilterProduct />
                </Col>

                {/* Daftar Produk */}
                <Col xs={12} md={9}>
                    <Row className="g-4">
                        {dummyProducts.map((product) => (
                            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard
                                    id={product.id}
                                    image={product.image}
                                    name={product.name}
                                    price={`Rp ${product.price.toLocaleString('id-ID')}`}
                                    textColor="#FFFFFF" // Mengatur warna teks menjadi putih
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Catalog;