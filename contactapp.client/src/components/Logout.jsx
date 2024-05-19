import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', false);
        navigate('/');
    });

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
}

export default Logout;
