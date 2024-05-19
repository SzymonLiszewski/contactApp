import { useEffect, useState, useContext } from 'react';
import React from 'react';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Login from './components/Login'
import DisplayContacts from './components/DisplayContacts'
import Register from './components/Register'
import Edit from './components/Edit'
import './Contacts.css';

import { AuthContext } from './AuthContext';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <Router>
            <React.Fragment>
                <Menu />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/home' element={<DisplayContacts />} />
                    <Route path='/edit/:id' element={<Edit />} />
                    <Route path='/' element={<Navigate to='/home' />} />
                </Routes>
                <Footer />
            </React.Fragment>
        </Router>
    );

}

export default App;