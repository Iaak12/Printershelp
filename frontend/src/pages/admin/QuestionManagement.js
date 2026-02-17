import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { questionService } from '../../services/questionService';
import { categoryService } from '../../services/categoryService';
import { expertService } from '../../services/expertService';
import './AdminDashboard.css';

const QuestionManagement = () => {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchData();
    }, [filter]);

    const fetchData = async () => {
        try {
            const params = filter !== 'all' ? { status: filter } : {};
            const [questionsData, categoriesData, expertsData] = await Promise.all([
                questionService.getAll(params),
                categoryService.getAll(),
                expertService.getAll()
            ]);

            setQuestions(questionsData.data || []);
            setCategories(categoriesData.data || []);
            setExperts(expertsData.data || []);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await questionService.update(id, { status: newStatus });
            fetchData();
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status');
        }
    };

    const handleAssignExpert = async (id, expertId) => {
        try {
            await questionService.update(id, { assignedExpert: expertId, status: 'assigned' });
            fetchData();
        } catch (err) {
            console.error('Error assigning expert:', err);
            alert('Failed to assign expert');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await questionService.delete(id);
                fetchData();
            } catch (err) {
                console.error('Error deleting question:', err);
                alert('Failed to delete question');
            }
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="container">
                    <h1>Question Management</h1>
                    <div className="dashboard-nav">
                        <Link to="/admin/dashboard" className="dashboard-nav-link">Dashboard</Link>
                        <Link to="/admin/categories" className="dashboard-nav-link">Categories</Link>
                        <Link to="/admin/questions" className="dashboard-nav-link active">Questions</Link>
                        <Link to="/admin/experts" className="dashboard-nav-link">Experts</Link>
                    </div>
                </div>
            </div>

            <div className="container">
                <div style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', gap: 'var(--spacing-md)' }}>
                    <button
                        className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`btn ${filter === 'assigned' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter('assigned')}
                    >
                        Assigned
                    </button>
                    <button
                        className={`btn ${filter === 'resolved' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilter('resolved')}
                    >
                        Resolved
                    </button>
                </div>

                <div className="data-table">
                    <div className="table-header">
                        <h2>Questions ({questions.length})</h2>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>User</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Assigned To</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question) => (
                                <tr key={question._id}>
                                    <td>
                                        <strong>{question.title}</strong>
                                        <br />
                                        <small style={{ color: 'var(--gray-500)' }}>
                                            {question.description?.substring(0, 50)}...
                                        </small>
                                    </td>
                                    <td>
                                        {question.userName || 'Anonymous'}
                                        <br />
                                        <small>{question.userEmail}</small>
                                    </td>
                                    <td>{question.category?.name || 'N/A'}</td>
                                    <td>
                                        <select
                                            value={question.status}
                                            onChange={(e) => handleStatusChange(question._id, e.target.value)}
                                            style={{ padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="assigned">Assigned</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${question.priority}`}>
                                            {question.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            value={question.assignedExpert?._id || ''}
                                            onChange={(e) => handleAssignExpert(question._id, e.target.value)}
                                            style={{ padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}
                                        >
                                            <option value="">Unassigned</option>
                                            {experts.map((expert) => (
                                                <option key={expert._id} value={expert._id}>
                                                    {expert.userId?.name || 'Expert'}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-sm btn-delete"
                                            onClick={() => handleDelete(question._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default QuestionManagement;
