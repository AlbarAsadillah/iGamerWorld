import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, Button, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { ShoppingCart, Clock, Heart, Search } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dropdown, Space, Badge } from 'antd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useCart } from '../context/CartContext'; // Sesuaikan path
import Button1 from './Button';
import Button2 from './Button2';  // Komponen Button2 yang baru dibuat

const NavigationBar = ({ setSearchQuery }) => {
  const { cart } = useCart();
  const [localSearch, setLocalSearch] = useState('');
  const [user, setUser] = useState(null);
  const [historyCount, setHistoryCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0); // Tambahan untuk favorite count
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    // Listen for user profile updates
    const handleUserUpdate = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      }
    };

    // Add event listener for profile updates
    window.addEventListener('userProfileUpdated', handleUserUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('userProfileUpdated', handleUserUpdate);
    };
  }, []);

  useEffect(() => {
    if (user) {
      const history = JSON.parse(localStorage.getItem('transactionHistory')) || [];
      const activeOrders = history.filter(
        (order) => order.status !== 'selesai' && order.status !== 'dibatalkan'
      );
      setHistoryCount(activeOrders.length);

      // Asumsikan favorite disimpan di localStorage dengan key 'wishlist'
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setFavoriteCount(wishlist.length);
    } else {
      setHistoryCount(0);
      setFavoriteCount(0);
    }
  }, [user]);

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowLogoutModal(false);
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };



  const navigateOrLogin = (path) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <>
      {/* Custom CSS for navbar search */}
      <style>{`
        .navbar-search-input:focus {
          background-color: #444 !important;
          border-color: #FFD700 !important;
          color: #fff !important;
          box-shadow: none !important;
        }

        .navbar-search-input::placeholder {
          color: #aaa !important;
        }

        .navbar-search-input:focus + .input-group-text,
        .input-group-text:focus-within {
          border-color: #FFD700 !important;
          background-color: #444 !important;
        }

        /* Responsive navbar search */
        @media (max-width: 991px) {
          .navbar-search-form {
            max-width: 100% !important;
            margin: 10px 0 !important;
          }
        }

        @media (max-width: 576px) {
          .navbar-search-form .input-group {
            flex-direction: column !important;
          }

          .navbar-search-form .input-group .form-control {
            border-radius: 0.375rem 0.375rem 0 0 !important;
            border-bottom: none !important;
          }

          .navbar-search-form .input-group .btn {
            border-radius: 0 0 0.375rem 0.375rem !important;
            border-top: none !important;
          }

          .navbar-search-form .input-group-text {
            border-radius: 0.375rem 0.375rem 0 0 !important;
            border-bottom: none !important;
            border-right: 1px solid #555 !important;
          }
        }
      `}</style>

      <Navbar
        style={{ backgroundColor: '#212121', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', position: 'sticky', top: 0, zIndex: 1050 }}
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

            <Form
              className="d-flex mb-3 mb-lg-0 navbar-search-form"
              style={{ maxWidth: '400px', width: '100%' }}
              onSubmit={(e) => {
                e.preventDefault();
                if (localSearch.trim()) {
                  setSearchQuery(localSearch);
                  navigate(`/catalog?q=${encodeURIComponent(localSearch)}`);
                }
              }}
            >
              <InputGroup>
                <InputGroup.Text
                  style={{
                    backgroundColor: '#333',
                    border: '1px solid #555',
                    color: '#FFD700',
                    borderRight: 'none'
                  }}
                >
                  <Search size={18} />
                </InputGroup.Text>
                <FormControl
                  type="search"
                  placeholder="Search here.."
                  aria-label="Search"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  style={{
                    backgroundColor: '#333',
                    border: '1px solid #555',
                    borderLeft: 'none',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                  className="navbar-search-input"
                />

              </InputGroup>
            </Form>

            <Nav className="d-flex align-items-center gap-3">
              <Nav.Link
                className="text-white"
                onClick={(e) => {
                  e.preventDefault();
                  navigateOrLogin('/cart');
                }}
              >
                {user ? (
                  <Badge dot={cartCount > 0} offset={[10, -5]}>
                    <ShoppingCart color="white" />
                  </Badge>
                ) : (
                  <ShoppingCart color="white" />
                )}
              </Nav.Link>

              <Nav.Link
                className="text-white"
                onClick={(e) => {
                  e.preventDefault();
                  navigateOrLogin('/history');
                }}
              >
                {user ? (
                  <Badge dot={historyCount > 0} offset={[10, -5]}>
                    <Clock color="white" />
                  </Badge>
                ) : (
                  <Clock color="white" />
                )}
              </Nav.Link>

              <Nav.Link
                className="text-white"
                onClick={(e) => {
                  e.preventDefault();
                  navigateOrLogin('/wishlist');
                }}
              >
                {user ? (
                  <Badge dot={favoriteCount > 0} offset={[10, -5]}>
                    <Heart color="white" />
                  </Badge>
                ) : (
                  <Heart color="white" />
                )}
              </Nav.Link>

              {user ? (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: '1',
                        label: <NavLink to="/account">Account</NavLink>
                      },
                      {
                        key: '2',
                        label: <NavLink to="/address-book">Address Book</NavLink>
                      },
                      // {
                      //   key: '3',
                      //   label: <NavLink to="/complaint">Pengaduan</NavLink>
                      // },
                      {
                        key: '4',
                        label: <span onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>Logout</span>
                      }
                    ]
                  }}
                  trigger={['click']}
                >
                  <a className="text-white ms-auto" onClick={(e) => e.preventDefault()}>
                    <Space>
                      {user.profilePhoto ? (
                        <img
                          src={user.profilePhoto}
                          alt="Profile"
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid #FFD700',
                          }}
                        />
                      ) : (
                        <AccountCircleIcon style={{ color: 'white', fontSize: '30px' }} />
                      )}
                      <span className="ms-2" style={{ color: 'white' }}>
                        {user.username}
                      </span>
                    </Space>
                  </a>
                </Dropdown>
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

    {/* Logout Confirmation Modal */}
    <Modal
      show={showLogoutModal}
      onHide={handleLogoutCancel}
      centered
      backdrop="static"
      keyboard={false}
    >
      <div style={{
        backgroundColor: '#383838',
        borderRadius: '15px',
        border: 'none'
      }}>


        <Modal.Body style={{
          borderRadius: '6px 6px 0 0',
          backgroundColor: '#2a2a2a',
          color: '#fff',
          fontFamily: 'Poppins, sans-serif',
          padding: '30px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h5 style={{
              fontSize: '16px',
              marginBottom: '10px',
              fontWeight: '500'
            }}>
              Apakah Anda yakin ingin keluar?
            </h5>
            <p style={{
              fontSize: '14px',
              color: '#ccc',
              margin: '0'
            }}>
              Anda akan diarahkan ke halaman utama dan perlu login kembali untuk mengakses akun Anda.
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer style={{
          backgroundColor: '#2a2a2a',
          borderTop: '1px solid #444',
          borderRadius: '0 0 6px 6px',
          padding: '20px 30px',
          display: 'flex',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <Button2
          label="Batal"
            onClick={handleLogoutCancel}
            style={{
              minWidth: '100px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#FFD700';
              e.target.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#FFD700';
            }}
          >
            Batal
          </Button2>
          <Button1
          label="Ya, Keluar"
            onClick={handleLogoutConfirm}
            style={{
              minWidth: '100px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#c82333';
              e.target.style.borderColor = '#c82333';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#dc3545';
              e.target.style.borderColor = '#dc3545';
            }}
          >
            Ya, Keluar
          </Button1>
        </Modal.Footer>
      </div>
    </Modal>
    </>
  );
};

export default NavigationBar;
