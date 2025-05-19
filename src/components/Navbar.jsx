import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, Button, FormControl } from 'react-bootstrap';
import { ShoppingCart, Clock, Heart, Search } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dropdown, Menu, Space } from 'antd'; // Menggunakan Ant Design untuk Dropdown dan Menu
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavigationBar = ({ setSearchQuery }) => {
  const [localSearch, setLocalSearch] = useState(''); // Local state hanya untuk input
  const [user, setUser] = useState(null); // State untuk menyimpan data pengguna
  const navigate = useNavigate();

  // Ambil data pengguna dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Menyimpan data pengguna ke state
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Hapus data pengguna dari localStorage
    setUser(null); // Reset state pengguna
    navigate('/'); // Redirect ke halaman utama setelah logout
  };

  // Menu untuk dropdown pengguna
  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <NavLink to="/account">Account</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to="/address-book">Address Book</NavLink>
      </Menu.Item>
      <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Navbar
      style={{ backgroundColor: '#212121', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
      variant="dark"
      expand="lg"
      className="py-3"
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-white">
          IGAMERWORLD
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarResponsive" />
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
                to="/catalog"
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

            {/* Search Bar */}
            <Form
              className="d-flex mb-3 mb-lg-0"
              style={{ maxWidth: '400px', width: '100%' }}
              onSubmit={(e) => {
                e.preventDefault();
                if (localSearch.trim()) {
                  setSearchQuery(localSearch);
                  navigate(`/catalog?q=${encodeURIComponent(localSearch)}`);
                }
              }}
            >
              <FormControl
                type="search"
                placeholder="Search Here……"
                className="me-2"
                aria-label="Search"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <Button variant="warning" type="submit">
                <Search size={16} color="black" />
              </Button>
            </Form>

            {/* Ikon */}
            <Nav className="d-flex align-items-center gap-3">
              <Nav.Link
                className="text-white"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/cart');
                }}
              >
                <ShoppingCart />
              </Nav.Link>
              <Nav.Link
                className="text-white"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/history');
                }}
              >
                <Clock />
              </Nav.Link>
              <Nav.Link
                className="text-white"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/wishlist');
                }}
              >
                <Heart />
              </Nav.Link>

              {/* Tampilkan dropdown jika pengguna login */}
              {user ? (
                <>
                  <Dropdown overlay={userMenu} trigger={['click']}>
                    <a className="text-white ms-auto" onClick={(e) => e.preventDefault()}>
                      <Space>
                        <AccountCircleIcon style={{ color: 'white', fontSize: '30px' }} />
                        <span className="ms-2" style={{ color: 'white' }}>
                          {user.username}
                        </span>
                      </Space>
                    </a>
                  </Dropdown>
                </>
              ) : (
                <Nav.Link as={NavLink} to="/login" className="text-white ms-auto">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
