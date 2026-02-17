import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { questionService } from '../services/questionService';
import './QuestionForm.css';

const CategoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategoryData();
    }, [id]);

    const fetchCategoryData = async () => {
        try {
            const [categoryData, questionsData] = await Promise.all([
                categoryService.getById(id),
                questionService.getAll({ category: id, limit: 10 })
            ]);

            setCategory(categoryData.data);
            setQuestions(questionsData.data || []);
        } catch (err) {
            console.error('Error fetching category:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="question-form-page">
                <div className="question-form-container">
                    <h1>Category not found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="question-form-page">
            <div className="question-form-container">
                <div className="question-form-header">
                    <h1>{category.name}</h1>
                    <p>{category.description}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/ask-question')}
                        style={{ marginTop: '1rem' }}
                    >
                        Ask a Question in {category.name}
                    </button>
                </div>

                {questions.length > 0 && (
                    <div className="question-form">
                        <h2 style={{ marginBottom: '1rem' }}>Recent Questions</h2>
                        {questions.map((q) => (
                            <div key={q._id} style={{ padding: '1rem', borderBottom: '1px solid var(--gray-200)' }}>
                                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{q.title}</h3>
                                <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                                    Status: <span style={{ color: 'var(--primary-blue)', fontWeight: '600' }}>{q.status}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetail;
