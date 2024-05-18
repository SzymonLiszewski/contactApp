//import { useEffect, useState } from 'react';
import './Menu.css';

function Menu() {
    return (
        <nav>
            <ul className="menu">
                <li><a href="home">Home</a></li>
                <li><a href="login">login</a></li>
                <li><a href="register">sign up</a></li>
            </ul>
        </nav>
    );
}

export default Menu;