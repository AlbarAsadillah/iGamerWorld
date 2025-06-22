import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalWishlist = ({
  show,
  onHide,
  product,
  isInWishlist
}) => {
  if (!product) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="sm"
      backdrop={true}
      className="wishlist-modal"
    >

      <Modal.Body
        style={{
          backgroundColor: '#212121',
          color: '#fff',
          padding: '40px 30px',
          textAlign: 'center',
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={onHide}
      >
        {/* Product Image */}
        <div style={{ marginBottom: '25px' }}>
          <img
            src={product.image || product.images?.[0]}
            alt={product.name}
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '12px',
              border: '3px solid #FFD700',
              animation: 'zoomIn 0.5s ease-out'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150?text=No+Image';
            }}
          />
        </div>

        {/* Success Message */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '15px',
          }}>
          </div>

          <h4 style={{
            color: '#FFD700',
            marginBottom: '10px',
            fontWeight: 'bold',
            fontSize: '20px'
          }}>
            {isInWishlist ? 'Ditambahkan Wishlist!' : 'Dihapus ke Wishlist!'}
          </h4>

          <p style={{
            color: '#fff',
            fontSize: '16px',
            marginBottom: '20px',
            opacity: 0.9
          }}>
            {product.name}
          </p>

          <p style={{
            color: '#ccc',
            fontSize: '12px',
            margin: 0,
            opacity: 0.7,
            fontStyle: 'italic'
          }}>
            Klik untuk menutup
          </p>
        </div>
      </Modal.Body>



      {/* Custom CSS for animations */}
      <style>{`
        .wishlist-modal .modal-content {
          animation: modalSlideIn 0.4s ease-out;
          border: none;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
          border-radius: 15px;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes heartBeat {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }

        .wishlist-modal .modal-backdrop {
          background-color: rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </Modal>
  );
};

export default ModalWishlist;
