import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Button1 from './Button';

const ModalCancelOrder = ({ show, onHide, onConfirm, orderData }) => {
  const [cancelReason, setCancelReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const cancelReasons = [
    'Berubah pikiran',
    'Masalah pembayaran',
    'Lainnya'
  ];

  const handleConfirm = () => {
    const finalReason = cancelReason === 'Lainnya' ? otherReason : cancelReason;
    
    if (!finalReason.trim()) {
      alert('Silakan pilih atau masukkan alasan pembatalan');
      return;
    }

    onConfirm(finalReason);
    handleClose();
  };

  const handleClose = () => {
    setCancelReason('');
    setOtherReason('');
    onHide();
  };

  if (!orderData) return null;

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      centered
      size="md"
      backdrop="static"
    >
      <Modal.Header 
        style={{ 
          backgroundColor: '#1a1a1a', 
          borderBottom: '1px solid #333',
          color: '#fff'
        }}
      >
        <Modal.Title style={{ color: '#FFD700', fontWeight: 'bold' }}>
          Batalkan Pesanan
        </Modal.Title>
      </Modal.Header>

      <Modal.Body 
        style={{ 
          backgroundColor: '#212121', 
          color: '#fff',
          padding: '25px'
        }}
      >
        {/* Order Info */}
        <div style={{ 
          backgroundColor: '#333', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '1px solid #444'
        }}>
          <h6 style={{ color: '#FFD700', marginBottom: '10px' }}>Detail Pesanan:</h6>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>Order ID:</strong> {orderData.id}
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>Total:</strong> Rp {(orderData.total || orderData.totalAmount || 0).toLocaleString('id-ID')}
          </p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>
            <strong>Status:</strong> {orderData.status}
          </p>
        </div>

        {/* Warning */}
        <div style={{ 
          backgroundColor: '#dc3545', 
          padding: '12px', 
          borderRadius: '6px', 
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          <strong>Peringatan:</strong> Pesanan yang sudah dibatalkan tidak dapat dikembalikan. 
          Pastikan keputusan Anda sudah tepat.
        </div>

        {/* Cancel Reason */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '10px', 
            fontWeight: 'bold',
            color: '#FFD700'
          }}>
            Alasan Pembatalan: <span style={{ color: '#dc3545' }}>*</span>
          </label>
          
          {cancelReasons.map((reason, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <input
                  type="radio"
                  name="cancelReason"
                  value={reason}
                  checked={cancelReason === reason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                {reason}
              </label>
            </div>
          ))}
        </div>

        {/* Other Reason Input */}
        {cancelReason === 'Lainnya' && (
          <div style={{ marginBottom: '20px' }}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Masukkan alasan lainnya..."
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              style={{
                backgroundColor: '#333',
                border: '1px solid #555',
                color: '#fff',
                borderRadius: '6px'
              }}
            />
          </div>
        )}

        {/* Confirmation */}
        <div style={{ 
          backgroundColor: '#333', 
          padding: '12px', 
          borderRadius: '6px',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          Apakah Anda yakin ingin membatalkan pesanan ini?
        </div>
      </Modal.Body>

      <Modal.Footer 
        style={{ 
          backgroundColor: '#1a1a1a', 
          borderTop: '1px solid #333',
          display: 'flex',
          gap: '10px'
        }}
      >
        <Button1
          label="Batal"
          onClick={handleClose}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            borderColor: '#6c757d',
            color: '#6c757d'
          }}
        />
        <Button1
          label="Ya, Batalkan Pesanan"
          onClick={handleConfirm}
          style={{
            flex: 1,
            backgroundColor: '#dc3545',
            borderColor: '#dc3545',
            marginLeft: '10px'
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCancelOrder;
