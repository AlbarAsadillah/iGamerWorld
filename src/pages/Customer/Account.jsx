import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Account = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Ambil data pengguna dari localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
    }
  }, []);

  const handleEditProfile = () => {
    alert('Edit Profile clicked!');
  };

  if (!userData) {
    return <div>Loading...</div>; // Menampilkan loading jika data belum ada
  }

  return (
    <Container className="py-5" style={{ minHeight: '100vh', backgroundColor: '#212121', color: '#fff', borderRadius: '10px' }}>
      <h2 className="mb-4 text-start">Informasi Akun</h2>
      <Row>
        {/* Sidebar Profil */}
        <Col xs={12} md={4} className="d-flex flex-column align-items-center">
          <div
            style={{
              backgroundColor: '#333', // Background color untuk side profile
              borderRadius: '10px',
              padding: '20px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: '3px solid #FFD700', // Tambahkan border warna kuning
              }}
            >
              <span style={{ fontSize: '50px', color: '#fff' }}>👤</span>
            </div>
            <h5 style={{ color: '#FFD700', fontWeight: 'bold' }}>{userData.username.split(' ')[0]}</h5>
          </div>
        </Col>

        {/* Informasi Pribadi */}
        <Col xs={12} md={8}>
          <div
            style={{
              backgroundColor: '#333',
              borderRadius: '10px',
              padding: '20px',
              position: 'relative',
            }}
          >
            <h4>Informasi Pribadi</h4>
            <hr style={{ border: '1px solid #444' }} />
            <Row>
              <Col xs={12} md={6}>
                <p>
                  <strong>Nama Lengkap:</strong> {userData.username}
                </p>
                <p>
                  <strong>Nomor Telepon:</strong> {userData.phone || 'N/A'}
                </p>
              </Col>
              <Col xs={12} md={6}>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Tanggal Bergabung:</strong> {userData.joinDate || 'N/A'}
                </p>
              </Col>
            </Row>

            {/* Tombol Edit Profil */}
            <Button
              variant="warning"
              onClick={handleEditProfile}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontWeight: 'bold',
              }}
            >
              Edit Profile
            </Button>

            {/* Alamat Utama */}
            <div
              style={{
                backgroundColor: '#212121',
                border: '1px solid #FFD700',
                borderRadius: '10px',
                padding: '15px',
                marginTop: '20px',
              }}
            >
              <p style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '10px' }}>Alamat Utama</p>
              <p style={{ marginBottom: '5px' }}>{userData.address?.name || 'N/A'}</p>
              <p style={{ marginBottom: '5px' }}>{userData.address?.phone || 'N/A'}</p>
              <p>{userData.address?.details || 'N/A'}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;