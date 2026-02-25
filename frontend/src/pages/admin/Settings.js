import React, { useState, useEffect } from 'react';
import { siteSettingsService } from '../../services/siteSettingsService';
import { FaSave, FaUpload, FaImage } from 'react-icons/fa';
import './AdminPages.css';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        siteName: '',
        siteDescription: '',
        headerLogo: '',
        footerLogo: '',
        favicon: ''
    });

    const [files, setFiles] = useState({
        headerLogo: null,
        footerLogo: null,
        favicon: null
    });

    const [previews, setPreviews] = useState({
        headerLogo: '',
        footerLogo: '',
        favicon: ''
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setFetching(true);
            const res = await siteSettingsService.getSettings();
            if (res.success && res.data) {
                setFormData({
                    siteName: res.data.siteName || '',
                    siteDescription: res.data.siteDescription || '',
                    headerLogo: res.data.headerLogo || '',
                    footerLogo: res.data.footerLogo || '',
                    favicon: res.data.favicon || ''
                });
                setPreviews({
                    headerLogo: res.data.headerLogo || '',
                    footerLogo: res.data.footerLogo || '',
                    favicon: res.data.favicon || ''
                });
            }
        } catch (err) {
            console.error('Fetch Settings Error:', err);
            setError('Failed to fetch settings: ' + (err.response?.data?.message || err.message));
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        if (selectedFiles[0]) {
            const file = selectedFiles[0];
            setFiles(prev => ({ ...prev, [name]: file }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [name]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const data = new FormData();

            // Append files
            if (files.headerLogo) data.append('headerLogo', files.headerLogo);
            if (files.footerLogo) data.append('footerLogo', files.footerLogo);
            if (files.favicon) data.append('favicon', files.favicon);

            // Append other data
            const jsonData = {
                siteName: formData.siteName,
                siteDescription: formData.siteDescription
            };
            data.append('data', JSON.stringify(jsonData));

            const res = await siteSettingsService.updateSettings(data);
            if (res.success) {
                setSuccess('Settings updated successfully!');
                // Reset files and update formData with new URLs
                setFiles({ headerLogo: null, footerLogo: null, favicon: null });
                setFormData(prev => ({
                    ...prev,
                    headerLogo: res.data.headerLogo,
                    footerLogo: res.data.footerLogo,
                    favicon: res.data.favicon
                }));
            }
        } catch (err) {
            console.error('Frontend Update Error:', err);
            setError(err.response?.data?.message || 'Failed to update settings');
        } finally {
            setLoading(false);
            window.scrollTo(0, 0);
        }
    };

    if (fetching) return <div className="admin-page-container"><p>Loading settings...</p></div>;

    return (
        <div className="admin-page-container">
            <div className="page-header">
                <h2>General Settings</h2>
                <button onClick={handleSubmit} className="btn-primary" disabled={loading}>
                    <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="admin-card">
                {error && <div className="alert-error">{error}</div>}
                {success && <div className="alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="settings-section">
                        <h3>Site Identity</h3>
                        <div className="form-group">
                            <label>Site Name</label>
                            <input
                                type="text"
                                name="siteName"
                                className="form-control"
                                value={formData.siteName}
                                onChange={handleChange}
                                placeholder="Printer Support Services"
                            />
                        </div>
                        <div className="form-group">
                            <label>Site Description</label>
                            <textarea
                                name="siteDescription"
                                className="form-control"
                                value={formData.siteDescription}
                                onChange={handleChange}
                                rows="2"
                            />
                        </div>
                    </div>

                    <div className="settings-section" style={{ marginTop: '30px' }}>
                        <h3>Logo Management</h3>
                        <div className="logo-upload-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '15px' }}>
                            {/* Header Logo */}
                            <div className="logo-upload-card" style={{ border: '1px dashed #cbd5e0', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
                                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '15px' }}>Header Logo</label>
                                <div className="logo-preview-box" style={{
                                    height: '120px',
                                    background: '#f7fafc',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '15px',
                                    overflow: 'hidden',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    {previews.headerLogo ? (
                                        <img src={previews.headerLogo} alt="Header Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                    ) : (
                                        <FaImage style={{ fontSize: '3rem', color: '#cbd5e0' }} />
                                    )}
                                </div>
                                <div className="file-input-wrapper">
                                    <input
                                        type="file"
                                        name="headerLogo"
                                        id="headerLogoInput"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="headerLogoInput" className="btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                                        <FaUpload /> Choose file
                                    </label>
                                    <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#718096' }}>
                                        {files.headerLogo ? files.headerLogo.name : 'No file chosen'}
                                    </span>
                                </div>
                            </div>

                            {/* Footer Logo */}
                            <div className="logo-upload-card" style={{ border: '1px dashed #cbd5e0', borderRadius: '8px', padding: '20px', textAlign: 'center', background: '#1a202c', color: 'white' }}>
                                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '15px' }}>Footer Logo (On Dark)</label>
                                <div className="logo-preview-box" style={{
                                    height: '120px',
                                    background: '#2d3748',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '15px',
                                    overflow: 'hidden',
                                    border: '1px solid #4a5568'
                                }}>
                                    {previews.footerLogo ? (
                                        <img src={previews.footerLogo} alt="Footer Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                    ) : (
                                        <FaImage style={{ fontSize: '3rem', color: '#4a5568' }} />
                                    )}
                                </div>
                                <div className="file-input-wrapper">
                                    <input
                                        type="file"
                                        name="footerLogo"
                                        id="footerLogoInput"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="footerLogoInput" className="btn-secondary btn-sm" style={{ cursor: 'pointer', borderColor: '#4a5568' }}>
                                        <FaUpload /> Choose file
                                    </label>
                                    <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#a0aec0' }}>
                                        {files.footerLogo ? files.footerLogo.name : 'No file chosen'}
                                    </span>
                                </div>
                            </div>

                            {/* Favicon */}
                            <div className="logo-upload-card" style={{ border: '1px dashed #cbd5e0', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
                                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '15px' }}>Site Icon (Favicon)</label>
                                <div className="logo-preview-box" style={{
                                    height: '120px',
                                    background: '#f7fafc',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '15px',
                                    overflow: 'hidden',
                                    border: '1px solid #e2e8f0'
                                }}>
                                    {previews.favicon ? (
                                        <img src={previews.favicon} alt="Favicon Preview" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                                    ) : (
                                        <FaImage style={{ fontSize: '3rem', color: '#cbd5e0' }} />
                                    )}
                                </div>
                                <div className="file-input-wrapper">
                                    <input
                                        type="file"
                                        name="favicon"
                                        id="faviconInput"
                                        onChange={handleFileChange}
                                        accept="image/x-icon, image/png, image/jpeg"
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="faviconInput" className="btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                                        <FaUpload /> Choose file
                                    </label>
                                    <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#718096' }}>
                                        {files.favicon ? files.favicon.name : 'No file chosen'}
                                    </span>
                                </div>
                                <small style={{ display: 'block', marginTop: '10px', color: '#718096' }}>Recommended: 32x32 or 64x64 PNG/ICO</small>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
