import React, { useState } from 'react';

function Transaction() {
    const [txCardNumber, setTxCardNumber] = useState('');
    const [txPin, setTxPin] = useState('');
    const [txAmount, setTxAmount] = useState('');
    const [txType, setTxType] = useState('topup');

    const handleTransaction = async (e) => {
        e.preventDefault();
        const payload = {
            cardNumber: txCardNumber,
            pin: txPin,
            amount: parseFloat(txAmount),
            type: txType
        };

        try {
            const response = await fetch('http://localhost:8081/transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Transaction Successful');
                setTxAmount('');
                setTxPin('');
            } else {
                const errorText = await response.text();
                alert('Transaction Failed: ' + errorText);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="page-container">
            <div className="card">
                <h2 className="subtitle">Perform Transaction</h2>
                <form onSubmit={handleTransaction} className="transaction-form">
                    <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" className="input-field" value={txCardNumber} onChange={(e) => setTxCardNumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select className="input-field" value={txType} onChange={(e) => setTxType(e.target.value)}>
                            <option value="topup">Top Up</option>
                            <option value="withdraw">Withdraw</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input type="number" className="input-field" value={txAmount} onChange={(e) => setTxAmount(e.target.value)} min="1" required />
                    </div>
                    <div className="form-group">
                        <label>PIN</label>
                        <input type="password" className="input-field" value={txPin} onChange={(e) => setTxPin(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary full-width">Submit Transaction</button>
                </form>
            </div>
        </div>
    );
}

export default Transaction;
