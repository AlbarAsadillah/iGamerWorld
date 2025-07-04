import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import FilterProduct from '../../components/FilterProduct';
import { dummyProducts } from '../../data/dummyProducts';
import '../../styles/CustomPagination.css';

const Catalog = ({ searchQuery }) => {
    const location = useLocation();
    const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;
    const [activeFilters, setActiveFilters] = useState({});
    const [initialCategory, setInitialCategory] = useState('');

    // Baca query string category & subkategori & brand
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        const subkategori = params.get('subkategori');
        const brand = params.get('brand');
        let newFilters = { ...activeFilters };
        if (category) {
            newFilters.category = category;
            setInitialCategory(category);
        }
        if (subkategori) {
            newFilters.subcategory = subkategori;
        }
        if (brand) {
            newFilters.brand = brand;
        }
        setActiveFilters(newFilters);
        const filtered = filterProducts(newFilters);
        setFilteredProducts(filtered);
        setCurrentPage(1);
    // eslint-disable-next-line
    }, [location.search]);

    // Fungsi filter produk berdasarkan filter panel
    const filterProducts = (filters) => {
        let products = [...dummyProducts];
        // Filter kategori
        if (filters.category && filters.category !== '') {
            products = products.filter(p => p.category && p.category.toLowerCase() === filters.category.toLowerCase());
        }
        // Filter subkategori
        if (filters.subcategory && filters.subcategory !== '') {
            products = products.filter(p => p.subcategory && p.subcategory.toLowerCase() === filters.subcategory.toLowerCase());
        }
        // Filter brand
        if (filters.brand && filters.brand !== '') {
            products = products.filter(p => p.brand && p.brand.toLowerCase() === filters.brand.toLowerCase());
        }
        // Filter socket
        if (filters.socket && filters.socket !== '') {
            products = products.filter(p => p.socket && p.socket.toLowerCase() === filters.socket.toLowerCase());
        }
        // Filter status stok
        if (filters.stockStatus && filters.stockStatus !== '') {
            products = products.filter(p => p.stockStatus && p.stockStatus.toLowerCase() === filters.stockStatus.toLowerCase());
        }
        // Sort
        if (filters.sortBy && filters.sortBy !== '') {
            if (filters.sortBy === 'Harga Terendah') {
                products = products.sort((a, b) => a.price - b.price);
            } else if (filters.sortBy === 'Harga Tertinggi') {
                products = products.sort((a, b) => b.price - a.price);
            } else if (filters.sortBy === 'Terbaru') {
                products = products.sort((a, b) => b.id - a.id);
            }
        }
        return products;
    };

    // Handler untuk menerima filter dari FilterProduct
    const handleApplyFilters = (filters) => {
        setActiveFilters(filters);
        const filtered = filterProducts(filters);
        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    // Filter by searchQuery jika ada
    const visibleProducts = searchQuery
        ? filteredProducts.filter(p => {
            const q = searchQuery.toLowerCase();
            return (
                p.name.toLowerCase().includes(q) ||
                (p.category && p.category.toLowerCase().includes(q)) ||
                (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
                (p.brand && p.brand.toLowerCase().includes(q))
            );
        })
        : filteredProducts;

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = visibleProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(visibleProducts.length / productsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container className="py-5" style={{ minHeight: '100vh', width: '100%' }}>
            <Row>
                <Col xs={12}>
                    <FilterProduct onApplyFilters={handleApplyFilters} initialCategory={initialCategory} />
                </Col>
            </Row>

            <Row className="mt-4">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => {
                        // Tentukan harga yang akan ditampilkan
                        let displayPrice = '-';
                        if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
                            // Ambil harga varian termurah
                            const minVariantPrice = Math.min(...product.variants.map(v => v.price));
                            displayPrice = `Rp ${minVariantPrice.toLocaleString('id-ID')}`;
                        } else if (typeof product.price === 'number') {
                            displayPrice = `Rp ${product.price.toLocaleString('id-ID')}`;
                        }
                        return (
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
                                    price={displayPrice}
                                    textColor="#FFFFFF"
                                />
                            </Col>
                        );
                    })
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
                        <Pagination className="custom-pagination">
                            <Pagination.Prev 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    className={index + 1 === currentPage ? 'custom-pagination-item active' : 'custom-pagination-item'}
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
