import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import api from '../../services/api';
import './AdminPages.css';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await api.get('/services');
            if (res.data.success) {
                setServices(res.data.data);
            }
        } catch (err) {
            setError('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await api.delete(`/services/${id}`);
                setServices(services.filter(s => s._id !== id));
            } catch (err) {
                alert('Failed to delete service');
            }
        }
    };

    if (loading) return <div className="loading-spinner">Loading...</div>;

    return (
        <div className="admin-page-container">
            <div className="page-header">
                <h2>Manage Services</h2>
                <Link to="/admin/services/new" className="btn-primary">
                    <FaPlus /> Add New Service
                </Link>
            </div>

            <div className="admin-card">
                {error && <div className="alert-error">{error}</div>}

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Icon</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service._id}>
                                <td>{service.title}</td>
                                <td><code>/{service.slug}</code></td>
                                <td>
                                    {service.icon && service.icon.startsWith('http') ? (
                                        <img src={service.icon} alt="icon" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                                    ) : (
                                        <span style={{ fontSize: '1.5rem' }}>📄</span>
                                    )}
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <Link to={`/admin/services/edit/${service._id}`} className="btn-icon edit">
                                            <FaEdit />
                                        </Link>
                                        <button onClick={() => handleDelete(service._id)} className="btn-icon delete">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {services.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No services found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageServices;
