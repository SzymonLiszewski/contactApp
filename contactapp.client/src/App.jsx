import { useEffect, useState } from 'react';
import React from 'react';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Login from './components/Login'
import DisplayContacts from './components/DisplayContacts'
import Register from './components/Register'
import Edit from './components/Edit'
import AddNewContact from './components/AddNewContact'
import Logout from './components/Logout'
import './Contacts.css';



import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return (
        <Router>
            <React.Fragment>
                <Menu />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/home' element={<div><Menu /> <DisplayContacts /></div>} />
                    <Route path='/edit/:id' element={<Edit />} />
                    <Route path='/create' element={<AddNewContact />} />
                    <Route path='/' element={<Navigate to='/home' />} />
                </Routes>
            </React.Fragment>
        </Router>
    );

}

export default App;