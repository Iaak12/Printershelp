import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../../services/categoryService';
import './AdminDashboard.css';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: 'FaLaptop'
    });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data.data || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await categoryService.update(editingId, formData);
            } else {
                await categoryService.create(formData);
            }
            fetchCategories();
            resetForm();
        } catch (err) {
            console.error('Error saving category:', err);
            alert('Failed to save category');
        }
    };

    const handleEdit = (category) => {
        setFormData({
            name: category.name,
            description: category.description,
            icon: category.icon
        });
        setEditingId(category._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await categoryService.delete(id);
                fetchCategories();
            } catch (err) {
                console.error('Error deleting category:', err);
                alert('Failed to delete category');
            }
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', icon: 'FaLaptop' });
        setEditingId(null);
        setShowForm(false);
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
                    <h1>Category Management</h1>
                    <div className="dashboard-nav">
                        <Link to="/admin/dashboard" className="dashboard-nav-link">Dashboard</Link>
                        <Link to="/admin/categories" className="dashboard-nav-link active">Categories</Link>
                        <Link to="/admin/questions" className="dashboard-nav-link">Questions</Link>
                        <Link to="/admin/experts" className="dashboard-nav-link">Experts</Link>
                    </div>
                </div>
            </div>

            <div className="container">
                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Cancel' : 'Add New Category'}
                    </button>
                </div>

                {showForm && (
                    <div className="data-table" style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <div className="table-header">
                            <h2>{editingId ? 'Edit Category' : 'Add New Category'}</h2>
                        </div>
                        <form onSubmit={handleSubmit} style={{ padding: 'var(--spacing-xl)' }}>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Icon (React Icon name)</label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="FaLaptop"
                                />
                            </div>
                            <div className="action-buttons">
                                <button type="submit" className="btn btn-primary">
                                    {editingId ? 'Update' : 'Create'}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="data-table">
                    <div className="table-header">
                        <h2>All Categories</h2>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Questions</th>
                                <th>Icon</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category._id}>
                                    <td><strong>{category.name}</strong></td>
                                    <td>{category.description}</td>
                                    <td>{category.questionCount || 0}</td>
                                    <td>{category.icon}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-sm btn-edit" onClick={() => handleEdit(category)}>
                                                Edit
                                            </button>
                                            <button className="btn-sm btn-delete" onClick={() => handleDelete(category._id)}>
                                                Delete
                                            </button>
                                        </div>
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

export default CategoryManagement;
