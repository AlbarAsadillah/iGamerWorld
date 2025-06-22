import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button1 from '../../../components/Button';

const CreateNewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const modalButtonRef = useRef(null);

    // Auto focus pada button modal saat modal muncul
    useEffect(() => {
        if (showModal && modalButtonRef.current) {
            setTimeout(() => {
                modalButtonRef.current.focus();
            }, 100);
        }
    }, [showModal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validasi password
        if (newPassword.length < 6) {
            setPasswordError('Password minimal 6 karakter');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            setPasswordError('Password tidak cocok');
            return;
        }
        
        // Reset error dan show success modal
        setPasswordError('');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login'); // Redirect ke login setelah berhasil
    };

    return (
        <div style={{ 
            backgroundColor: '#1a1a1a', 
            minHeight: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
        }}>
            <Container style={{ 
                maxWidth: '450px', 
                backgroundColor: '#333333', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
                border: '1px solid #444'
            }}>
                <div style={{ padding: '40px 30px' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'left', marginBottom: '25px' }}>
                        <h2 style={{ 
                            color: '#fff', 
                            fontWeight: 'bold',
                            marginBottom: '8px',
                            fontSize: '22px'
                        }}>
                            Buat password Baru
                        </h2>
                        <p style={{ 
                            color: '#aaa', 
                            fontSize: '13px',
                            margin: 0,
                            lineHeight: '1.4'
                        }}>
                            Buat password yang kuat untuk menjaga akun tetap aman
                        </p>
                    </div>

                    {/* Form */}
                    <Form>
                        {/* New Password */}
                        <Form.Group className="mb-3">
                            <Form.Label style={{ 
                                fontWeight: '500', 
                                color: '#fff',
                                marginBottom: '8px',
                                display: 'block',
                                fontSize: '14px'
                            }}>
                                New Password
                            </Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="type your password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    style={{
                                        backgroundColor: '#444',
                                        border: '1px solid #666',
                                        borderRadius: '6px 0 0 6px',
                                        color: '#fff',
                                        padding: '10px 12px',
                                        fontSize: '14px'
                                    }}
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    style={{
                                        borderRadius: '0 6px 6px 0',
                                        borderColor: '#666',
                                        backgroundColor: '#444',
                                        color: '#aaa',
                                        border: '1px solid #666',
                                        borderLeft: 'none'
                                    }}
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        {/* Confirm New Password */}
                        <Form.Group className="mb-4">
                            <Form.Label style={{ 
                                fontWeight: '500', 
                                color: '#fff',
                                marginBottom: '8px',
                                display: 'block',
                                fontSize: '14px'
                            }}>
                                Confirm New Password
                            </Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="type your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    style={{
                                        backgroundColor: '#444',
                                        border: '1px solid #666',
                                        borderRadius: '6px 0 0 6px',
                                        color: '#fff',
                                        padding: '10px 12px',
                                        fontSize: '14px'
                                    }}
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        borderRadius: '0 6px 6px 0',
                                        borderColor: '#666',
                                        backgroundColor: '#444',
                                        color: '#aaa',
                                        border: '1px solid #666',
                                        borderLeft: 'none'
                                    }}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        {/* Error Message */}
                        {passwordError && (
                            <div style={{ 
                                color: '#ff6b6b', 
                                fontSize: '13px', 
                                marginBottom: '15px',
                                textAlign: 'center'
                            }}>
                                {passwordError}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button1
                            label="Create New Password"
                            onClick={handleSubmit}
                            style={{ marginBottom: '20px' }}
                        />
                    </Form>

                    {/* Back to Login */}
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: '#ccc', fontSize: '14px', margin: 0 }}>
                            Ingat password Anda?{' '}
                            <a 
                                href="/login" 
                                style={{ 
                                    color: '#FFD700', 
                                    textDecoration: 'none',
                                    fontWeight: '500'
                                }}
                                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                            >
                                Kembali ke Login
                            </a>
                        </p>
                    </div>
                </div>
            </Container>

            {/* Success Modal */}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                backdrop="static"
                size="sm"
                className="success-modal"
            >
                <Modal.Header style={{
                    backgroundColor: '#333333',
                    borderBottom: '1px solid #444',
                    color: '#fff',
                    border: 'none'
                }}>
                    <Modal.Title style={{
                        color: '#FFD700',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        Password telah diperbarui
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body style={{
                    backgroundColor: '#333333',
                    color: '#fff',
                    padding: '40px 30px',
                    textAlign: 'center',
                    border: 'none'
                }}>
                    <div style={{ marginBottom: '25px' }}>

                        <p style={{
                            color: '#fff',
                            fontSize: '16px',
                            lineHeight: '1.5',
                            margin: 0,
                            fontWeight: '400'
                        }}>
                            Password Anda telah berhasil diperbarui. Silakan masuk dengan password baru Anda.
                        </p>
                    </div>
                </Modal.Body>
                
                <Modal.Footer style={{
                    backgroundColor: '#333333',
                    borderTop: 'none',
                    justifyContent: 'center',
                    padding: '0 30px 30px 30px'
                }}>
                    <Button
                        ref={modalButtonRef}
                        variant="warning"
                        onClick={handleCloseModal}
                        style={{
                            backgroundColor: '#FFD700',
                            border: 'none',
                            color: '#000',
                            fontWeight: 'bold',
                            padding: '12px 40px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            minWidth: '200px'
                        }}
                    >
                        Masuk ke Halaman Login
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Custom CSS for animations */}
            <style>{`
                .success-modal .modal-content {
                    animation: modalSlideIn 0.4s ease-out;
                    border: none;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
                    border-radius: 12px;
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

                .success-modal .modal-backdrop {
                    background-color: rgba(0, 0, 0, 0.8);
                }

                .success-modal .btn:hover {
                    transform: translateY(-2px);
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
                }
            `}</style>
        </div>
    );
};

export default CreateNewPassword;
