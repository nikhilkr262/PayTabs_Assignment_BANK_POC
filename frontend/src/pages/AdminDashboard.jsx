import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8082/transactions')
            .then(res => res.json())
            .then(data => setTransactions(data))
            .catch(err => console.error('Error fetching transactions:', err));
    }, []);

    return (
        <div className="dashboard-container">
            <div className="header">
                <div>
                    <h1 className="title" style={{ marginBottom: '0.5rem' }}>Super Admin Dashboard</h1>
                    <span className="user-greeting">Welcome, Admin</span>
                </div>
                <button onClick={() => navigate('/')} className="btn btn-danger">Logout</button>
            </div>

            <div className="table-container">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Card Number</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Reason</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx.id}>
                                <td>{tx.id}</td>
                                <td>{tx.cardNumber}</td>
                                <td>{tx.type}</td>
                                <td>Rs. {tx.amount}</td>
                                <td>
                                    <span className={`status-badge ${tx.status === 'SUCCESS' ? 'status-success' : 'status-failed'}`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td>{tx.failureReason || '-'}</td>
                                <td>{tx.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
