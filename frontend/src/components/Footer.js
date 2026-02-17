import React from 'react';
import { Link } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Support */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Brand Support</h4>
                        <ul className="footer-links">
                            <li><Link to="/brands/hp-printer-support">HP Printer Support</Link></li>
                            <li><Link to="/brands/canon-printer-support">Canon Printer Support</Link></li>
                            <li><Link to="/brands/epson-printer-support">Epson Printer Support</Link></li>
                            <li><Link to="/brands/brother-printer-support">Brother Printer Support</Link></li>
                        </ul>
                    </div>

                    {/* Service Links */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Services</h4>
                        <ul className="footer-links">
                            <li><Link to="/services/printer-offline">Printer Offline Issues</Link></li>
                            <li><Link to="/services/printer-not-printing">Printer Not Printing</Link></li>
                            <li><Link to="/services/wireless-setup">Wireless Setup</Link></li>
                            <li><Link to="/services/driver-issues">Driver & Software Issues</Link></li>
                            <li><Link to="/services/paper-jam">Printer Troubleshooting</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Legal</h4>
                        <ul className="footer-links">
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
                            <li><Link to="/disclaimer">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-logo">
                        <FaPrint className="footer-logo-icon" />
                        <span>Printer Support Services</span>
                    </div>
                    <p className="footer-disclaimer">
                        Independent printer support service providing guided assistance for common printer issues.
                    </p>
                    <p className="footer-copyright">
                        © {currentYear} Printer Support Services. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
