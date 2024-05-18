import { useEffect, useState } from 'react';
import React from 'react';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Login from './components/Login'
import DisplayContacts from './components/DisplayContacts'
import './Contacts.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {

    return (
        <Router>
            <React.Fragment>
                <Menu />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/home' element={<DisplayContacts />} />
                    <Route path='/' element={<Navigate to='/home' />} />
                </Routes>
                <Footer />
            </React.Fragment>
        </Router>
    );

}

export default App;