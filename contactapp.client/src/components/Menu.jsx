//import { useEffect, useState } from 'react';
import { useEffect } from 'react';
import './Menu.css';


function Menu() {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    useEffect(() => {
        //reload();
    }, [localStorage.getItem('isLoggedIn')]);
    return (
        <nav>
            <ul className="menu">
                <li><a href="/home">Home</a></li>
                {isLoggedIn==='true' ? <li><a href="/logout">log out</a></li> : <li><a href="/login">login</a></li>}
                {isLoggedIn === 'true' ? null: <li><a href="/register">sign up</a></li>}
            </ul>
        </nav>
    );
}

export default Menu;