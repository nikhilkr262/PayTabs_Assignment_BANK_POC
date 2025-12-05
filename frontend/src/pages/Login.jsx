import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert('Please enter Username and Password');
            return;
        }

        try {
            const response = await fetch('http://localhost:8082/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('role', data.role);
                localStorage.setItem('username', data.username);

                if (data.role === 'ADMIN') {
                    navigate('/admin');
                } else if (data.role === 'CUSTOMER') {
                    if (data.cardNumber) {
                        localStorage.setItem('cardNumber', data.cardNumber);
                    }
                    navigate('/customer');
                }
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="title">Banking POC</h1>

                <div className="section">
                    <h2 className="subtitle">Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Username"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
