import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../services/api';
import './AdminPages.css'; // Assuming shared styles

const ManageFAQs = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFAQs = async () => {
        try {
            const res = await api.get('/faqs');
            if (res.data.success) {
                setFaqs(res.data.data);
            }
        } catch (err) {
            setError('Failed to fetch FAQs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFAQs();
    }, []);

    const deleteFAQ = async (id) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            try {
                await api.delete(`/faqs/${id}`);
                setFaqs(faqs.filter(faq => faq._id !== id));
            } catch (err) {
                alert('Failed to delete FAQ');
            }
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="admin-page-container">
            <div className="admin-header">
                <h2>Manage FAQs</h2>
                <Link to="/admin/faqs/new" className="btn-primary">
                    <FaPlus /> Add New FAQ
                </Link>
            </div>

            {error && <div className="alert-error">{error}</div>}

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faqs.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center">No FAQs found</td>
                            </tr>
                        ) : (
                            faqs.map(faq => (
                                <tr key={faq._id}>
                                    <td>{faq.question}</td>
                                    <td>{faq.order}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link to={`/admin/faqs/edit/${faq._id}`} className="btn-icon edit">
                                                <FaEdit />
                                            </Link>
                                            <button onClick={() => deleteFAQ(faq._id)} className="btn-icon delete">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageFAQs;
