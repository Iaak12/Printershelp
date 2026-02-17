import React, { useState, useEffect } from 'react';
import { FaTrash, FaEye, FaSearch, FaTimes, FaUser, FaEnvelope, FaPhone, FaPrint, FaQuestionCircle } from 'react-icons/fa';
import api from '../../services/api';
import './ManageInquiries.css';

const ManageInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInquiry, setSelectedInquiry] = useState(null); // For modal

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await api.get('/inquiries');
            if (res.data.success) {
                setInquiries(res.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch inquiries', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                const res = await api.delete(`/inquiries/${id}`);
                if (res.data.success) {
                    setInquiries(inquiries.filter(item => item._id !== id));
                    // Check if the deleted item was currently open in modal
                    if (selectedInquiry && selectedInquiry._id === id) {
                        setSelectedInquiry(null);
                    }
                }
            } catch (err) {
                console.error('Failed to delete inquiry', err);
                alert('Failed to delete inquiry');
            }
        }
    };

    const handleView = (inquiry) => {
        setSelectedInquiry(inquiry);
    };

    const closeModel = () => {
        setSelectedInquiry(null);
    };

    const filteredInquiries = inquiries.filter(inquiry =>
        inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="manage-inquiries-container">Loading...</div>;

    return (
        <div className="manage-inquiries-container">
            <header className="page-header">
                <div>
                    <h2>Manage Inquiries</h2>
                    <p>Track and manage customer support requests</p>
                </div>
            </header>

            <div className="controls-bar">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or brand..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="inquiries-table-wrapper">
                <table className="inquiries-table">
                    <thead>
                        <tr>
                            <th>User Details</th>
                            <th>Contact Info</th>
                            <th>Brand / Issue</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInquiries.length > 0 ? (
                            filteredInquiries.map(inquiry => (
                                <tr key={inquiry._id}>
                                    <td>
                                        <div className="user-cell">
                                            <div className="user-name">{inquiry.name}</div>
                                            <div className="user-email">{inquiry.email}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                                            {inquiry.phone}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span className="badge badge-brand">{inquiry.brand}</span>
                                        </div>
                                        <div style={{ marginTop: '6px', fontSize: '0.9rem', fontWeight: '500' }}>
                                            {inquiry.issue}
                                        </div>
                                        {inquiry.message && (
                                            <div style={{
                                                marginTop: '5px',
                                                fontSize: '0.8rem',
                                                color: '#718096',
                                                maxWidth: '200px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }} title={inquiry.message}>
                                                {inquiry.message}
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${inquiry.status === 'New' ? 'status-new' : inquiry.status === 'Contacted' ? 'status-contacted' : 'status-resolved'}`}>
                                            {inquiry.status || 'New'}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '0.85rem', color: '#718096' }}>
                                        {new Date(inquiry.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className="action-cell">
                                            <button
                                                className="btn-action view"
                                                onClick={() => handleView(inquiry)}
                                                title="View Details"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                className="btn-action delete"
                                                onClick={() => handleDelete(inquiry._id)}
                                                title="Delete Inquiry"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#718096' }}>
                                    No inquiries found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* View Details Modal */}
            {selectedInquiry && (
                <div className="modal-overlay" onClick={closeModel}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Inquiry Details</h3>
                            <button className="close-btn" onClick={closeModel}><FaTimes /></button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-row">
                                <label className="detail-label"><FaUser style={{ marginRight: '5px' }} /> Customer</label>
                                <div className="detail-value" style={{ fontWeight: '600' }}>{selectedInquiry.name}</div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div className="detail-row" style={{ flex: 1 }}>
                                    <label className="detail-label"><FaEnvelope style={{ marginRight: '5px' }} /> Email</label>
                                    <div className="detail-value">{selectedInquiry.email}</div>
                                </div>
                                <div className="detail-row" style={{ flex: 1 }}>
                                    <label className="detail-label"><FaPhone style={{ marginRight: '5px' }} /> Phone</label>
                                    <div className="detail-value">{selectedInquiry.phone}</div>
                                </div>
                            </div>

                            <hr style={{ border: 'none', borderTop: '1px solid #edf2f7', margin: '15px 0' }} />

                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div className="detail-row" style={{ flex: 1 }}>
                                    <label className="detail-label"><FaPrint style={{ marginRight: '5px' }} /> Brand</label>
                                    <div className="detail-value">
                                        <span className="badge badge-brand">{selectedInquiry.brand}</span>
                                    </div>
                                </div>
                                <div className="detail-row" style={{ flex: 1 }}>
                                    <label className="detail-label"><FaQuestionCircle style={{ marginRight: '5px' }} /> Issue</label>
                                    <div className="detail-value">{selectedInquiry.issue}</div>
                                </div>
                            </div>

                            <div className="detail-row">
                                <label className="detail-label">Full Message</label>
                                <div className="detail-value message-box">
                                    {selectedInquiry.message || "No message provided."}
                                </div>
                            </div>

                            <div className="detail-row">
                                <label className="detail-label">Status</label>
                                <select
                                    className="status-select"
                                    value={selectedInquiry.status || 'New'}
                                    disabled // Disabled for now until backend update endpoint is added
                                >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-action delete" onClick={() => handleDelete(selectedInquiry._id)} style={{ marginRight: 'auto', width: 'auto', padding: '0 15px', borderRadius: '6px', fontSize: '0.9rem' }}>
                                <FaTrash style={{ marginRight: '5px' }} /> Delete
                            </button>
                            <button className="status-badge status-resolved" onClick={closeModel} style={{ border: 'none', cursor: 'pointer', padding: '8px 20px' }}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageInquiries;
