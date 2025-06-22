import React, { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import FilterProduct from '../../components/FilterProduct';
import { dummyProducts } from '../../data/dummyProducts';

const Catalog = () => {
    const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    const handleFilter = (filtered) => {
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container className="py-5" style={{ minHeight: '100vh', width: '100%' }}>
            <Row>
                <Col xs={12}>
                    <FilterProduct products={dummyProducts} onFilter={handleFilter} />
                </Col>
            </Row>

            <Row className="mt-4">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <Col 
                            key={product.id} 
                            xs={12} 
                            sm={6} 
                            md={4} 
                            lg={3}
                            style={{ marginBottom: '20px' }}
                        >
                            <ProductCard
                                id={product.id}
                                image={product.image}
                                name={product.name}
                                price={`Rp ${product.price.toLocaleString('id-ID')}`}
                                textColor="#FFFFFF"
                            />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p className="text-white">Produk tidak ditemukan.</p>
                    </Col>
                )}
            </Row>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.Prev 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            
                            <Pagination.Next 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Catalog;
