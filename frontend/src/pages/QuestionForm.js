import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { questionService } from '../services/questionService';
import './QuestionForm.css';

const QuestionForm = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        userEmail: '',
        userName: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data.data || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await questionService.create(formData);
            setSuccess(true);
            setFormData({
                title: '',
                description: '',
                category: '',
                userEmail: '',
                userName: ''
            });

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit question. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="question-form-page">
            <div className="question-form-container">
                <div className="question-form-header">
                    <h1>Ask a Question</h1>
                    <p>Our experts are here to help. Describe your issue and we'll get back to you soon.</p>
                </div>

                {success && (
                    <div className="success-message">
                        Question submitted successfully! Redirecting to home page...
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form className="question-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userName">Your Name</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="userEmail">Email Address</label>
                        <input
                            type="email"
                            id="userEmail"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="title">Question Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Brief summary of your issue"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Detailed Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Provide as much detail as possible about your issue..."
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Question'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuestionForm;
