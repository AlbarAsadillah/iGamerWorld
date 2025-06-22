import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Image, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ModalInvoice from '../../components/ModalInvoice';
import Button1 from '../../components/Button';
import { ArrowLeft } from 'lucide-react';

const customPcDataDummy = {
  CP001: {
    id: 'CP001',
    createdAt: '2025-05-01T10:30:00',
    status: 'diproses',
    shippingMethod: 'JNE - Reguler',
    subtotal: 12000000,
    shippingCost: 20000,
    total: 12020000,
    items: [
      {
        id: 'CP001-1',
        name: 'Custom PC Ryzen 5',
        price: 12000000,
        quantity: 1,
        image: 'https://via.placeholder.com/64?text=Ryzen5',
      },
    ],
    resi: '',
  },
  CP002: {
    id: 'CP002',
    createdAt: '2025-05-03T12:00:00',
    status: 'diproses',
    shippingMethod: 'J&T - Reguler',
    subtotal: 15000000,
    shippingCost: 25000,
    total: 15025000,
    items: [
      {
        id: 'CP002-1',
        name: 'Custom PC Intel i7',
        price: 15000000,
        quantity: 1,
        image: 'https://via.placeholder.com/64?text=IntelI7',
      },
    ],
    resi: '',
  },
};

const OrderDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(state?.order || null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedPaymentProof, setSelectedPaymentProof] = useState(null);
  const [selectedShippingProof, setSelectedShippingProof] = useState(null);

  useEffect(() => {
    if (!order && state?.orderId) {
      const dummyOrder = customPcDataDummy[state.orderId];
      if (dummyOrder) {
        setOrder(dummyOrder);
      }
    }
  }, [state, order]);

  const handleViewMedia = () => {
    // Cek di transactionHistory untuk bukti bayar dan bukti pengiriman
    const localOrders = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const localOrder = localOrders.find((o) => String(o.id) === String(order.id));

    // Jika tidak ada di transactionHistory, cek di customPcHistory
    if (!localOrder || (!localOrder.paymentProof && !localOrder.shippingProof)) {
      const customPcHistory = JSON.parse(localStorage.getItem('customPcHistory')) || [];
      const customPcOrder = customPcHistory.find((o) => String(o.id) === String(order.id));

      if (customPcOrder && (customPcOrder.paymentProof || customPcOrder.shippingProof)) {
        setSelectedPaymentProof(customPcOrder.paymentProof);
        setSelectedShippingProof(customPcOrder.shippingProof);
        setShowMediaModal(true);
      }
    } else {
      setSelectedPaymentProof(localOrder.paymentProof);
      setSelectedShippingProof(localOrder.shippingProof);
      setShowMediaModal(true);
    }
  };

  const hasMedia = () => {
    // Cek apakah ada bukti bayar atau bukti pengiriman
    const localOrders = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const localOrder = localOrders.find((o) => String(o.id) === String(order.id));

    if (localOrder && (localOrder.paymentProof || localOrder.shippingProof)) {
      return true;
    }

    const customPcHistory = JSON.parse(localStorage.getItem('customPcHistory')) || [];
    const customPcOrder = customPcHistory.find((o) => String(o.id) === String(order.id));

    return customPcOrder && (customPcOrder.paymentProof || customPcOrder.shippingProof);
  };

  if (!order) {
    return (
      <Container
        className="py-5"
        style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', textAlign: 'left' }}
      >
        <h4>Order tidak ditemukan.</h4>
      </Container>
    );
  }

  return (
    <Container
      className="py-5"
      style={{
        minHeight: '100vh',
        backgroundColor: '#212121',
        color: '#fff',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        marginTop: '20px',
        textAlign: 'left',
        padding: '70px',
      }}
    >
      {/* Tombol Kembali di bagian atas */}
      <div className="d-flex align-items-center mb-4">
        <Button
          variant="link"
          onClick={() => navigate(-1)}
          style={{ color: '#FFD700', textDecoration: 'none', padding: '0', marginRight: '15px' }}
        >
          <ArrowLeft size={24} />
        </Button>
        <h5 style={{ color: '#FFD700', margin: 0, fontWeight: '600' }}>
          Kembali
        </h5>
      </div>

      <h2 className="mb-4 text-start" style={{ textAlign: 'left' }}>
        Detail Pesanan
      </h2>
      <Row>
        {/* Left Column: Order Info + Back Button */}
        <Col
          xs={12}
          md={4}
          style={{
            paddingRight: '30px',
            borderRight: '1px solid #444',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'left',
          }}
        >
          <div>
            <Card
              style={{
                backgroundColor: '#333',
                borderRadius: '10px',
                padding: '20px',
                color: '#fff',
                textAlign: 'left',
              }}
            >
              <h5 className="mb-3" style={{ color: '#FFD700', textAlign: 'left' }}>
                Informasi Order
              </h5>
              <p>
                <b>Order Id:</b>
                <br />
                <span
                  onClick={() => setShowInvoiceModal(true)}
                  style={{ color: '#FFD700', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {order.id}
                </span>
              </p>
              <p>
                <b>Tanggal Pemesanan:</b>
                <br />
                {new Date(order.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p>
                <b>Metode Pengiriman:</b>
                <br />
                {order.shippingMethod || '-'}
              </p>
              <p>
                <b>Subtotal Harga Barang:</b>
                <br />
                Rp {order.subtotal.toLocaleString('id-ID')}
              </p>
              <p>
                <b>Ongkos Kirim:</b>
                <br />
                Rp {order.shippingCost.toLocaleString('id-ID')}
              </p>
              <p>
                <b>Total Belanja:</b>
                <br />
                Rp {order.total.toLocaleString('id-ID')}
              </p>
              <p>
                <b>Status:</b>
                <br />
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </p>

              {order.resi && order.resi.trim() !== '' && (
                <p>
                  <b>No. Resi:</b>
                  <br />
                  {order.resi}
                </p>
              )}

              {hasMedia() && (
                <p>
                  <b>Media:</b>
                  <br />
                  <span
                    onClick={handleViewMedia}
                    style={{
                      color: '#FFD700',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '14px'
                    }}
                  >
                    Lihat Bukti Bayar & Pengiriman
                  </span>
                </p>
              )}
            </Card>
          </div>
        </Col>

        {/* Right Column: Product List */}
        <Col xs={12} md={8} style={{ paddingLeft: '30px', textAlign: 'left' }}>
          <div
            style={{
              border: '1px solid #555',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#222',
              color: '#fff',
              textAlign: 'left',
            }}
          >
            {order.items.map((item) => {
              // Cek apakah sudah ada review untuk produk ini pada order ini
              const reviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
              const existingReview = reviews.find(r => r.orderId === order.id && r.productId === item.id);
              return (
                <div
                  key={item.id || item.name}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '24px',
                    textAlign: 'left',
                    gap: '20px',
                  }}
                >
                  <Image
                    src={item.image || 'https://via.placeholder.com/64'}
                    alt={item.name}
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginRight: '15px',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '14px', marginBottom: '2px' }}>
                      Rp {item.price.toLocaleString('id-ID')}
                    </div>
                    <div style={{ fontSize: '14px' }}>Qty {item.quantity || 1}</div>
                    {/* Review Section */}
                    {order.status === 'selesai' && (
                      <div style={{ marginTop: '10px' }}>
                        {existingReview ? (
                          <div style={{ color: '#FFD700', fontSize: '14px' }}>
                            <b>Sudah direview:</b> <br />
                            <span style={{ color: '#FFD700' }}>{'★'.repeat(existingReview.rating)}{'☆'.repeat(5 - existingReview.rating)}</span>
                            <div style={{ color: '#fff', marginTop: '4px' }}>{existingReview.comment}</div>
                          </div>
                        ) : (
                          <ReviewForm order={order} product={item} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>

      {/* Modal Invoice */}
      <ModalInvoice
        show={showInvoiceModal}
        onHide={() => setShowInvoiceModal(false)}
        invoiceData={order}
        onPayNow={() => {
          setShowInvoiceModal(false);
          // Jika custom PC, arahkan ke PaymentCustom, jika tidak ke Payment biasa
          if (order.type === 'custom-pc') {
            navigate('/paymentcustom', {
              state: {
                selectedItems: order.items,
                totalAmount: order.totalAmount || order.total,
                shippingCost: order.shippingCost || 0,
                shippingMethod: order.shippingMethod,
                isAssembled: order.isAssembled,
                paymentMethod: order.paymentMethod,
                transactionId: order.id,
                transaction: order
              }
            });
          } else {
            navigate('/payment', { state: { order } });
          }
        }}
      />

      {/* Modal Media - Bukti Bayar dan Bukti Pengiriman */}
      <Modal
        show={showMediaModal}
        onHide={() => setShowMediaModal(false)}
        size="lg"
        centered
        style={{ color: '#000' }}
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: '#383838',
            color: '#fff',
            borderBottom: '1px solid #555'
          }}
        >
          <Modal.Title>Media</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: '#383838',
            color: '#fff',
            maxHeight: '70vh',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {selectedPaymentProof && (
              <div>
                <h5 style={{ marginBottom: '10px', color: '#FFD700' }}>Bukti Pembayaran:</h5>
                {selectedPaymentProof.bankName && (
                  <div style={{ marginBottom: '16px', fontSize: '14px' }}>
                    <p><strong>Bank:</strong> {selectedPaymentProof.bankName}</p>
                    <p><strong>Atas Nama:</strong> {selectedPaymentProof.accountName}</p>
                    <p><strong>Nomor Rekening:</strong> {selectedPaymentProof.accountNumber}</p>
                    <p><strong>Waktu Upload:</strong> {new Date(selectedPaymentProof.uploadedAt).toLocaleString('id-ID')}</p>
                  </div>
                )}
                <div style={{ textAlign: 'center' }}>
                  <Image
                    src={selectedPaymentProof.image || selectedPaymentProof}
                    alt="Bukti Pembayaran"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '400px',
                      border: '1px solid #555',
                      borderRadius: '6px'
                    }}
                    fluid
                  />
                </div>
              </div>
            )}

            {selectedShippingProof && (
              <div>
                <h5 style={{ marginBottom: '10px', color: '#FFD700' }}>Bukti Pengiriman:</h5>
                <div style={{ textAlign: 'center' }}>
                  <Image
                    src={selectedShippingProof}
                    alt="Bukti Pengiriman"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '400px',
                      border: '1px solid #555',
                      borderRadius: '6px'
                    }}
                    fluid
                  />
                </div>
              </div>
            )}

            {!selectedPaymentProof && !selectedShippingProof && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <p>Tidak ada media yang tersedia</p>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: '#383838',
            borderTop: '1px solid #555'
          }}
        >
          <Button1
            label="Tutup"
            onClick={() => setShowMediaModal(false)}
            style={{
            }}
          >
            Tutup
          </Button1>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderDetail;

// Tambahkan komponen ReviewForm di bawah komponen utama
function ReviewForm({ order, product }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (starValue) => setRating(starValue);
  const handleStarHover = (starValue) => setHoverRating(starValue);
  const handleStarLeave = () => setHoverRating(0);
  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Sangat Buruk';
      case 2: return 'Buruk';
      case 3: return 'Cukup';
      case 4: return 'Baik';
      case 5: return 'Sangat Baik';
      default: return 'Pilih Rating';
    }
  };
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || rating);
      stars.push(
        <span
          key={i}
          style={{ cursor: 'pointer', color: isFilled ? '#FFD700' : '#666', fontSize: 22 }}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
        >
          ★
        </span>
      );
    }
    return stars;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Silakan berikan rating untuk produk ini');
      return;
    }
    if (comment.trim().length < 10) {
      alert('Komentar minimal 10 karakter');
      return;
    }
    setIsSubmitting(true);
    try {
      const reviewData = {
        id: `REV${Date.now()}`,
        orderId: order.id,
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        rating,
        comment: comment.trim(),
        customerName: order.customerName || 'Customer',
        date: new Date().toISOString(),
        createdAt: new Date().toLocaleDateString('id-ID')
      };
      const existingReviews = JSON.parse(localStorage.getItem('productReviews') || '[]');
      const updatedReviews = [reviewData, ...existingReviews];
      localStorage.setItem('productReviews', JSON.stringify(updatedReviews));
      setRating(0); setComment('');
      window.dispatchEvent(new Event('storage')); // trigger re-render
    } catch (error) {
      alert('Gagal mengirim review. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 8, background: '#292929', borderRadius: 8, padding: 12 }}>
      <div style={{ marginBottom: 6 }}>{renderStars()} <span style={{ marginLeft: 8, color: '#FFD700', fontWeight: 600 }}>{getRatingText(rating)}</span></div>
      <textarea
        rows={2}
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Tulis review... (min 10 karakter)"
        style={{ width: '100%', borderRadius: 6, border: '1px solid #555', background: '#212121', color: '#fff', padding: 8, marginBottom: 6 }}
        maxLength={300}
      />
      <div style={{ textAlign: 'right', fontSize: 12, color: '#888', marginBottom: 6 }}>{comment.length}/300 karakter</div>
      <Button type="submit" size="sm" disabled={isSubmitting || rating === 0 || comment.trim().length < 10} style={{ background: '#FFD700', color: '#212121', border: 'none', fontWeight: 600 }}>
        {isSubmitting ? 'Mengirim...' : 'Kirim Review'}
      </Button>
    </form>
  );
}
