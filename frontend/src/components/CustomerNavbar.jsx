import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function CustomerNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>PayTabs Banking App</h1>
                <span className="user-greeting">Welcome, {username}</span>
            </div>
            <div className="navbar-links">
                <Link to="/customer/register" className={`nav-link ${isActive('/customer/register') ? 'active' : ''}`}>
                    Register Card
                </Link>
                <Link to="/customer/transaction" className={`nav-link ${isActive('/customer/transaction') ? 'active' : ''}`}>
                    Transaction
                </Link>
                <Link to="/customer/history" className={`nav-link ${isActive('/customer/history') ? 'active' : ''}`}>
                    History
                </Link>
                <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
            </div>
        </nav>
    );
}

export default CustomerNavbar;
