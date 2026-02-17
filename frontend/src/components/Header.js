import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPrint, FaBars, FaTimes, FaComments } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const goToChat = () => {
        navigate('/chat-support');
        window.scrollTo(0, 0);
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">

                    {/* Logo */}
                    <Link to="/" className="logo">
                        <FaPrint className="logo-icon" />
                        <span className="logo-text">Printer Support Services</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/about" className="nav-link">About Us</Link>
                        <Link to="/services" className="nav-link">Services</Link>
                       
                        <Link to="/blog" className="nav-link">Blog</Link>
                         <Link to="/faq" className="nav-link">FAQ</Link>
                    </nav>

                    {/* CTA Button */}
                    <button className="cta-button" onClick={goToChat}>
                        <FaComments /> Chat with Expert
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="nav-mobile">
                        <Link to="/" className="mobile-nav-link">Home</Link>
                        <Link to="/about" className="mobile-nav-link">About Us</Link>
                        <Link to="/services" className="mobile-nav-link">Services</Link>
                       
                        <Link to="/blog" className="mobile-nav-link">Blog</Link>
                         <Link to="/faq" className="mobile-nav-link">FAQ</Link>

                        <button 
                            className="mobile-cta-button"
                            onClick={goToChat}
                        >
                            <FaComments /> Chat with Expert
                        </button>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
