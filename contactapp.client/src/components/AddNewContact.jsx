import { useEffect, useState } from 'react';
import '/src/Contacts.css'
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { format } from 'date-fns';

function AddNewContact() {
    const [contactData, setContactData] = useState();
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');

    
    //const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setsubCategory] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [error, setError] = useState('');


    const { id } = useParams();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('email and password are required');
            return;
        }
        const formattedDate = dateOfBirth ? format(dateOfBirth, 'yyyy-MM-dd') : '';
        console.log(formattedDate);
        postData({ id, firstName, lastName, email, password, category,subCategory, phoneNumber, dateOfBirth });
        setError('');
    };

    return (
        <div className="flex-container">
            <div className="centered-content">
                <div className="login-container">
                    <h2>Edit contact</h2>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">date of birth:</label>
                            <input
                                type="text"
                                id="dateOfBirth"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                className="form-input"
                            />

                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">first name (optional):</label>
                            <input
                                type="text"
                                id="firstName"
                                onChange={(e) => setfirstName(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">last name (optional):</label>
                            <input
                                type="text"
                                id="lastName"
                                onChange={(e) => setlastName(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <input
                                type="text"
                                id="category"
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="subCatefory">subcategory:</label>
                            <input
                                type="text"
                                id="subCategory"
                                value={subCategory}
                                onChange={(e) => setsubCategory(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone number:</label>
                            <input
                                type="text"
                                id="phoneNumebr"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );

    function postData(data) {
        fetch('../Contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    alert('contact created succesfully');
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
                else if ('dateOfBirth' in text.errors) {
                    setError(text.errors.dateOfBirth[0]);
                }
                else if ('phoneNumber' in text.errors) {
                    setError(text.errors.phoneNumber[0]);
                }
            })
    }

}


export default AddNewContact;