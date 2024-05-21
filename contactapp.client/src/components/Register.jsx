import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [error, setError] = useState('');

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('email and password are required');
            return;
        }

        registerUser({ email, firstName, lastName, password });
        setError('');
    };

    return (
        <div className="flex-container">
            <div className="centered-content">
                <div className="login-container">
                    <h2>Sign up</h2>
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
                            <label htmlFor="firstName">first name (optional):</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setfirstName(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">last name (optional):</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setlastName(e.target.value)}
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

    function registerUser(loginData) {
        fetch('api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('siged up succesfully');
                    logUser({ email, password })
                    navigate('/home');
                    alert('pomyslnie utworzono nowe konto');

                }
                return response.json();
            })
            .then(text => {
                console.log(text.errors)
                if ('email' in text.errors) {
                    setError(text.errors.email[0]);
                }
                else if ('password' in text.errors) {
                    setError(text.errors.password[0]);
                }
            })
            .catch(error => {
                console.error('error:', error);
            });
    }

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
                    //alert('zalogowano');
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

export default Register;
