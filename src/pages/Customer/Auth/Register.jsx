import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import Button1 from '../../../components/Button';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State untuk toggle confirm password visibility
    const [email, setEmail] = useState(''); // State untuk email
    const [password, setPassword] = useState(''); // State untuk password
    const [confirmPassword, setConfirmPassword] = useState(''); // State untuk confirm password
    const [username, setUsername] = useState(''); // State untuk username
    const [phone, setPhone] = useState(''); // State untuk nomor telepon
    const [showModal, setShowModal] = useState(false); // State untuk modal
    const [registerFailed, setRegisterFailed] = useState(false); // State untuk menampilkan pesan gagal register

    // Fungsi untuk memproses registrasi tanpa validasi
    const handleRegister = (e) => {
        e.preventDefault(); // Menghindari refresh halaman saat submit form

        // Simpan data pengguna baru (untuk pengujian, ini hanya disimulasikan)
        setShowModal(true); // Menampilkan modal "Registrasi Berhasil"
    };

    const handleCloseModal = () => setShowModal(false); // Menutup modal

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container style={{ maxWidth: '1000px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
                <Row>
                    {/* Bagian Kiri: Gambar */}
                    <Col xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            src="/images/login2.png" // Ganti dengan URL gambar Anda
                            alt="register"
                            style={{ maxWidth: '100%', height: '100%', borderRadius: '10px' }} // Gambar dengan sudut membulat
                        />
                    </Col>

                    {/* Bagian Kanan: Form Register */}
                    <Col xs={12} md={6} style={{ padding: '30px', backgroundColor:'#212121', borderRadius:'10px', borderColor:'#858585' }}>
                        <h2 className="text-center mb-4" style={{ fontWeight: 'semibold', color: '#ffffff' }}>Register</h2>
                        <Form>
                            {/* Input Username */}
                            <Form.Group className="mb-3" style={{ textAlign: 'left' }}>
                                <Form.Label style={{ fontWeight: 'medium'}}>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="type your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    style={{ borderRadius: '5px' }}
                                />
                            </Form.Group>

                            {/* Input Email */}
                            <Form.Group className="mb-3" style={{ textAlign: 'left' }}>
                                <Form.Label style={{ fontWeight: 'medium' }}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="type your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ borderRadius: '5px' }}
                                />
                            </Form.Group>

                            {/* Input Phone */}
                            <Form.Group className="mb-3" style={{ textAlign: 'left' }}>
                                <Form.Label style={{ fontWeight: 'medium'}}>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="type your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    style={{ borderRadius: '5px' }}
                                />
                            </Form.Group>

                            {/* Input Password */}
                            <Form.Group className="mb-3" style={{ textAlign: 'left' }}>
                                <Form.Label style={{ fontWeight: 'medium'}}>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="type your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ borderRadius: '5px 0 0 5px' }}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            borderRadius: '0 5px 5px 0',
                                            borderColor: '#ced4da',
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </Button>
                                </InputGroup>
                            </Form.Group>

                            {/* Input Confirm Password */}
                            <Form.Group className="mb-3" style={{ textAlign: 'left' }}>
                                <Form.Label style={{ fontWeight: 'medium'}}>Confirm Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        style={{ borderRadius: '5px 0 0 5px' }}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{
                                            borderRadius: '0 5px 5px 0',
                                            borderColor: '#ced4da',
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </Button>
                                </InputGroup>
                            </Form.Group>

                            {/* Tombol Register */}
                            <Button1
                                label="Register"
                                onClick={handleRegister}
                                style={{width: '100%'}}
                            />
                        </Form>

                        {/* Link ke Login */}
                        <p className="text-center mt-3">
                            Already have an account? <a href="/login" style={{ color: '#FFD700', fontWeight: 'light' }}>Click here!</a>
                        </p>

                        {/* Pesan error jika register gagal */}
                        {registerFailed && (
                            <p className="text-danger text-center">Error registering, please try again!</p>
                        )}
                    </Col>
                </Row>
            </Container>

            {/* Modal untuk menampilkan pesan berhasil */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Registrasi Berhasil</Modal.Title>
                </Modal.Header>
                <Modal.Body>Anda berhasil membuat akun!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleCloseModal}>
                        Go to Dashboard
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Register;
