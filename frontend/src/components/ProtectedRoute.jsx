import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    if (!role || !username) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Redirect to appropriate dashboard based on actual role
        if (role === 'ADMIN') return <Navigate to="/admin" replace />;
        if (role === 'CUSTOMER') return <Navigate to="/customer" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
