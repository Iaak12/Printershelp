import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { email, password } = formData;

    const from = location.state?.from?.pathname || '/admin/dashboard';

    useEffect(() => {
        if (authService.isAuthenticated()) {
            navigate(from, { replace: true });
        }
    }, [navigate, from]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            const res = await authService.login(email, password);
            if (res.success) {
                if (res.data.role !== 'admin') {
                    setError('Access denied. Admin privileges required.');
                    authService.logout();
                } else {
                    navigate(from, { replace: true });
                }
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || err.message || 'Login failed - Check console for details');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Admin Login</h2>
                {error && <div className="alert-error">{error}</div>}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-login">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
