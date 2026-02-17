import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './AdminPages.css';

const BlogEditor = () => {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        excerpt: '',
        content: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            const fetchBlog = async () => {
                try {
                    const res = await api.get(`/blogs/id/${id}`);
                    if (res.data.success) {
                        setFormData({
                            title: res.data.data.title,
                            image: res.data.data.image,
                            excerpt: res.data.data.excerpt,
                            content: res.data.data.content
                        });
                    }
                } catch (err) {
                    setError('Failed to fetch blog details');
                }
            };
            fetchBlog();
        }
    }, [id, isEditMode]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = e => {
        setSelectedFile(e.target.files[0]);
    };

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('excerpt', formData.excerpt);
        data.append('content', formData.content);
        if (selectedFile) {
            data.append('image', selectedFile);
        } else if (formData.image) {
            // Keep existing image URL if no new file selected (handled by backend logic or just verify logic)
            // If backend expects 'image' string when no file, we can append it, 
            // but usually file upload middleware handles 'image' field if file is present.
            // If we are strictly using Cloudinary, we might rely on the file.
            // However, to keep existing image on update without re-uploading, we don't send 'image' field if it's not a file?
            // Actually, if we send a string it might be treated as text field. 
            // Let's assume on update, if no file, we don't send 'image' field unless we want to clear it.
            // But if we want to support manual URL entry too, we can append it.
            // For now, let's prioritize file upload.
            data.append('image', formData.image);
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            if (isEditMode) {
                await api.put(`/blogs/id/${id}`, data, config);
            } else {
                await api.post('/blogs', data, config);
            }
            navigate('/admin/blogs');
        } catch (err) {
            console.error('Blog Save Error:', err);
            const status = err.response?.status;
            const msg = err.response?.data?.message || err.message;
            setError(`Error ${status || ''}: ${msg}`);
            setLoading(false);
        }
    };

    return (
        <div className="admin-page-container">
            <div className="admin-header">
                <h2>{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
                <button onClick={() => navigate('/admin/blogs')} className="btn-secondary">
                    Back to List
                </button>
            </div>

            <div className="admin-card">
                {error && <div className="alert-error">{error}</div>}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={onChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Featured Image</label>
                        {formData.image && (
                            <div style={{ marginBottom: '10px' }}>
                                <img src={formData.image} alt="Current" style={{ height: '80px', borderRadius: '4px' }} />
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>Current: {formData.image}</div>
                            </div>
                        )}
                        <input
                            type="file"
                            name="image"
                            onChange={onFileChange}
                            className="form-control"
                            accept="image/*"
                        />
                        <div style={{ marginTop: '5px' }}>
                            <span style={{ fontSize: '0.9rem', color: '#666' }}>Or enter Image URL manually:</span>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={onChange}
                                className="form-control"
                                placeholder="http://..."
                                style={{ marginTop: '5px' }}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Excerpt (Short Summary)</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={onChange}
                            required
                            rows="3"
                            className="form-control"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Content (HTML/CSS/JS Supported)</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={onChange}
                            required
                            rows="20"
                            className="form-control"
                            style={{
                                fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                                fontSize: '14px',
                                backgroundColor: '#1e1e1e',
                                color: '#d4d4d4',
                                padding: '15px',
                                lineHeight: '1.5',
                                border: '1px solid #333'
                            }}
                            placeholder="<!-- Write your HTML content here -->
<style>
  .custom-class { color: red; }
</style>

<p>Hello World</p>

<script>
  console.log('Custom logic executed');
</script>"
                        ></textarea>
                        <small style={{ color: '#718096', display: 'block', marginTop: '5px' }}>
                            You can write raw HTML, add &lt;style&gt; tags for CSS, and &lt;script&gt; tags for JavaScript logic.
                        </small>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : (isEditMode ? 'Update Post' : 'Create Post')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogEditor;
