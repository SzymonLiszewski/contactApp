import { useEffect, useState } from 'react';
import '/src/Contacts.css'
import { useParams } from 'react-router-dom';

function Edit() {
    const [contactData, setContactData] = useState();

    //const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [category, setCategory] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [error, setError] = useState('');

    const { id } = useParams();

    useEffect(() => {
        getData();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('email and password are required');
            return;
        }

        editData({ id, firstName, lastName, email, password, category, phoneNumber, dateOfBirth });
        setError('');
    };

    return (
        <div className="flex-container">
            <div className="centered-content">
                <div className="login-container">
                    <h2>Edit contact</h2>
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
                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <input
                                type="text"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone number:</label>
                            <input
                                type="text"
                                id="phoneNumebr"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="form-input"
                            />
                        </div>
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
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );

    function getData() {
        console.log(id);
        fetch('../Contacts/1', {
            headers: {
                method: 'Get',
                Accept: 'application/json'
            }
        })
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setEmail(data.email);
                setfirstName(data.firstName);
                setlastName(data.lastName);
                setPassword(data.password);
                setCategory(data.category);
                setPhoneNumber(data.phoneNumber);
                setDateOfBirth(data.dateOfBirth);
            })
            .catch(error => {
                setError(error);
            });
    }

    function editData(data) {
        fetch('../Contacts/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                console.log('data modified succesfully');
            }
        })
    }

}


export default Edit;