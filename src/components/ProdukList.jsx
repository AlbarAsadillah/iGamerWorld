import React, { useState } from 'react';
import ProductCard, { dummyProducts } from './ProductCard';
import { Nav, Button } from 'react-bootstrap';

const ProdukList = () => {
    const [activeTab, setActiveTab] = useState('all'); // State untuk tab aktif
    const [visibleCount, setVisibleCount] = useState(8); // State untuk jumlah produk yang ditampilkan

    // Filter produk berdasarkan tab aktif
    const filteredProducts = dummyProducts.filter((product) => {
        if (activeTab === 'ready-stock') return product.status === 'ready-stock';
        if (activeTab === 'pre-order') return product.status === 'pre-order';
        return true; // Default: 'all'
    });

    // Produk yang akan ditampilkan berdasarkan jumlah yang terlihat
    const visibleProducts = filteredProducts.slice(0, visibleCount);

    return (
        <div
            style={{
                padding: '0 72px 0 72px',
                minHeight: '100vh', // Tinggi minimum layar
                backgroundColor: '#171717', // Warna latar belakang
                color: 'white', // Warna teks default
            }}
        >
            <h2 style={{ textAlign: 'left' }}>PRODUK</h2>
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
                            color: activeTab === 'all' ? 'black' : 'white',
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
                            color: activeTab === 'ready-stock' ? 'black' : 'white',
                            fontWeight: activeTab === 'ready-stock' ? 'bold' : 'normal',
                        }}
                    >
                        Ready Stock
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        active={activeTab === 'pre-order'}
                        onClick={() => {
                            setActiveTab('pre-order');
                            setVisibleCount(8); // Reset jumlah produk saat tab berubah
                        }}
                        style={{
                            color: activeTab === 'pre-order' ? 'black' : 'white',
                            fontWeight: activeTab === 'pre-order' ? 'bold' : 'normal',
                        }}
                    >
                        Pre-Order
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/* Produk */}
            <div
                className="d-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)', // 4 kolom
                    gap: '16px',
                }}
            >
                {visibleProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        price={`Rp${product.price.toLocaleString('id-ID')}`}
                        textColor="#FFFFFF"
                    />
                ))}
            </div>

            {/* Tombol Lihat Lainnya */}
            {visibleCount < filteredProducts.length && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button
                        variant='warning'
                        onClick={() => setVisibleCount((prevCount) => prevCount + 8)} // Tambah 8 produk lagi
                    >
                        Lihat Lainnya
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProdukList;