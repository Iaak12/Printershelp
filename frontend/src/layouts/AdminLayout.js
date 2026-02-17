import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaSignOutAlt, FaTachometerAlt, FaChartBar, FaInfoCircle, FaPhoneAlt, FaEdit, FaQuestionCircle, FaBuilding } from 'react-icons/fa';
import { authService } from '../services/authService';
import './AdminLayout.css';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <div className="logo-icon">
                        <FaBuilding />
                    </div>
                    <div className="logo-text">
                        <h3>Admin Portal</h3>
                        <span className="brand-subtitle">Pro Attestation</span>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/admin/dashboard" className={`nav-item ${window.location.pathname === '/admin/dashboard' ? 'active' : ''}`}>
                        <FaChartBar /> Dashboard
                    </Link>
                    <Link to="/admin/home-page" className="nav-item">
                        <FaHome /> Home Page
                    </Link>
                    <Link to="/admin/about-page" className="nav-item">
                        <FaInfoCircle /> About Page
                    </Link>
                    <Link to="/admin/services" className="nav-item">
                        <FaTachometerAlt /> Manage Services
                    </Link>
                    <Link to="/admin/blogs" className="nav-item">
                        <FaEdit /> Manage Blogs
                    </Link>
                    <Link to="/admin/faqs" className="nav-item">
                        <FaQuestionCircle /> Manage FAQs
                    </Link>
                    <Link to="/admin/inquiries" className="nav-item">
                        <FaPhoneAlt /> Manage Inquiries
                    </Link>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="nav-item logout-btn">
                        <FaSignOutAlt /> Logout
                    </button>
                    <div className="app-version">v2.0.0 Admin Panel</div>
                </div>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
