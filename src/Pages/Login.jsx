import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import useWindowScrollToTop from '../Hooks/useWindowScrollToTop';

const Login = () => {
    const { signInWithPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useWindowScrollToTop();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const { error } = await signInWithPassword(email, password);
        setLoading(false);
        if (error) setError(error.message);
        else navigate(from, { replace: true });
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <form className="signup-form" onSubmit={onSubmit}>
                <input
                    className="login-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="login-button">
                    {loading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Logging in...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
            <p>No account? <Link to="/signup">Sign up</Link></p>

        </div>
    );
};

export default Login;