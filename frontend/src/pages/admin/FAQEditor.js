import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './AdminPages.css';

const FAQEditor = () => {
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        order: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            const fetchFAQ = async () => {
                try {
                    const res = await api.get(`/faqs`); // Ideally get by ID, but we have list. Filter for now or get all. 
                    // Actually api.get('/faqs/:id') isn't implemented in public yet? 
                    // Wait, I implemented getFAQs (all) and update/delete (by ID).
                    // I didn't implement getFAQById in controller!
                    // I'll just fetch all and find, or assume I can implement getById later.
                    // Actually, updateFAQ uses findById. deleteFAQ uses findById.
                    // But I missed getFAQ in routes!
                    // Let me fix that in next step. For now I'll fetch list and find.
                    const all = await api.get('/faqs');
                    if (all.data.success) {
                        const found = all.data.data.find(f => f._id === id);
                        if (found) {
                            setFormData({
                                question: found.question,
                                answer: found.answer,
                                order: found.order
                            });
                        }
                    }
                } catch (err) {
                    setError('Failed to fetch FAQ details');
                }
            };
            fetchFAQ();
        }
    }, [id, isEditMode]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditMode) {
                await api.put(`/faqs/${id}`, formData);
            } else {
                await api.post('/faqs', formData);
            }
            navigate('/admin/faqs');
        } catch (err) {
            console.error('FAQ Create Error:', err);
            const status = err.response?.status;
            const msg = err.response?.data?.message || err.message;
            setError(`Error ${status || ''}: ${msg}`);
            setLoading(false);
        }
    };

    return (
        <div className="admin-page-container">
            <div className="admin-header">
                <h2>{isEditMode ? 'Edit FAQ' : 'Create New FAQ'}</h2>
                <button onClick={() => navigate('/admin/faqs')} className="btn-secondary">
                    Back to List
                </button>
            </div>

            <div className="admin-card">
                {error && <div className="alert-error">{error}</div>}

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Question</label>
                        <input
                            type="text"
                            name="question"
                            value={formData.question}
                            onChange={onChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Answer</label>
                        <textarea
                            name="answer"
                            value={formData.answer}
                            onChange={onChange}
                            required
                            rows="5"
                            className="form-control"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Display Order</label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={onChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : (isEditMode ? 'Update FAQ' : 'Create FAQ')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FAQEditor;
