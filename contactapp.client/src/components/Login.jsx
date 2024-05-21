import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

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
        var logged = false;
        fetch('api/account/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('login succesfull');
                    sessionStorage.setItem('isLoggedIn', true);
                    logged = true;
                    console.log(isLoggedIn);
                } return response.text();
            })
            .then(text => {
                if (logged) {
                    alert('zalogowano');
                    sessionStorage.setItem('jwtToken', text);
                    navigate('/home');
                }
                else {
                    alert("incorrect email or password")
                }
                })
        .catch(error => {
            console.error(error);
        });
    }
}

export default Login;
