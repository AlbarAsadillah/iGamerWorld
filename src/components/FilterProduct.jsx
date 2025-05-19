import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const FilterProduct = ({ products, onFilter }) => {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [brand, setBrand] = useState('');
    const [socket, setSocket] = useState('');
    const [stockStatus, setStockStatus] = useState('');
    const [sortOption, setSortOption] = useState('');

    // Data untuk dropdown
    const categories = ['Komponen', 'Aksesoris', 'PC Bundling'];
    const subcategories = ['Mouse', 'Keyboard'];
    const brands = ['Logitech', 'Razer', 'SteelSeries', 'Fantech', 'Ajazz'];
    const sockets = ['Intel', 'AMD'];
    const stockStatusOptions = ['Ready Stock', 'Pre-Order'];
    const sortingOptions = ['Harga Terendah', 'Harga Tertinggi', 'Terbaru'];

    // Fungsi untuk menerapkan filter
    const applyFilter = () => {
        let filteredProducts = [...products];

        if (category) {
            filteredProducts = filteredProducts.filter((product) => product.category === category);
        }

        if (subcategory) {
            filteredProducts = filteredProducts.filter((product) => product.subcategory === subcategory);
        }

        if (brand) {
            filteredProducts = filteredProducts.filter((product) => product.brand === brand);
        }

        if (socket) {
            filteredProducts = filteredProducts.filter((product) => product.socket === socket);
        }

        if (stockStatus) {
            filteredProducts = filteredProducts.filter((product) => product.stockStatus === stockStatus);
        }

        if (sortOption) {
            if (sortOption === 'Harga Terendah') {
                filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortOption === 'Harga Tertinggi') {
                filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
            } else if (sortOption === 'Terbaru') {
                filteredProducts = filteredProducts.sort((a, b) => b.id - a.id);
            }
        }

        onFilter(filteredProducts); // Kirimkan produk yang difilter ke komponen parent
    };

    // Gunakan useEffect untuk menerapkan filter setiap kali nilai filter berubah
    useEffect(() => {
        applyFilter();
    }, [category, subcategory, brand, socket, stockStatus, sortOption]);

    return (
        <div
            className="responsive-filter"
            style={{
                backgroundColor: '#212121',
                padding: '15px',
                borderRadius: '6px',
                color: '#fff',
                width: '100%',
                maxWidth: '250px',
            }}
        >
            <h6 className="mb-3" style={{ color: '#fff', fontSize: '16px' }}>Filter Produk</h6>
            <Form>
                <Row>
                    {/* Kategori */}
                    <Col xs={12}>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ fontSize: '14px' }}>Kategori</Form.Label>
                            <Autocomplete
                                disablePortal
                                options={categories}
                                value={category}
                                style={{borderColor: '#fff'}}

                                onChange={(e, newValue) => setCategory(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Pilih Kategoris"
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            
                                            borderRadius: '4px',
                                            borderColor: '#FFFFFF',
                                            outlineColor: '#fff'
                                        }}
                                    />
                                )}
                            />
                        </Form.Group>
                    </Col>

                    {/* Subkategori */}
                    <Col xs={12}>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ fontSize: '14px' }}>Subkategori</Form.Label>
                            <Autocomplete
                                disablePortal
                                options={subcategories}
                                value={subcategory}
                                onChange={(e, newValue) => setSubcategory(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Pilih Subkategori"
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#fff',
                                            borderRadius: '4px',
                                        }}
                                    />
                                )}
                            />
                        </Form.Group>
                    </Col>

                    {/* Brand */}
                    <Col xs={12}>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ fontSize: '14px' }}>Brand</Form.Label>
                            <Autocomplete
                                disablePortal
                                options={brands}
                                value={brand}
                                onChange={(e, newValue) => setBrand(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Pilih Brand"
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#fff',
                                            borderRadius: '4px',
                                        }}
                                    />
                                )}
                            />
                        </Form.Group>
                    </Col>

                    {/* Socket */}
                    <Col xs={12}>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ fontSize: '14px' }}>Socket</Form.Label>
                            <Autocomplete
                                disablePortal
                                options={sockets}
                                value={socket}
                                onChange={(e, newValue) => setSocket(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Pilih Socket"
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#fff',
                                            borderRadius: '4px',
                                        }}
                                    />
                                )}
                            />
                        </Form.Group>
                    </Col>

                    {/* Status Stok */}
                    <Col xs={12}>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ fontSize: '14px' }}>Status Stok</Form.Label>
                            <Autocomplete
                                disablePortal
                                options={stockStatusOptions}
                                value={stockStatus}
                                onChange={(e, newValue) => setStockStatus(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Pilih Status Stok"
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#fff',
                                            borderRadius: '4px',
                                        }}
                                    />
                                )}
                            />
                        </Form.Group>
                    </Col>

                    {/* Urutkan */}
                    <Col xs={12}>
                        <Form.Group className="mb-2">
                            <Form.Label style={{ fontSize: '14px' }}>Urutkan</Form.Label>
                            <Autocomplete
                                disablePortal
                                options={sortingOptions}
                                value={sortOption}
                                onChange={(e, newValue) => setSortOption(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Urutkan"
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            backgroundColor: '#fff',
                                            borderRadius: '4px',
                                        }}
                                    />
                                )}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default FilterProduct;