import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CustomerNavbar from '../components/CustomerNavbar';

function CustomerDashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    useEffect(() => {
        if (!username) {
            navigate('/');
        }
    }, [username, navigate]);

    return (
        <div className="dashboard-layout">
            <CustomerNavbar />
            <div className="content-container">
                <Outlet />
            </div>
        </div>
    );
}

export default CustomerDashboard;
