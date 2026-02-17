import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Execute scripts extracted from the content
    if (post && post.content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = post.content;
      const scripts = tempDiv.querySelectorAll('script');

      scripts.forEach(script => {
        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(script.innerHTML));
        document.body.appendChild(newScript);
        // Optional: Cleanup script after execution or leave it
      });
    }
  }, [post]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${slug}`);
        if (res.data.success) {
          setPost(res.data.data);
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="container text-center" style={{ padding: '100px 0' }}>
        <h2>Loading article...</h2>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container" style={{ padding: '100px 0' }}>
        <h2>{error || 'Blog Not Found'}</h2>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/blog')}>
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">

      {/* ================= HERO SECTION ================= */}
      <div className="blog-hero">
        {post.image && <img src={post.image} alt={post.title} />}
        <div className="blog-hero-overlay">
          <h1>{post.title}</h1>
          <p>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • By {post.author}</p>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="container blog-content">

        {/* Render HTML content safely */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* ================= CTA SECTION ================= */}
        <div className="blog-cta">
          <h3>Still Facing Printer Issues?</h3>
          <p>Connect with our certified technical experts for guided troubleshooting support.</p>
          <button
            className="btn btn-primary btn-large"
            onClick={() => navigate('/chat-support')}
          >
            Chat with Expert
          </button>
        </div>

        {/* Back Button */}
        <div style={{ marginTop: '40px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/blog')}
          >
            ← Back to Blog
          </button>
        </div>

      </div>
    </div>
  );
};

export default BlogDetail;
