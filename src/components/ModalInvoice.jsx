import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Button1 from './Button'; 
import Button2 from './Button2'; 

const ModalInvoice = ({ show, onHide, invoiceData, onPayNow }) => {
  if (!invoiceData) return null;

  const {
    id,
    customerName,
    customerAddress,
    orderDate,
    shippingMethod,
    totalAmount,
    items,
    virtualAccount,
  } = invoiceData;

  const labelStyle = {
    color: '#888',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  };

  const valueStyle = {
    color: '#eee',
    fontWeight: '600',
    fontSize: 15,
    wordBreak: 'break-word',
  };

  const sectionStyle = {
    marginBottom: 24,
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
  };

  const tableHeaderStyle = {
    display: 'flex',
    backgroundColor: '#222',
    padding: '12px 16px',
    fontWeight: '700',
    fontSize: 14,
    color: '#eee',
    borderRadius: '6px 6px 0 0',
  };

  const tableRowStyle = {
    display: 'flex',
    padding: '12px 16px',
    borderBottom: '1px solid #333',
    fontSize: 14,
    color: '#ccc',
    alignItems: 'center',
  };

  const footerStyle = {
    marginTop: 20,
    textAlign: 'right',
    fontWeight: '700',
    fontSize: 20,
    color: '#FFD700',
  };

  // Helper untuk menampilkan harga satuan (handle varian & undefined)
  const getDisplayPrice = (item) => {
    if (item.variant && typeof item.variant.price === 'number') {
      return item.variant.price.toLocaleString('id-ID');
    }
    if (typeof item.price === 'number') {
      return item.price.toLocaleString('id-ID');
    }
    if (item.variants && item.variants.length > 0) {
      const minPrice = Math.min(...item.variants.map(v => v.price));
      return minPrice.toLocaleString('id-ID');
    }
    return '-';
  };

  // Helper untuk subtotal (harga x qty, handle varian)
  const getSubtotal = (item) => {
    if (item.variant && typeof item.variant.price === 'number') {
      return (item.variant.price * (item.quantity || 1)).toLocaleString('id-ID');
    }
    if (typeof item.price === 'number') {
      return (item.price * (item.quantity || 1)).toLocaleString('id-ID');
    }
    if (item.variants && item.variants.length > 0) {
      const minPrice = Math.min(...item.variants.map(v => v.price));
      return (minPrice * (item.quantity || 1)).toLocaleString('id-ID');
    }
    return '-';
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header
        closeButton
        style={{
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #333',
        }}
      >
        <Modal.Title
          className="w-100 text-center fw-semibold fs-5"
          style={{ color: '#FFD700', letterSpacing: '1.5px' }}
        >
          Invoice Pesanan
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#121212', padding: '30px 40px' }}>
        <section style={sectionStyle}>
          <div style={rowStyle}>
            <span style={labelStyle}>Nomor Pesanan:</span>
            <span style={valueStyle}>{id || '-'}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Nama Pelanggan:</span>
            <span style={valueStyle}>{customerName || '-'}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Alamat Pengiriman:</span>
            <span style={valueStyle}>{customerAddress || '-'}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Tanggal Pesan:</span>
            <span style={valueStyle}>{orderDate || '-'}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Metode Pengiriman:</span>
            <span style={valueStyle}>{shippingMethod || '-'}</span>
          </div>
          <div style={rowStyle}>
            <span style={{ ...labelStyle, fontFamily: 'monospace' }}>Virtual Account:</span>
            <span style={{ ...valueStyle, fontFamily: 'monospace' }}>{virtualAccount || '-'}</span>
          </div>
        </section>

        <section>
          <div style={tableHeaderStyle}>
            <div style={{ flex: '0 0 5%', textAlign: 'center' }}>#</div>
            <div style={{ flex: '1 1 50%' }}>Produk</div>
            <div style={{ flex: '0 0 15%', textAlign: 'center' }}>Jumlah</div>
            <div style={{ flex: '0 0 15%', textAlign: 'right' }}>Harga Satuan</div>
            <div style={{ flex: '0 0 15%', textAlign: 'right' }}>Subtotal</div>
          </div>

          {items && items.length > 0 ? (
            items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  ...tableRowStyle,
                  borderBottom: idx === items.length - 1 ? 'none' : '1px solid #333',
                }}
              >
                <div style={{ flex: '0 0 5%', textAlign: 'center' }}>{idx + 1}</div>
                <div style={{ flex: '1 1 50%', wordBreak: 'break-word' }}>{item.name}</div>
                <div style={{ flex: '0 0 15%', textAlign: 'center' }}>{item.quantity || 1}</div>
                <div style={{ flex: '0 0 15%', textAlign: 'right' }}>
                  Rp {getDisplayPrice(item)}
                </div>
                <div style={{ flex: '0 0 15%', textAlign: 'right' }}>
                  Rp {getSubtotal(item)}
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: 20, textAlign: 'center', fontStyle: 'italic', color: '#555' }}>
              Tidak ada item
            </div>
          )}
        </section>

        <div style={footerStyle}>
          Total: Rp {(totalAmount || invoiceData.total || 0).toLocaleString('id-ID')}
        </div>
      </Modal.Body>

      <Modal.Footer
        style={{
          backgroundColor: '#1a1a1a',
          borderTop: '1px solid #333',
          display: 'flex',
          gap: '10px',
        }}
      >
        <Button2
          variant="outline-light"
          onClick={onHide}
          className="fw-semibold"
          style={{ letterSpacing: '1px', flex: 1 }}
        >
          Tutup
        </Button2>
        {onPayNow && (
          <Button1
            variant="warning"
            onClick={onPayNow}
            className="fw-semibold"
            style={{
              letterSpacing: '1px',
              flex: 1,
              backgroundColor: '#FFD700',
              borderColor: '#FFD700',
              color: '#000'
            }}
          >
            Bayar Sekarang
          </Button1>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInvoice;
