import React, { useState, useEffect } from 'react';

function History() {
    const [transactions, setTransactions] = useState([]);
    const [cards, setCards] = useState([]);
    const username = localStorage.getItem('username');

    useEffect(() => {
        if (username) {
            fetchData();
        }
    }, [username]);

    const fetchData = () => {
        // Fetch Cards
        fetch(`http://localhost:8082/cards/user/${username}`)
            .then(res => res.json())
            .then(data => setCards(data))
            .catch(err => console.error(err));

        // Fetch History
        fetch(`http://localhost:8082/transactions/user/${username}`)
            .then(res => res.json())
            .then(data => setTransactions(data))
            .catch(err => console.error(err));
    };

    return (
        <div className="page-container">
            <div className="card full-width-card">
                <h2 className="subtitle">Your Cards & Balance</h2>
                <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {cards.map(card => (
                        <div key={card.cardNumber} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px', background: '#f8f9fa' }}>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>Card Number</div>
                            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{card.cardNumber}</div>
                            <div style={{ fontSize: '0.9rem', color: '#666' }}>Balance</div>
                            <div style={{ fontSize: '1.2rem', color: '#27ae60', fontWeight: 'bold' }}>Rs. {card.balance}</div>
                        </div>
                    ))}
                </div>

                <h2 className="subtitle">Transaction History</h2>
                <div className="table-wrapper">
                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Card Number</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Reason</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => (
                                <tr key={tx.id}>
                                    <td>{username}</td>
                                    <td>{tx.cardNumber}</td>
                                    <td>Rs. {tx.amount}</td>
                                    <td>{tx.type}</td>
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
        </div>
    );
}

export default History;
