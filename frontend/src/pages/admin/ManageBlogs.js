import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../services/api';
import './AdminPages.css';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlogs = async () => {
        try {
            const res = await api.get('/blogs');
            if (res.data.success) {
                setBlogs(res.data.data);
            }
        } catch (err) {
            setError('Failed to fetch blogs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const deleteBlog = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                await api.delete(`/blogs/id/${id}`);
                setBlogs(blogs.filter(blog => blog._id !== id));
            } catch (err) {
                alert('Failed to delete blog');
            }
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="admin-page-container">
            <div className="admin-header">
                <h2>Manage Blogs</h2>
                <Link to="/admin/blogs/new" className="btn-primary">
                    <FaPlus /> Add New Blog
                </Link>
            </div>

            {error && <div className="alert-error">{error}</div>}

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No blog posts found</td>
                            </tr>
                        ) : (
                            blogs.map(blog => (
                                <tr key={blog._id}>
                                    <td>
                                        {blog.image ? (
                                            <img src={blog.image} alt={blog.title} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                        ) : (
                                            <div style={{ width: '50px', height: '40px', background: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#888' }}>No Img</div>
                                        )}
                                    </td>
                                    <td>{blog.title}</td>
                                    <td>{blog.slug}</td>
                                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link to={`/admin/blogs/edit/${blog._id}`} className="btn-icon edit">
                                                <FaEdit />
                                            </Link>
                                            <button onClick={() => deleteBlog(blog._id)} className="btn-icon delete">
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

export default ManageBlogs;
