import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const FilterProduct = () => {
    const [showFilter, setShowFilter] = useState(false); // State untuk mengontrol visibilitas filter

    // Data untuk dropdown
    const categories = ['Mouse', 'Keyboard', 'Headset'];
    const subcategories = ['Gaming', 'Office'];
    const brands = ['Logitech', 'Razer', 'SteelSeries'];
    const sockets = ['Intel', 'AMD'];
    const stockStatus = ['Ready Stock', 'Pre-Order'];
    const sortingOptions = ['Harga Terendah', 'Harga Tertinggi', 'Terbaru'];

    const handleShowFilter = () => setShowFilter(true);
    const handleCloseFilter = () => setShowFilter(false);

    return (
        <>
            {/* Tombol untuk membuka filter pada layar kecil */}
            <Button
                variant="warning"
                className="d-block d-md-none w-100 mb-3"
                onClick={handleShowFilter}
                style={{ fontWeight: 'medium', fontSize: '14px' }}
            >
                Filter Produk
            </Button>

            {/* Filter Produk untuk layar besar */}
            <div
                className="responsive-filter d-none d-md-block"
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
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Pilih Kategori"
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

                        {/* Subkategori */}
                        <Col xs={12}>
                            <Form.Group className="mb-2">
                                <Form.Label style={{ fontSize: '14px' }}>Subkategori</Form.Label>
                                <Autocomplete
                                    disablePortal
                                    options={subcategories}
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
                                    options={stockStatus}
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

                        {/* Reset Filter */}
                        <Col xs={12}>
                            <Button
                                variant="warning"
                                className="w-100"
                                size="sm"
                                style={{ color: '#000', fontWeight: 'medium', fontSize: '14px' }}
                            >
                                Reset Filter
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            {/* Modal untuk Filter Produk pada layar kecil */}
                        <Modal
                show={showFilter}
                onHide={handleCloseFilter}
                centered
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Filter Produk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            {/* Kategori */}
                            <Col xs={12}>
                                <Form.Group className="mb-2">
                                    <Form.Label style={{ fontSize: '14px' }}>Kategori</Form.Label>
                                    <Autocomplete
                                        disablePortal
                                        options={categories}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Pilih Kategori"
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
            
                            {/* Subkategori */}
                            <Col xs={12}>
                                <Form.Group className="mb-2">
                                    <Form.Label style={{ fontSize: '14px' }}>Subkategori</Form.Label>
                                    <Autocomplete
                                        disablePortal
                                        options={subcategories}
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
                                        options={stockStatus}
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
            
                            {/* Reset Filter */}
                            <Col xs={12}>
                                <Button
                                    variant="warning"
                                    className="w-100"
                                    size="sm"
                                    style={{ color: '#000', fontWeight: 'medium', fontSize: '14px' }}
                                >
                                    Reset Filter
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FilterProduct;