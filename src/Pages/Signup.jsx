import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { Spinner } from 'react-bootstrap';

export default function Signup() {
    const { signUpWithPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    
    const onSubmit = async (e) => {
        e.preventDefault();
        setErr(''); setMsg('');
        setLoading(true);
        if (password !== confirmPassword) {
            setLoading(false);
            setErr('Passwords do not match.');
            return;
        }
        const { error } = await signUpWithPassword(email, password);
        setLoading(false);
        if (error) setErr(error.message);
        else setMsg('Account created Successfully!');
        navigate('/');
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Sign up</h2>
            <form className="signup-form" onSubmit={onSubmit}>
                <input
                    className="signup-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="signup-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    className="signup-input"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {err && <p className="signup-error">{err}</p>}
                {msg && <p className="signup-success">{msg}</p>}
                <button className="signup-button">
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
                            Creating...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>
            <p className="signup-link">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
    );
}