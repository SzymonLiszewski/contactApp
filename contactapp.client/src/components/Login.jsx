import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import {useContext } from 'react';
import { AuthContext } from '../AuthContext';
function Login() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Both fields are required');
            return;
        }

        logUser({ email, password });
        setError('');
    };

    return (
        <div className="flex-container">
            <div className="centered-content">
                <div className="login-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="submit-button" onClick={handleSubmit}>Login</button>
                    </form>
                </div>
            </div>
         </div>
    );

    function logUser(loginData) {
        fetch('api/account/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (response.ok) {
                console.log('Pomyœlnie zalogowano!');
                setIsLoggedIn(true);
                navigate('/home');
                alert('zalogowano');
               
            } else {
                console.log('Wyst¹pi³ b³¹d podczas logowania:', response.text());
                alert('nieprawidlowe haslo lub email');
            }
        })
        .catch(error => {
            console.error('Wyst¹pi³ b³¹d sieciowy:', error);
        });
    }
}

export default Login;
