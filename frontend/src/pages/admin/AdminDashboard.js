import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaUsers, FaFolderOpen } from 'react-icons/fa';
import { categoryService } from '../../services/categoryService';
import { questionService } from '../../services/questionService';
import { expertService } from '../../services/expertService';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalQuestions: 0,
        totalExperts: 0,
        totalCategories: 0,
        onlineExperts: 0
    });
    const [recentQuestions, setRecentQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [questions, experts, categories, onlineData] = await Promise.all([
                questionService.getAll({ limit: 5 }),
                expertService.getAll(),
                categoryService.getAll(),
                expertService.getOnlineCount()
            ]);

            setStats({
                totalQuestions: questions.total || 0,
                totalExperts: experts.count || 0,
                totalCategories: categories.count || 0,
                onlineExperts: onlineData.data?.onlineCount || 0
            });

            setRecentQuestions(questions.data || []);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
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

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div className="container">
                    <h1>Admin Dashboard</h1>
                    <p>Manage your tech support platform</p>
                    <div className="dashboard-nav">
                        <Link to="/admin/dashboard" className="dashboard-nav-link active">
                            Dashboard
                        </Link>
                        <Link to="/admin/categories" className="dashboard-nav-link">
                            Categories
                        </Link>
                        <Link to="/admin/questions" className="dashboard-nav-link">
                            Questions
                        </Link>
                        <Link to="/admin/experts" className="dashboard-nav-link">
                            Experts
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'var(--gradient-blue)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            <FaQuestionCircle />
                        </div>
                        <div className="stat-value">{stats.totalQuestions}</div>
                        <div className="stat-label">Total Questions</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'var(--gradient-purple)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            <FaUsers />
                        </div>
                        <div className="stat-value">{stats.totalExperts}</div>
                        <div className="stat-label">Total Experts</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'var(--gradient-teal)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            <FaFolderOpen />
                        </div>
                        <div className="stat-value">{stats.totalCategories}</div>
                        <div className="stat-label">Categories</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'var(--gradient-sunset)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            <FaUsers />
                        </div>
                        <div className="stat-value">{stats.onlineExperts}</div>
                        <div className="stat-label">Experts Online</div>
                    </div>
                </div>

                <div className="data-table">
                    <div className="table-header">
                        <h2>Recent Questions</h2>
                        <Link to="/admin/questions" className="btn btn-primary">
                            View All
                        </Link>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>User</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentQuestions.map((question) => (
                                <tr key={question._id}>
                                    <td>{question.title}</td>
                                    <td>{question.category?.name || 'N/A'}</td>
                                    <td>{question.userName || question.userEmail}</td>
                                    <td>
                                        <span className={`status-badge status-${question.status}`}>
                                            {question.status}
                                        </span>
                                    </td>
                                    <td>{new Date(question.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
