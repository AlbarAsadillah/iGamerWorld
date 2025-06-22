import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Untuk navigasi
import Button1 from '../../../components/Button';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

// Data dummy email dan password
const users = [
    {
        email: 'albar@gmail.com',
        password: '123',
        username: 'Albar As'
    },
    {
        email: 'user2@example.com',
        password: 'password456',
        username: 'User Two'
    },
    {
        email: 'user3@example.com',
        password: 'password789',
        username: 'User Three'
    },
];

const Login = () => {
    const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility
    const [email, setEmail] = useState(''); // State untuk email
    const [password, setPassword] = useState(''); // State untuk password
    const [loginFailed, setLoginFailed] = useState(false); // State untuk menampilkan pesan gagal login
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // Menghindari refresh halaman saat submit form

        // Cek apakah email dan password cocok dengan data pengguna
        const user = users.find((user) => user.email === email && user.password === password);

        if (user) {
            // Simpan data pengguna di localStorage
            localStorage.setItem('user', JSON.stringify(user));
            setLoginFailed(false); // Reset status gagal login
            window.location.href = '/'; // Redirect ke halaman utama setelah login berhasil
        } else {
            setLoginFailed(true); // Jika email atau password salah
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container style={{ maxWidth: '800px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
                <Row>
                    <Col xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src="/images/login2.png" alt="Login" style={{ maxWidth: '100%', height: '100%', borderRadius: '10px' }} />
                    </Col>
                    <Col xs={12} md={6} style={{ padding: '30px', backgroundColor: '#212121', borderRadius:'10px', borderColor:'#858585' }}>
                        <h2 className="text-center mb-4" style={{ fontWeight: 'semibold', color: '#ffffff' }}>Login</h2>
                        <Form>
                            <Form.Group className="mb-3" style={{ textAlign: 'left' }}>
                                <Form.Label style={{ fontWeight: 'medium', color: '#fff' }}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="type your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ borderRadius: '5px' }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ textAlign: 'left' }}>
                                <Form.Label style={{ fontWeight: 'medium', color: '#fff' }}>Password</Form.Label>
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

                            <div className="d-flex justify-content-end mb-3">
                                <a
                                    href="/forgot-password"
                                    style={{
                                        color: '#FFD700',
                                        textDecoration: 'none',
                                        fontSize: '14px'
                                    }}
                                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                >
                                    Lupa Password?
                                </a>
                            </div>

                            <Button1
                                label="Login"
                                onClick={handleLogin}
                                style={{ width: '100%' }}
                            />
                        </Form>

                        {loginFailed && (
                            <p className="text-danger text-center mt-3">Email atau password salah!</p>
                        )}

                        <p className="text-center mt-3" style={{ color: '#ffffff' }}>
                            Don't have account? <a href="/Register" style={{ color: '#FFD700', fontWeight: 'light' }}>Click here!</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
