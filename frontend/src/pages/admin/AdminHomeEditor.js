import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './AdminPages.css';
import { FaTrash, FaPlus, FaSave } from 'react-icons/fa';

const AdminHomeEditor = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [activeTab, setActiveTab] = useState('hero');
    const [formData, setFormData] = useState({
        hero: { title: '', subtitle: '', description: '', buttonText: '', image: '' },
        brands: [],
        issues: [],
        whyChooseUs: [],
        processSteps: [],
        trustStats: {
            experience: { title: '', description: '' },
            multiBrand: { title: '', description: '' },
            professional: { title: '', description: '' }
        },
        testimonials: [],
        seo: { metaTitle: '', metaDescription: '' },
        seoContent: { title: '', body: '' }
    });

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            setLoading(true);
            const res = await api.get('/homepage');
            if (res.data.success && res.data.data) {
                setFormData(res.data.data);
            }
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch home page data');
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

    const handleStatChange = (key, field, value) => {
        setFormData(prev => ({
            ...prev,
            trustStats: {
                ...prev.trustStats,
                [key]: {
                    ...prev.trustStats[key],
                    [field]: value
                }
            }
        }));
    };

    // Generic Array Handling
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

    const handleHeroImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, heroImageFile: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const formDataToSend = new FormData();

            // Append file if exists
            if (formData.heroImageFile) {
                formDataToSend.append('heroImage', formData.heroImageFile);
            }

            // Append other data as JSON string
            // Remove the file object from the JSON payload to avoid circular reference issues or unnecessary data
            const { heroImageFile, ...jsonData } = formData;
            formDataToSend.append('data', JSON.stringify(jsonData));

            await api.put('/homepage', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess('Home Page Updated Successfully!');
            setLoading(false);
            window.scrollTo(0, 0);

            // Refresh data to show new image URL from backend
            fetchHomeData();

        } catch (err) {
            console.error(err);
            setError('Failed to update home page');
            setLoading(false);
            window.scrollTo(0, 0);
        }
    };

    const renderTabs = () => (
        <div className="admin-tabs">
            {['hero', 'brands', 'issues', 'whyChooseUs', 'process', 'stats', 'testimonials', 'seo', 'seoContent'].map(tab => (
                <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab === 'whyChooseUs' ? 'Why Choose Us' : tab === 'seoContent' ? 'SEO Content' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );

    return (
        <div className="admin-page-container">
            <div className="page-header">
                <h2>Home Page Editor</h2>
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
                                <label>Description</label>
                                <textarea className="form-control" value={formData.hero.description} onChange={e => handleChange('hero', 'description', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Button Text</label>
                                <input className="form-control" value={formData.hero.buttonText} onChange={e => handleChange('hero', 'buttonText', e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Hero Image</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    {formData.hero.image && (
                                        <div style={{ width: '100px', height: '60px', overflow: 'hidden', borderRadius: '4px', border: '1px solid #ddd' }}>
                                            <img src={formData.hero.image} alt="Current Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                    <input type="file" className="form-control" onChange={handleHeroImageChange} accept="image/*" />
                                </div>
                                <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                    Upload a new image to replace the current one. Leave empty to keep existing image.
                                </small>
                            </div>
                        </div>
                    )}

                    {/* BRANDS TAB */}
                    {activeTab === 'brands' && (
                        <div className="tab-content">
                            <div className="flex-between">
                                <h3>Brands</h3>
                                <button type="button" className="btn-secondary btn-sm" onClick={() => addItem('brands', { name: '', logo: '' })}>
                                    <FaPlus /> Add Brand
                                </button>
                            </div>
                            {formData.brands.map((brand, i) => (
                                <div key={i} className="item-card">
                                    <div className="form-group">
                                        <label>Brand Name</label>
                                        <input className="form-control" value={brand.name} onChange={e => handleArrayChange('brands', i, 'name', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Logo URL</label>
                                        <input className="form-control" value={brand.logo} onChange={e => handleArrayChange('brands', i, 'logo', e.target.value)} />
                                    </div>
                                    <button type="button" className="btn-danger btn-sm" onClick={() => removeItem('brands', i)}>
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ISSUES TAB */}
                    {activeTab === 'issues' && (
                        <div className="tab-content">
                            <div className="flex-between">
                                <h3>Common Issues</h3>
                                <button type="button" className="btn-secondary btn-sm" onClick={() => addItem('issues', { title: '', path: '/services/' })}>
                                    <FaPlus /> Add Issue
                                </button>
                            </div>
                            {formData.issues.map((issue, i) => (
                                <div key={i} className="item-card">
                                    <div className="form-group">
                                        <label>Issue Title</label>
                                        <input className="form-control" value={issue.title} onChange={e => handleArrayChange('issues', i, 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Page Path</label>
                                        <input className="form-control" value={issue.path} onChange={e => handleArrayChange('issues', i, 'path', e.target.value)} />
                                    </div>
                                    <button type="button" className="btn-danger btn-sm" onClick={() => removeItem('issues', i)}>
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* WHY CHOOSE US TAB */}
                    {activeTab === 'whyChooseUs' && (
                        <div className="tab-content">
                            <h3>Why Choose Us</h3>
                            {formData.whyChooseUs.map((item, i) => (
                                <div key={i} className="item-card">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input className="form-control" value={item.title} onChange={e => handleArrayChange('whyChooseUs', i, 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" value={item.description} onChange={e => handleArrayChange('whyChooseUs', i, 'description', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Icon Name (e.g. FaCertificate)</label>
                                        <input className="form-control" value={item.icon} onChange={e => handleArrayChange('whyChooseUs', i, 'icon', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PROCESS TAB */}
                    {activeTab === 'process' && (
                        <div className="tab-content">
                            <h3>Process Steps</h3>
                            {formData.processSteps.map((step, i) => (
                                <div key={i} className="item-card">
                                    <div className="form-group">
                                        <label>Step {step.stepNumber}</label>
                                        <input className="form-control" value={step.title} onChange={e => handleArrayChange('processSteps', i, 'title', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* STATS TAB */}
                    {activeTab === 'stats' && (
                        <div className="tab-content">
                            <h3>Trust Stats</h3>
                            {Object.entries(formData.trustStats).map(([key, stat]) => (
                                <div key={key} className="item-card">
                                    <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input className="form-control" value={stat.title} onChange={e => handleStatChange(key, 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input className="form-control" value={stat.description} onChange={e => handleStatChange(key, 'description', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TESTIMONIALS TAB */}
                    {activeTab === 'testimonials' && (
                        <div className="tab-content">
                            <div className="flex-between">
                                <h3>Testimonials</h3>
                                <button type="button" className="btn-secondary btn-sm" onClick={() => addItem('testimonials', { name: '', company: '', review: '', stars: 5 })}>
                                    <FaPlus /> Add Testimonial
                                </button>
                            </div>
                            {formData.testimonials.map((t, i) => (
                                <div key={i} className="item-card">
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label>Name</label>
                                            <input className="form-control" value={t.name} onChange={e => handleArrayChange('testimonials', i, 'name', e.target.value)} />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>Company/Context</label>
                                            <input className="form-control" value={t.company} onChange={e => handleArrayChange('testimonials', i, 'company', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Review</label>
                                        <textarea className="form-control" value={t.review} onChange={e => handleArrayChange('testimonials', i, 'review', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Stars (1-5)</label>
                                        <input type="number" min="1" max="5" className="form-control" value={t.stars} onChange={e => handleArrayChange('testimonials', i, 'stars', e.target.value)} />
                                    </div>
                                    <button type="button" className="btn-danger btn-sm" onClick={() => removeItem('testimonials', i)}>
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

                    {/* SEO CONTENT TAB */}
                    {activeTab === 'seoContent' && (
                        <div className="tab-content">
                            <h3>Bottom SEO Content</h3>
                            <p className="text-muted" style={{ marginBottom: '15px', color: '#666', fontSize: '0.9rem' }}>
                                Add keyword-rich content for the bottom of the home page. HTML tags are supported for formatting.
                            </p>
                            <div className="form-group">
                                <label>Section Title</label>
                                <input
                                    className="form-control"
                                    value={formData.seoContent?.title || ''}
                                    onChange={e => handleChange('seoContent', 'title', e.target.value)}
                                    placeholder="e.g., Best Printer Support Services"
                                />
                            </div>
                            <div className="form-group">
                                <label>Content Body (HTML/Text)</label>
                                <textarea
                                    className="form-control"
                                    value={formData.seoContent?.body || ''}
                                    onChange={e => handleChange('seoContent', 'body', e.target.value)}
                                    rows="15"
                                    placeholder="<p>Write your detailed SEO content here...</p>"
                                    style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                                />
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AdminHomeEditor;
