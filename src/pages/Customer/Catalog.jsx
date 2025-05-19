import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import FilterProduct from '../../components/FilterProduct'; // Import komponen FilterProduct
import { dummyProducts } from '../../data/dummyProducts';

const Catalog = () => {
    const [filteredProducts, setFilteredProducts] = useState(dummyProducts); // State untuk produk yang difilter

    // Fungsi untuk menangani filter produk
    const handleFilter = (filtered) => {
        setFilteredProducts(filtered);
    };

    return (
        <Container className="py-5" style={{ minHeight: '100vh', width: '100%' }}>
            <Row>
                {/* Sidebar Filter */}
                <Col xs={12} md={3}>
                    <FilterProduct products={dummyProducts} onFilter={handleFilter} />
                </Col>

                {/* Daftar Produk */}
                <Col xs={12} md={9}>
                    <Row className="g-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Col 
                                    key={product.id} 
                                    xs={12} 
                                    sm={6} 
                                    md={4} 
                                    lg={4}
                                    style={{ marginBottom: '20px' }} // Menambahkan jarak antar produk
                                >
                                    <ProductCard
                                        id={product.id}
                                        image={product.image}
                                        name={product.name}
                                        price={`Rp ${product.price.toLocaleString('id-ID')}`}
                                        textColor="#FFFFFF" // Mengatur warna teks menjadi putih
                                    />
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <p className="text-white">Produk tidak ditemukan.</p>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Catalog;
