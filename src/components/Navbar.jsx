import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { ShoppingCart, Clock, Heart, Search } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const [searchQuery, setSearchQuery] = useState(''); // State untuk input pencarian
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Mencegah reload halaman
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`); // Arahkan ke halaman hasil pencarian
        }
    };

    return (
        <Navbar style={{ backgroundColor: '#212121', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }} variant="dark" expand="lg" className="py-3">
            <Container fluid>
                {/* Kiri: Logo */}
                <Navbar.Brand as={NavLink} to="/" className="fw-bold text-white">
                    IGAMERWORLD
                </Navbar.Brand>

                {/* Toggle Button untuk Layar Kecil */}
                <Navbar.Toggle aria-controls="navbarResponsive" />

                {/* Konten Navbar */}
                <Navbar.Collapse id="navbarResponsive">
                    <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between w-100">
                        {/* Menu Navigasi */}
                        <Nav className="mb-3 mb-lg-0">
                            <Nav.Link
                                as={NavLink}
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? 'text-white fw-bold text-decoration-underline' : 'text-white'
                                }
                            >
                                Home
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/Catalog"
                                className={({ isActive }) =>
                                    isActive ? 'text-white fw-bold text-decoration-underline' : 'text-white'
                                }
                            >
                                Produk
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/custom"
                                className={({ isActive }) =>
                                    isActive ? 'text-white fw-bold text-decoration-underline' : 'text-white'
                                }
                            >
                                Custom PC
                            </Nav.Link>
                        </Nav>

                        {/* Search Form */}
                        <Form className="d-flex mb-3 mb-lg-0" style={{ maxWidth: '400px', width: '100%' }} onSubmit={handleSearchSubmit}>
                            <FormControl
                                type="search"
                                placeholder="Search Here……"
                                className="me-2"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update state saat input berubah
                            />
                            <Button variant="warning" type="submit">
                                <Search size={16} color="black" />
                            </Button>
                        </Form>

                        {/* Ikon sebagai Nav.Link */}
                        <Nav className="d-flex align-items-center gap-3">
                            <Nav.Link
                                as={NavLink}
                                to="/cart"
                                className={({ isActive }) =>
                                    isActive ? 'text-white fw-bold' : 'text-white'
                                }
                            >
                                <ShoppingCart className="text-white" />
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/history"
                                className={({ isActive }) =>
                                    isActive ? 'text-white fw-bold' : 'text-white'
                                }
                            >
                                <Clock className="text-white" />
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/wishlist"
                                className={({ isActive }) =>
                                    isActive ? 'text-white fw-bold' : 'text-white'
                                }
                            >
                                <Heart className="text-white" />
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/login"
                                className={({ isActive }) =>
                                    `ms-auto text-white ${isActive ? 'fw-bold text-decoration-underline' : ''}`
                                }
                            >
                                Login
                            </Nav.Link>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;