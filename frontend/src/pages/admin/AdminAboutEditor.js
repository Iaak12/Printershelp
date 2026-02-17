import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './AdminPages.css';
import { FaTrash, FaPlus, FaSave } from 'react-icons/fa';

const AdminAboutEditor = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [activeTab, setActiveTab] = useState('hero');
    const [formData, setFormData] = useState({
        hero: { title: '', subtitle: '', image: '' },
        mission: { title: '', content: '', image: '' },
        features: [],
        seo: { metaTitle: '', metaDescription: '' }
    });

    useEffect(() => {
        fetchAboutData();
    }, []);

    const fetchAboutData = async () => {
        try {
            setLoading(true);
            const res = await api.get('/about');
            if (res.data.success && res.data.data) {
                setFormData(res.data.data);
            }
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch about page data');
            setLoading(false);
        }
    };

    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleArrayChange = (section, index, field, value) => {
        const newArray = [...formData[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        setFormData(prev => ({ ...prev, [section]: newArray }));
    };

    const addItem = (section, template) => {
        setFormData(prev => ({
            ...prev,
            [section]: [...prev[section], template]
        }));
    };

    const removeItem = (section, index) => {
        const newArray = [...formData[section]];
        newArray.splice(index, 1);
        setFormData(prev => ({ ...prev, [section]: newArray }));
    };

    const handleFileChange = (section, e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [`${section}ImageFile`]: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const formDataToSend = new FormData();

            if (formData.heroImageFile) formDataToSend.append('heroImage', formData.heroImageFile);
            if (formData.missionImageFile) formDataToSend.append('missionImage', formData.missionImageFile);

            const { heroImageFile, missionImageFile, ...jsonData } = formData;
            formDataToSend.append('data', JSON.stringify(jsonData));

            await api.put('/about', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSuccess('About Page Updated Successfully!');
            setLoading(false);
            window.scrollTo(0, 0);
            fetchAboutData();

        } catch (err) {
            console.error(err);
            setError('Failed to update about page');
            setLoading(false);
            window.scrollTo(0, 0);
        }
    };

    const renderTabs = () => (
        <div className="admin-tabs">
            {['hero', 'mission', 'features', 'seo'].map(tab => (
                <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );

    return (
        <div className="admin-page-container">
            <div className="page-header">
                <h2>About Page Editor</h2>
                <button onClick={handleSubmit} className="btn-primary" disabled={loading}>
                    <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {renderTabs()}

            <div className="admin-card">
                {error && <div className="alert-error">{error}</div>}
                {success && <div className="alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    {/* HERO TAB */}
                    {activeTab === 'hero' && (
                        <div className="tab-content">
                            <h3>Hero Section</h3>
                            <div className="form-group">
                                <label>Title</label>
                                <input className="form-control" value={formData.hero.title} onChange={e => handleChange('hero', 'title', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Subtitle</label>
                                <textarea className="form-control" value={formData.hero.subtitle} onChange={e => handleChange('hero', 'subtitle', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Hero Background Image</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    {formData.hero.image && (
                                        <div style={{ width: '100px', height: '60px', overflow: 'hidden', borderRadius: '4px', border: '1px solid #ddd' }}>
                                            <img src={formData.hero.image} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                    <input type="file" className="form-control" onChange={(e) => handleFileChange('hero', e)} accept="image/*" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MISSION TAB */}
                    {activeTab === 'mission' && (
                        <div className="tab-content">
                            <h3>Our Commitment / Mission</h3>
                            <div className="form-group">
                                <label>Title</label>
                                <input className="form-control" value={formData.mission.title} onChange={e => handleChange('mission', 'title', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <textarea className="form-control" rows="6" value={formData.mission.content} onChange={e => handleChange('mission', 'content', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Section Image (Optional)</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    {formData.mission.image && (
                                        <div style={{ width: '100px', height: '60px', overflow: 'hidden', borderRadius: '4px', border: '1px solid #ddd' }}>
                                            <img src={formData.mission.image} alt="Mission" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                    <input type="file" className="form-control" onChange={(e) => handleFileChange('mission', e)} accept="image/*" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FEATURES TAB */}
                    {activeTab === 'features' && (
                        <div className="tab-content">
                            <div className="flex-between">
                                <h3>Why Choose Us Features</h3>
                                <button type="button" className="btn-secondary btn-sm" onClick={() => addItem('features', { title: '', description: '', icon: '' })}>
                                    <FaPlus /> Add Feature
                                </button>
                            </div>
                            {formData.features.map((item, i) => (
                                <div key={i} className="item-card">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input className="form-control" value={item.title} onChange={e => handleArrayChange('features', i, 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" value={item.description} onChange={e => handleArrayChange('features', i, 'description', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Icon Name (e.g. FaCertificate)</label>
                                        <input className="form-control" value={item.icon} onChange={e => handleArrayChange('features', i, 'icon', e.target.value)} />
                                    </div>
                                    <button type="button" className="btn-danger btn-sm" onClick={() => removeItem('features', i)}>
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* SEO TAB */}
                    {activeTab === 'seo' && (
                        <div className="tab-content">
                            <h3>SEO Settings</h3>
                            <div className="form-group">
                                <label>Meta Title</label>
                                <input className="form-control" value={formData.seo.metaTitle} onChange={e => handleChange('seo', 'metaTitle', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Meta Description</label>
                                <textarea className="form-control" value={formData.seo.metaDescription} onChange={e => handleChange('seo', 'metaDescription', e.target.value)} />
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AdminAboutEditor;
