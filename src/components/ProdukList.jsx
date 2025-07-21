import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { dummyProducts } from '../data/dummyProducts';
import Button1 from './Button';

const ProdukList = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [visibleCount, setVisibleCount] = useState(8);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 576);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredProducts = dummyProducts.filter((product) => {
        if (activeTab === 'ready-stock') return product.status === 'ready-stock';
        if (activeTab === 'out-of-stock') return product.status === 'out-of-stock';
        return true;
    });

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    return (
        <div
            style={{
                padding: isMobile ? '0 8px' : '0 72px',
                minHeight: '100vh',
                backgroundColor: '#171717',
                color: 'white',
                marginTop: '-15px',
            }}
        >
            <h2 style={{ textAlign: 'left', fontSize: isMobile ? '1.2rem' : '2rem' }}>PRODUK</h2>
            {/* Tabs */}
            <Nav variant="tabs" className="justify-content-left mb-4">
                <Nav.Item>
                    <Nav.Link
                        active={activeTab === 'all'}
                        onClick={() => {
                            setActiveTab('all');
                            setVisibleCount(8); // Reset jumlah produk saat tab berubah
                        }}
                        style={{
                            color: activeTab === 'all' ? 'white' : 'white',
                            fontWeight: activeTab === 'all' ? 'bold' : 'normal',
                        }}
                    >
                        All Items
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        active={activeTab === 'ready-stock'}
                        onClick={() => {
                            setActiveTab('ready-stock');
                            setVisibleCount(8); // Reset jumlah produk saat tab berubah
                        }}
                        style={{
                            color: activeTab === 'ready-stock' ? 'white' : 'white',
                            fontWeight: activeTab === 'ready-stock' ? 'bold' : 'normal',
                        }}
                    >
                        Ready Stock
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        active={activeTab === 'out-of-stock'}
                        onClick={() => {
                            setActiveTab('out-of-stock');
                            setVisibleCount(8); // Reset jumlah produk saat tab berubah
                        }}
                        style={{
                            color: activeTab === 'out-of-stock' ? 'white' : 'white',
                            fontWeight: activeTab === 'out-of-stock' ? 'bold' : 'normal',
                        }}
                    >
                        Out of Stock
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* Produk */}
            <div
                className="d-grid produklist-grid-responsive"
                style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                    gap: isMobile ? '10px' : '16px',
                    marginBottom: '30px',
                }}
            >
                {visibleProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        price={
                          product.variants && Array.isArray(product.variants) && product.variants.length > 0
                            ? (() => {
                                const prices = product.variants
                                  .map(v => (v && typeof v.price === 'number' && isFinite(v.price) ? v.price : null))
                                  .filter(p => p !== null);
                                if (prices.length > 0) {
                                  const minPrice = Math.min(...prices);
                                  return isFinite(minPrice) && minPrice !== Infinity ? `Rp${minPrice.toLocaleString('id-ID')}` : '-';
                                } else {
                                  return '-';
                                }
                              })()
                            : (typeof product.price === 'number' && isFinite(product.price))
                              ? `Rp${product.price.toLocaleString('id-ID')}`
                              : '-'
                        }
                        textColor="#FFFFFF" // Mengatur warna teks menjadi putih
                    />
                ))}
            </div>

            {/* Tombol Lihat Lainnya */}
            {visibleCount < filteredProducts.length && (
                <div style={{ textAlign: 'center' }}>
                    <Button1
                    style={{
                        width: isMobile ? '100%' : '200px',
                        marginBottom: '35px',
                        fontSize: isMobile ? '1rem' : '1.1rem',
                        padding: isMobile ? '12px 0' : undefined
                    }}
                    label="Lihat lainnya"
                        onClick={() => setVisibleCount((prevCount) => prevCount + 8)} // Tambah 8 produk lagi
                    >
                        Lihat Lainnya
                    </Button1>
                </div>
            )}
        </div>
    );
};

export default ProdukList;
