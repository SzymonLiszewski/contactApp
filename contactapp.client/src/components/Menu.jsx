//import { useEffect, useState } from 'react';
import './Menu.css';

function Menu() {
    return (
        <nav>
            <ul className="menu">
                <li><a href="home">Home</a></li>
                <li><a href="login">login</a></li>
                <li><a href="services">Services</a></li>
                <li><a href="contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Menu;