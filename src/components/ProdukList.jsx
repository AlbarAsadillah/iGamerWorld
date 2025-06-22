import React, { useState } from 'react';
import { Nav } from 'react-bootstrap'; // Removed Button import from react-bootstrap
import ProductCard from './ProductCard'; // Pastikan path sesuai dengan lokasi ProductCard
import { dummyProducts } from '../data/dummyProducts'; // Pastikan path sesuai dengan lokasi data dummyProducts
import Button1 from './Button';  // Komponen Tombol yang sudah Anda buat

const ProdukList = () => {
    const [activeTab, setActiveTab] = useState('all'); // State untuk tab aktif
    const [visibleCount, setVisibleCount] = useState(8); // State untuk jumlah produk yang ditampilkan

    // Filter produk berdasarkan tab aktif
    const filteredProducts = dummyProducts.filter((product) => {
        if (activeTab === 'ready-stock') return product.status === 'ready-stock';
        if (activeTab === 'out-of-stock') return product.status === 'out-of-stock';
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
                className="d-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)', // 4 kolom
                    gap: '16px',
                    marginBottom: '30px', // Tambahan jarak bawah supaya tombol tidak mepet
                }}
            >
                {visibleProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        price={`Rp${product.price.toLocaleString('id-ID')}`}
                        textColor="#FFFFFF" // Mengatur warna teks menjadi putih
                    />
                ))}
            </div>

            {/* Tombol Lihat Lainnya */}
            {visibleCount < filteredProducts.length && (
                <div style={{ textAlign: 'center' }}>
                    <Button1
                    style={{
                        width: '200px',
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
