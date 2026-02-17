import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './StaticPages.css';

const Blog = () => {
    const navigate = useNavigate();
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await api.get('/blogs');
                if (res.data.success) {
                    setBlogPosts(res.data.data);
                }
            } catch (err) {
                console.error('Error fetching blogs:', err);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="static-page">
            <div className="page-hero">
                <div className="container">
                    <h1>Printer Help & Troubleshooting Guides</h1>
                    <p>Expert tips and guides for printer support</p>
                </div>
            </div>

            <div className="container">
                <section className="page-section">
                    <div className="blog-grid">
                        {blogPosts.map((post, index) => (
                            <div key={post._id || index} className="blog-card" onClick={() => navigate(`/blog/${post.slug}`)}>
                                <div className="blog-card-image">
                                    {post.image ? (
                                        <img src={post.image} alt={post.title} />
                                    ) : (
                                        <div className="blog-image-placeholder">
                                            <span>Printer Guide</span>
                                        </div>
                                    )}
                                    <div className="blog-date">
                                        {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                                <div className="blog-card-content">
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <button
                                        className="blog-link"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/blog/${post.slug}`);
                                        }}
                                    >
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Blog;
