import React, { useState } from 'react';

const WhatsAppChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const phoneNumber = "628123456789"; // Ganti dengan nomor WA kamu

  const handleSend = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#25D366',
          color: 'white',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '30px',
          border: 'none',
          zIndex: 999
        }}
      >💬</button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '300px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          padding: '10px',
          zIndex: 999
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Chat dengan kami via WhatsApp</p>
          <textarea 
            rows={3}
            placeholder="Tulis pesan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: '100%', marginTop: '8px' }}
          />
          <button 
            onClick={handleSend}
            style={{
              marginTop: '8px',
              width: '100%',
              backgroundColor: '#25D366',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '5px'
            }}
          >
            Kirim ke WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChatBox;
