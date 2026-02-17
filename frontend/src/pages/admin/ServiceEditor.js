import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './AdminPages.css';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

const ServiceEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        content: '',
        seo: { metaTitle: '', metaDescription: '' }
    });
    const [iconFile, setIconFile] = useState(null);
    const [currentIcon, setCurrentIcon] = useState('');

    const fetchService = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get(`/services/${id}`);
            if (res.data.success) {
                const s = res.data.data;
                setFormData({
                    title: s.title,
                    shortDescription: s.shortDescription,
                    content: s.content,
                    seo: s.seo || { metaTitle: '', metaDescription: '' }
                });
                setCurrentIcon(s.icon);
            }
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch service details');
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (isEditMode) {
            fetchService();
        }
    }, [fetchService, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('seo.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({ ...prev, seo: { ...prev.seo, [field]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setIconFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = new FormData();
            if (iconFile) {
                data.append('icon', iconFile);
            }
            data.append('data', JSON.stringify(formData));

            if (isEditMode) {
                await api.put(`/services/${id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/services', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            navigate('/admin/services');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to save service');
            setLoading(false);
        }
    };

    return (
        <div className="admin-page-container">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={() => navigate('/admin/services')} className="btn-secondary">
                        <FaArrowLeft /> Back
                    </button>
                    <h2>{isEditMode ? 'Edit Service' : 'Create New Service'}</h2>
                </div>
                <button onClick={handleSubmit} className="btn-primary" disabled={loading}>
                    <FaSave /> {loading ? 'Saving...' : 'Save Service'}
                </button>
            </div>

            <div className="admin-card">
                {error && <div className="alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Service Title</label>
                        <input
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Short Description (for list view)</label>
                        <textarea
                            name="shortDescription"
                            className="form-control"
                            rows="2"
                            value={formData.shortDescription}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Service Icon</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {currentIcon && (
                                <div style={{ width: '50px', height: '50px', border: '1px solid #ddd', padding: '5px' }}>
                                    <img src={currentIcon} alt="Current Icon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                            )}
                            <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Full Content (HTML Supported)</label>
                        <small style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
                            You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, etc.
                        </small>
                        <textarea
                            name="content"
                            className="form-control"
                            rows="15"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            style={{ fontFamily: 'monospace' }}
                        />
                    </div>

                    <div className="tab-content" style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <h3>SEO Settings</h3>
                        <div className="form-group">
                            <label>Meta Title</label>
                            <input
                                name="seo.metaTitle"
                                className="form-control"
                                value={formData.seo.metaTitle}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Meta Description</label>
                            <textarea
                                name="seo.metaDescription"
                                className="form-control"
                                value={formData.seo.metaDescription}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceEditor;
