import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    TechSupport
                </Link>

                <button className="navbar-toggle" onClick={toggleMobileMenu}>
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <ul className="navbar-menu">
                    <li>
                        <Link to="/" className="navbar-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/ask-question" className="navbar-link">
                            Ask a Question
                        </Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/admin/dashboard" className="navbar-link">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="navbar-btn">
                                    Logout ({user?.name})
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/admin/login" className="navbar-btn">
                                Admin Login
                            </Link>
                        </li>
                    )}
                </ul>

                {mobileMenuOpen && (
                    <div className="navbar-mobile">
                        <Link to="/" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                            Home
                        </Link>
                        <Link to="/ask-question" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                            Ask a Question
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/admin/dashboard" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="navbar-btn">
                                    Logout ({user?.name})
                                </button>
                            </>
                        ) : (
                            <Link to="/admin/login" className="navbar-btn" onClick={() => setMobileMenuOpen(false)}>
                                Admin Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
