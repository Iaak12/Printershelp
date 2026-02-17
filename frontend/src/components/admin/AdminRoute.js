import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = authService.isAuthenticated();
    const user = authService.getCurrentUser();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    if (user && user.role !== 'admin') {
        // Optional: Redirect to a "Not Authorized" page or Home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
