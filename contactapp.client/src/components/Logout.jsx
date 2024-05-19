import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import App from '../App'


function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', false);
        navigate('/home');
    });

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
}

export default Logout;
