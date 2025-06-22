import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button1 from '../../../components/Button';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simulasi pengiriman email reset password
        if (email) {
            setEmailSent(true);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/create-new-password'); // Redirect ke create new password
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
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h2 style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            marginBottom: '8px',
                            fontSize: '22px'
                        }}>
                            Lupa Password?
                        </h2>
                        <p style={{
                            color: '#aaa',
                            fontSize: '13px',
                            margin: 0,
                            lineHeight: '1.4'
                        }}>
                            Masukkan alamat email Anda dan kami akan mengirimkan link untuk reset password
                        </p>
                    </div>

                    {/* Form */}
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label style={{ 
                                fontWeight: '500', 
                                color: '#fff',
                                marginBottom: '8px',
                                display: 'block'
                            }}>
                                Email Address
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Masukkan email Anda"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    backgroundColor: '#444',
                                    border: '1px solid #666',
                                    borderRadius: '6px',
                                    color: '#fff',
                                    padding: '10px 12px',
                                    fontSize: '14px'
                                }}
                            />
                        </Form.Group>

                        <Button1
                            label="Reset Password"
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
            >
                <Modal.Header style={{ 
                    backgroundColor: '#2a2a2a', 
                    borderBottom: '1px solid #333',
                    color: '#fff'
                }}>
                    <Modal.Title style={{ color: '#FFD700' }}>
                        Email Terkirim!
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body style={{ 
                    backgroundColor: '#2a2a2a', 
                    color: '#fff',
                    padding: '25px'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            fontSize: '48px', 
                            marginBottom: '15px',
                            color: '#28a745'
                        }}>

                        </div>
                        
                        <h5 style={{ 
                            color: '#FFD700', 
                            marginBottom: '15px',
                            fontWeight: 'bold'
                        }}>
                            Link Reset Password Terkirim
                        </h5>
                        
                        <p style={{ 
                            color: '#ccc', 
                            fontSize: '14px',
                            lineHeight: '1.5',
                            marginBottom: '15px'
                        }}>
                            Kami telah mengirimkan link reset password ke email:
                        </p>
                        
                        <p style={{ 
                            color: '#FFD700', 
                            fontWeight: 'bold',
                            fontSize: '16px',
                            marginBottom: '15px'
                        }}>
                            {email}
                        </p>
                        
                        <p style={{ 
                            color: '#ccc', 
                            fontSize: '12px',
                            lineHeight: '1.4',
                            margin: 0
                        }}>
                            Silakan cek email Anda dan ikuti instruksi untuk reset password. 
                            Link akan expired dalam 24 jam.
                        </p>
                    </div>
                </Modal.Body>
                
                <Modal.Footer style={{ 
                    backgroundColor: '#2a2a2a', 
                    borderTop: '1px solid #333'
                }}>
                    <Button
                        variant="warning"
                        onClick={handleCloseModal}
                        style={{
                            backgroundColor: '#FFD700',
                            border: 'none',
                            color: '#000',
                            fontWeight: 'bold',
                            padding: '8px 20px'
                        }}
                    >
                        Buat Password Baru
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ForgotPassword;
