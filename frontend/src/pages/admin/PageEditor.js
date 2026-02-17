import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const PageEditor = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const isNew = !slug;

    const [loading, setLoading] = useState(!isNew);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '', // Simple text area for now, can be rich text later
        seoTitle: '',
        seoDescription: ''
    });

    useEffect(() => {
        if (!isNew) {
            fetchPage();
        }
    }, [slug]);

    const fetchPage = async () => {
        try {
            const res = await api.get(`/pages/${slug}`);
            if (res.data.success) {
                const page = res.data.data;
                setFormData({
                    title: page.title,
                    slug: page.slug,
                    content: page.sections?.main || '',
                    seoTitle: page.seoMetadata?.title || '',
                    seoDescription: page.seoMetadata?.description || ''
                });
            }
        } catch (err) {
            console.error('Error fetching page:', err);
            alert('Error loading page data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: formData.title,
            slug: formData.slug,
            sections: {
                main: formData.content
            },
            seoMetadata: {
                title: formData.seoTitle,
                description: formData.seoDescription
            }
        };

        try {
            if (isNew) {
                await api.post('/pages', payload);
            } else {
                // We need the ID to update, but we only have slug from URL. 
                // Let's first get ID from current page data or assume backend handles slug update (our route uses ID)
                // Wait, our backend route uses ID for update: router.route('/:id').put(...)
                // But frontend URL uses slug.
                // WE need to store ID in state.
                const res = await api.get(`/pages/${slug}`);
                const id = res.data.data._id;
                await api.put(`/pages/${id}`, payload);
            }
            navigate('/admin/pages');
        } catch (err) {
            console.error('Error saving page:', err);
            alert(err.response?.data?.message || 'Error saving page');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="page-editor">
            <div className="admin-page-header">
                <h2>{isNew ? 'Create New Page' : 'Edit Page'}</h2>
            </div>

            <div className="admin-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Page Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Slug (URL Path)</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Main Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="10"
                            style={{ resize: 'vertical' }}
                        ></textarea>
                        <small style={{ color: '#718096' }}>This content will be displayed on the page.</small>
                    </div>

                    <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>SEO Metadata</h3>

                    <div className="form-group">
                        <label>SEO Title</label>
                        <input
                            type="text"
                            name="seoTitle"
                            value={formData.seoTitle}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Meta Description</label>
                        <textarea
                            name="seoDescription"
                            value={formData.seoDescription}
                            onChange={handleChange}
                            rows="3"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>
                        {isNew ? 'Create Page' : 'Update Page'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/pages')}
                        style={{ marginLeft: '10px', background: 'none', border: '1px solid #cbd5e0', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PageEditor;
