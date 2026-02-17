import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { expertService } from '../../services/expertService';
import { categoryService } from '../../services/categoryService';
import './AdminDashboard.css';

const ExpertManagement = () => {
    const [experts, setExperts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [expertsData, categoriesData] = await Promise.all([
                expertService.getAll(),
                categoryService.getAll()
            ]);

            setExperts(expertsData.data || []);
            setCategories(categoriesData.data || []);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusToggle = async (id, currentStatus) => {
        try {
            await expertService.updateStatus(id, !currentStatus);
            fetchData();
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update expert status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expert?')) {
            try {
                await expertService.delete(id);
                fetchData();
            } catch (err) {
                console.error('Error deleting expert:', err);
                alert('Failed to delete expert');
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
                    <h1>Expert Management</h1>
                    <div className="dashboard-nav">
                        <Link to="/admin/dashboard" className="dashboard-nav-link">Dashboard</Link>
                        <Link to="/admin/categories" className="dashboard-nav-link">Categories</Link>
                        <Link to="/admin/questions" className="dashboard-nav-link">Questions</Link>
                        <Link to="/admin/experts" className="dashboard-nav-link active">Experts</Link>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="data-table">
                    <div className="table-header">
                        <h2>All Experts ({experts.length})</h2>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Specializations</th>
                                <th>Rating</th>
                                <th>Questions</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {experts.map((expert) => (
                                <tr key={expert._id}>
                                    <td>
                                        <strong>{expert.userId?.name || 'N/A'}</strong>
                                        <br />
                                        <small style={{ color: 'var(--gray-500)' }}>
                                            {expert.yearsOfExperience} years exp.
                                        </small>
                                    </td>
                                    <td>{expert.userId?.email || 'N/A'}</td>
                                    <td>
                                        {expert.specializations?.map((spec) => (
                                            <span
                                                key={spec._id}
                                                style={{
                                                    display: 'inline-block',
                                                    padding: '0.25rem 0.5rem',
                                                    background: 'var(--gray-100)',
                                                    borderRadius: 'var(--radius-sm)',
                                                    marginRight: '0.25rem',
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {spec.name}
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        <strong style={{ color: 'var(--accent-orange)' }}>
                                            ⭐ {expert.rating?.toFixed(1) || '5.0'}
                                        </strong>
                                    </td>
                                    <td>
                                        {expert.resolvedQuestions || 0} / {expert.totalQuestions || 0}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleStatusToggle(expert._id, expert.isOnline)}
                                            style={{
                                                padding: '0.375rem 0.75rem',
                                                borderRadius: 'var(--radius-full)',
                                                border: 'none',
                                                background: expert.isOnline ? 'var(--success)' : 'var(--gray-400)',
                                                color: 'var(--white)',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {expert.isOnline ? 'Online' : 'Offline'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-sm btn-delete"
                                            onClick={() => handleDelete(expert._id)}
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

export default ExpertManagement;
