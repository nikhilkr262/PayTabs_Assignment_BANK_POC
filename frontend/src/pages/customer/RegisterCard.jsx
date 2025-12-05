import React, { useState } from 'react';

function RegisterCard() {
    const username = localStorage.getItem('username');
    const [regCardNumber, setRegCardNumber] = useState('');
    const [regPin, setRegPin] = useState('');
    const [regBalance, setRegBalance] = useState('');

    const handleRegisterCard = async (e) => {
        e.preventDefault();
        const payload = {
            cardNumber: regCardNumber,
            pin: regPin,
            balance: parseFloat(regBalance),
            username
        };

        try {
            const response = await fetch('http://localhost:8082/cards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Card Registered Successfully');
                setRegCardNumber('');
                setRegPin('');
                setRegBalance('');
            } else {
                const errorText = await response.text();
                alert('Registration Failed: ' + errorText);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="page-container">
            <div className="card">
                <h2 className="subtitle">Register New Card</h2>
                <form onSubmit={handleRegisterCard} className="transaction-form">
                    <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" className="input-field" value={regCardNumber} onChange={(e) => setRegCardNumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>PIN</label>
                        <input type="password" className="input-field" value={regPin} onChange={(e) => setRegPin(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Initial Balance</label>
                        <input type="number" className="input-field" value={regBalance} onChange={(e) => setRegBalance(e.target.value)} min="0" required />
                    </div>
                    <button type="submit" className="btn btn-secondary full-width">Register Card</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterCard;
