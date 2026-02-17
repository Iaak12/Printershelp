import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../services/api';

const PageManager = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const res = await api.get('/pages');
            if (res.data.success) {
                setPages(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching pages:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this page?')) {
            try {
                await api.delete(`/pages/${id}`);
                setPages(pages.filter(page => page._id !== id));
            } catch (err) {
                alert('Error deleting page');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="page-manager">
            <div className="admin-page-header">
                <h2>Manage Pages</h2>
                <Link to="/admin/pages/new" className="btn-primary" style={{ textDecoration: 'none' }}>+ New Page</Link>
            </div>

            <div className="admin-card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #edf2f7', textAlign: 'left' }}>
                            <th style={{ padding: '12px' }}>Title</th>
                            <th style={{ padding: '12px' }}>Slug</th>
                            <th style={{ padding: '12px' }}>Last Updated</th>
                            <th style={{ padding: '12px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map(page => (
                            <tr key={page._id} style={{ borderBottom: '1px solid #edf2f7' }}>
                                <td style={{ padding: '12px' }}>{page.title}</td>
                                <td style={{ padding: '12px' }}><code>/{page.slug}</code></td>
                                <td style={{ padding: '12px' }}>{new Date(page.updatedAt).toLocaleDateString()}</td>
                                <td style={{ padding: '12px' }}>
                                    <Link to={`/admin/pages/edit/${page.slug}`} style={{ marginRight: '10px', color: '#3182ce' }}>
                                        <FaEdit />
                                    </Link>
                                    <button onClick={() => handleDelete(page._id)} style={{ border: 'none', background: 'none', color: '#e53e3e', cursor: 'pointer' }}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {pages.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#a0aec0' }}>No pages found. Create one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PageManager;
