import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';

// Data dummy email dan password
const users = [
    {
        email: 'albar@gmail.com',
        password: '123', // Gunakan password dummy
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
        <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container style={{ maxWidth: '800px', backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
                <Row>
                    <Col xs={12} md={6} style={{ backgroundColor: '#FFD700', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src="/images/login.png" alt="Login" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} />
                    </Col>
                    <Col xs={12} md={6} style={{ padding: '30px' }}>
                        <h2 className="text-center mb-4" style={{ fontWeight: 'semibold', color: '#000' }}>Login</h2>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" style={{ textAlign: 'left' }}>
                                <Form.Label style={{ fontWeight: 'medium', color: '#000' }}>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="type your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ borderRadius: '5px' }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ textAlign: 'left' }}>
                                <Form.Label style={{ fontWeight: 'medium', color: '#000' }}>Password</Form.Label>
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

                            <Button
                                variant="warning"
                                type="submit"
                                className="w-100"
                                style={{
                                    fontWeight: 'bold',
                                    borderRadius: '5px',
                                    color: '#000',
                                }}
                            >
                                Login
                            </Button>
                        </Form>

                        {loginFailed && (
                            <p className="text-danger text-center">Email atau password salah!</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;