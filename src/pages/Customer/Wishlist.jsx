import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Modal, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { useWishlist } from '../../context/WishlistContext';
import Button1 from '../../components/Button';
import Button2 from '../../components/Button2';

const Favorite = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleShowDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      removeFromWishlist(productToDelete.id);
    }
    handleCloseDeleteModal();
  };

  // Filter wishlist berdasarkan search query
  const filteredWishlist = useMemo(() => {
    if (!searchQuery.trim()) {
      return wishlist;
    }

    return wishlist.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [wishlist, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container
      className="py-5"
      style={{
        minHeight: '100vh',
        // backgroundColor: '#212121',
        color: '#fff',
        borderRadius: '10px',
        marginTop: '20px',
        marginBottom: '20px',
        // padding: '70px',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-start">Produk Favorit</h2>
        <div className="search-container" style={{ width: '300px' }}>
          <InputGroup>
            <InputGroup.Text
              style={{
                backgroundColor: '#333',
                border: '1px solid #555',
                color: '#FFD700'
              }}
            >
              <Search size={18} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Cari produk favorit..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                backgroundColor: '#333',
                border: '1px solid #555',
                color: '#fff',
                fontSize: '14px'
              }}
              className="search-input"
            />
          </InputGroup>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h4 style={{ color: '#FFD700', marginBottom: '10px' }}>Belum ada produk favorit</h4>
          <p style={{ color: '#ccc', fontSize: '16px' }}>
            Tambahkan produk ke wishlist untuk melihatnya di sini
          </p>
        </div>
      ) : filteredWishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h4 style={{ color: '#FFD700', marginBottom: '10px' }}>Produk tidak ditemukan</h4>
          <p style={{ color: '#ccc', fontSize: '16px' }}>
            Coba gunakan kata kunci yang berbeda
          </p>
        </div>
      ) : (
        <>
          <Row>
            {filteredWishlist.map((product) => (
              <Col xs={12} md={6} lg={3} key={product.id} className="mb-4">
                <ProductCard
                  id={product.id}
                  image={product.image || product.images?.[0]}
                  name={product.name}
                  price={`Rp ${product.price.toLocaleString('id-ID')}`}
                  textColor="#fff"
                  onDelete={() => handleShowDeleteModal(product)}
                />
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Modal Konfirmasi Hapus dengan warna gelap */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        centered
        contentClassName="bg-dark text-white"
      >
        <Modal.Header closeButton closeVariant="black">
          <Modal.Title>Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus produk{' '}
          <strong>{productToDelete?.name}</strong> dari daftar favorit?
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center', gap: '20px' }}>
          <Button2
          label= "Batal"
            onClick={handleCloseDeleteModal}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Batal
          </Button2>
          <Button1
          label= "Hapus"
            onClick={handleConfirmDelete}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Hapus
          </Button1>
        </Modal.Footer>
      </Modal>

      {/* Tambahkan style custom */}
      <style>{`
        .bg-dark {
          background-color: #121212 !important;
          color: white !important;
        }
        .btn-secondary {
          background-color: #333;
          border-color: #444;
          color: #fff;
        }
        .btn-secondary:hover {
          background-color: #444;
          border-color: #555;
          color: #fff;
        }
        .btn-danger {
          background-color: #ff4444;
          border-color: #ff4444;
          color: #fff;
        }
        .btn-danger:hover {
          background-color: #ff2222;
          border-color: #ff2222;
          color: #fff;
        }

        /* Search Input Styling */
        .search-input:focus {
          background-color: #444 !important;
          border-color: #FFD700 !important;
          color: #fff !important;
          box-shadow: 0 0 0 0.2rem rgba(255, 215, 0, 0.25) !important;
        }

        .search-input::placeholder {
          color: #aaa !important;
        }

        .input-group-text {
          border-right: none !important;
        }

        .search-input {
          border-left: none !important;
        }

        .search-input:focus + .input-group-text,
        .input-group-text:focus-within {
          border-color: #FFD700 !important;
          background-color: #444 !important;
        }

        /* Responsive search bar */
        @media (max-width: 768px) {
          .d-flex.justify-content-between {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px;
          }

          .search-container {
            width: 100% !important;
          }
        }
      `}</style>
    </Container>
  );
};

export default Favorite;
