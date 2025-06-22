import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import Button1 from '../../components/Button';
import Button2 from '../../components/Button2';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Form states
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    phone: '',
  });

  // Photo states
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);

  // Password states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
      setEditForm({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
      });
      // Load saved profile photo
      if (user.profilePhoto) {
        setProfilePhoto(user.profilePhoto);
      }
    }

    const selectedAddr = localStorage.getItem('selectedAddress');
    if (selectedAddr) {
      setDefaultAddress(JSON.parse(selectedAddr));
    }
  }, []);

  // Profile handlers
  const handleEditProfile = () => setShowEditModal(true);
  const handleCloseModal = () => setShowEditModal(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    if (!editForm.username || !editForm.email) {
      alert('Nama lengkap dan email harus diisi!');
      return;
    }
    const updatedUser = {
      ...userData,
      username: editForm.username,
      email: editForm.email,
      phone: editForm.phone,
    };
    setUserData(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setShowEditModal(false);

    // Trigger event untuk update navbar
    window.dispatchEvent(new CustomEvent('userProfileUpdated'));
  };

  // Photo handlers
  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Ukuran file maksimal 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = e.target.result;
        // Langsung save foto tanpa modal
        const updatedUser = {
          ...userData,
          profilePhoto: photoData,
        };
        setUserData(updatedUser);
        setProfilePhoto(photoData);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Trigger event untuk update navbar
        window.dispatchEvent(new CustomEvent('userProfileUpdated'));
      };
      reader.readAsDataURL(file);
    }
    // Reset input value agar bisa pilih file yang sama lagi
    e.target.value = '';
  };

  const handleRemovePhoto = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus foto profil?')) {
      const updatedUser = {
        ...userData,
        profilePhoto: null,
      };
      setUserData(updatedUser);
      setProfilePhoto(null);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Trigger event untuk update navbar
      window.dispatchEvent(new CustomEvent('userProfileUpdated'));
    }
  };

  // Username edit handlers
  const [showUsernameEdit, setShowUsernameEdit] = useState(false);
  const [tempUsername, setTempUsername] = useState('');

  const handleEditUsername = () => {
    setTempUsername(userData.username);
    setShowUsernameEdit(true);
  };

  const handleSaveUsername = () => {
    if (!tempUsername.trim()) {
      alert('Username tidak boleh kosong');
      return;
    }
    const updatedUser = {
      ...userData,
      username: tempUsername.trim(),
    };
    setUserData(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setShowUsernameEdit(false);

    // Trigger event untuk update navbar
    window.dispatchEvent(new CustomEvent('userProfileUpdated'));
  };

  const handleCancelUsernameEdit = () => {
    setShowUsernameEdit(false);
    setTempUsername('');
  };

  // Password handlers
  const handleEditPassword = () => setShowPasswordModal(true);
  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordError('');
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setPasswordError(''); // Clear error when user types
  };

  const handleSavePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Semua field harus diisi');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password baru minimal 6 karakter');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi password tidak cocok');
      return;
    }

    // In real app, you would verify currentPassword with backend
    // For now, we'll just update the password
    const updatedUser = {
      ...userData,
      password: newPassword, // In real app, this would be hashed
    };

    setUserData(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setShowPasswordModal(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordError('');
    alert('Password berhasil diubah!');
  };

  if (!userData) {
    return (
      <div style={{ color: '#fff', padding: '2rem', textAlign: 'center' }}>
        Loading...
      </div>
    );
  }

  const gradientBackground = {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
    borderRadius: '10px',
    padding: '20px',
  };

  return (
    <div style={{
      // backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        gap: '40px',
        alignItems: 'flex-start'
      }}>
        {/* Kolom Kiri - Profile Photo */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          backgroundColor:'#121212',
          padding: '25px',
          borderRadius: '10px',
          flex: '0 0 300px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
        }}>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoSelect}
            accept="image/*"
            style={{ display: 'none' }}
          />

          {/* Profile Photo - Clickable */}
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              backgroundColor: '#FFD700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <FaUser style={{ fontSize: '60px', color: '#000' }} />
            )}
          </div>

          {/* Username */}
          <div style={{ textAlign: 'center' }}>
            {showUsernameEdit ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  style={{
                    backgroundColor: '#333',
                    border: '1px solid #FFD700',
                    borderRadius: '4px',
                    color: '#fff',
                    padding: '8px 12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '200px',
                  }}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveUsername();
                    if (e.key === 'Escape') handleCancelUsernameEdit();
                  }}
                />
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                  <span
                    onClick={handleSaveUsername}
                    style={{
                      color: '#FFD700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontWeight: '500'
                    }}
                  >
                    Simpan
                  </span>
                  <span
                    onClick={handleCancelUsernameEdit}
                    style={{
                      color: '#FFD700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontWeight: '400'
                    }}
                  >
                    Batal
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  margin: '0 0 8px 0',
                  fontSize: '20px',
                }}>
                  {userData.username}
                </h3>
                <span
                  onClick={handleEditUsername}
                  style={{
                    color: '#FFD700',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontWeight: '400'
                  }}
                >
                  Edit Username
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan - Detail Akun */}
        <div style={{
          flex: 1,
          backgroundColor: '#121212',
          borderRadius: '15px',
          padding: '30px'
        }}>
          {/* Header dengan tombol */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <h2 style={{
              color: '#fff',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0'
            }}>
              Detail Akun
            </h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button2
              label="Ubah Password"
                onClick={handleEditPassword}
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid #FFD700',
                  color: '#FFD700',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.3s ease'
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
                Edit Password
              </Button2>
              <Button1
              label="Edit profil"
                onClick={handleEditProfile}
                style={{
                  backgroundColor: '#FFD700',
                  border: '2px solid #FFD700',
                  color: '#000',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#E6C200';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#FFD700';
                }}
              >
                Edit Profile
              </Button1>
            </div>
          </div>

          {/* Detail Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Nama Lengkap */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 0',
              borderBottom: '1px solid #444'
            }}>
              <span style={{
                color: '#ccc',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Nama Lengkap:
              </span>
              <span style={{
                color: '#fff',
                fontSize: '16px',
                fontWeight: '400'
              }}>
                {userData.username}
              </span>
            </div>

            {/* Email */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 0',
              borderBottom: '1px solid #444'
            }}>
              <span style={{
                color: '#ccc',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Email:
              </span>
              <span style={{
                color: '#fff',
                fontSize: '16px',
                fontWeight: '400'
              }}>
                {userData.email}
              </span>
            </div>

            {/* Nomor Telepon */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 0',
              borderBottom: '1px solid #444'
            }}>
              <span style={{
                color: '#ccc',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Nomor Telepon:
              </span>
              <span style={{
                color: '#fff',
                fontSize: '16px',
                fontWeight: '400'
              }}>
                {userData.phone || '087852056808'}
              </span>
            </div>

            {/* Tanggal Bergabung */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 0',
              borderBottom: '1px solid #444'
            }}>
              <span style={{
                color: '#ccc',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Tanggal Bergabung:
              </span>
              <span style={{
                color: '#fff',
                fontSize: '16px',
                fontWeight: '400'
              }}>
                {userData.joinDate || '28/05/2025'}
              </span>
            </div>
          </div>

          {/* Alamat Utama Section */}
          <div style={{ marginTop: '40px' }}>
            <h4 style={{
              color: '#FFD700',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '20px',
              textAlign: 'left'
            }}>
              Alamat Utama
            </h4>
            <div style={{
              backgroundColor: '#383838',
              padding: '20px',
              borderRadius: '8px',
              color: '#fff',
              textAlign: 'left'
            }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>{userData.username}</strong>
              </div>
              <div style={{ marginBottom: '8px', color: '#ccc' }}>
                {userData.phone || '087852056808'}
              </div>
              <div style={{ color: '#ccc', lineHeight: '1.5' }}>
                {defaultAddress?.address || 'Jl. Amir Mahmud no. 35 Surabaya, Jawa Timur 6049'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        show={showEditModal}
        onHide={handleCloseModal}
        centered
        contentClassName="custom-content"
        style={{ color: '#fff', background: 'transparent', borderRadius: '6px' }}
        backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
            borderRadius: '6px',
            color: '#fff',
            padding: '20px',
            width: '100%',
            maxWidth: 500,
            boxSizing: 'border-box',
          }}
        >
          <h5 style={{ color: '#FFD700', marginBottom: 20 }}>Edit Profil</h5>
          <Form>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editForm.username}
                onChange={handleFormChange}
                placeholder="Masukkan nama lengkap"
                style={{
                  borderRadius: 4,
                  borderColor: '#444',
                  backgroundColor: '#222',
                  color: '#fff',
                }}
                autoFocus
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleFormChange}
                placeholder="Masukkan email"
                style={{
                  borderRadius: 4,
                  borderColor: '#444',
                  backgroundColor: '#222',
                  color: '#fff',
                }}
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editForm.phone}
                onChange={handleFormChange}
                placeholder="Masukkan nomor telepon"
                style={{
                  borderRadius: 4,
                  borderColor: '#444',
                  backgroundColor: '#222',
                  color: '#fff',
                }}
              />
            </Form.Group>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 20,
                marginTop: 20,
              }}
            >
              <Button
              variant='outline-warning'
                onClick={handleCloseModal}
                style={{
                  color: '#FFD700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: '400'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Batal
              </Button>

              <Button
              variant='warning'
                onClick={handleSaveProfile}
                style={{
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Simpan
              </Button>
            </div>
          </Form>
        </div>
      </Modal>



      {/* Password Edit Modal */}
      <Modal
        show={showPasswordModal}
        onHide={handleClosePasswordModal}
        centered
        contentClassName="custom-content"
        style={{ color: '#fff', background: 'transparent', borderRadius: '6px' }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
            borderRadius: '6px',
            color: '#fff',
            padding: '20px',
            width: '100%',
            maxWidth: 500,
            boxSizing: 'border-box',
          }}
        >
          <h5 style={{ color: '#FFD700', marginBottom: 20 }}>Ubah Password</h5>

          <Form>
            {/* Current Password */}
            <Form.Group controlId="formCurrentPassword" className="mb-3">
              <Form.Label>Password Saat Ini</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordFormChange}
                  placeholder="Masukkan password saat ini"
                  style={{
                    borderRadius: '4px 0 0 4px',
                    borderColor: '#444',
                    backgroundColor: '#222',
                    color: '#fff',
                  }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={{
                    borderRadius: '0 4px 4px 0',
                    borderColor: '#444',
                    backgroundColor: '#333',
                    color: '#fff',
                  }}
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* New Password */}
            <Form.Group controlId="formNewPassword" className="mb-3">
              <Form.Label>Password Baru</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordFormChange}
                  placeholder="Masukkan password baru"
                  style={{
                    borderRadius: '4px 0 0 4px',
                    borderColor: '#444',
                    backgroundColor: '#222',
                    color: '#fff',
                  }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    borderRadius: '0 4px 4px 0',
                    borderColor: '#444',
                    backgroundColor: '#333',
                    color: '#fff',
                  }}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Konfirmasi Password Baru</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordFormChange}
                  placeholder="Konfirmasi password baru"
                  style={{
                    borderRadius: '4px 0 0 4px',
                    borderColor: '#444',
                    backgroundColor: '#222',
                    color: '#fff',
                  }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    borderRadius: '0 4px 4px 0',
                    borderColor: '#444',
                    backgroundColor: '#333',
                    color: '#fff',
                  }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Error Message */}
            {passwordError && (
              <div style={{
                color: '#dc3545',
                fontSize: '14px',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                {passwordError}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 20,
                marginTop: 20,
              }}
            >
              <Button
              variant='outline-warning'
                onClick={handleClosePasswordModal}
                style={{
                  color: '#FFD700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: '400'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Batal
              </Button>

              <Button
              variant='warning'
                onClick={handleSavePassword}
                style={{
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Simpan
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Account;
