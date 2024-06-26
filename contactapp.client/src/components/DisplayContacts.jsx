import { useEffect, useState } from 'react';
import '/src/Contacts.css'

function DisplayContacts() {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const [contacts, setContacts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const [expandedFields, setExpandedFields] = useState({});

    const handleFieldClick = (id) => {
        setExpandedFields(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const contents = contacts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : contacts.length == 0 ? <div>
            {isLoggedIn === 'true' ? <a href="/create">create new</a> : <p>list is empty. Log in to add new contacts</p>}</div>:
        <div className="data-list-container">
            <h2>Lista danych</h2>
            {isLoggedIn==='true' ? <a href="/create">create new</a> : null}
            {contacts.map(item => (
                <div key={item.id} className="data-item">
                    <div className="data-item-content" onClick={() => handleFieldClick(item.id)}>
                        <strong>{item.firstName} {item.lastName}</strong>
                        {isLoggedIn==='true' ? <a href={`/edit/${item.id}`}><img src="src/assets/edit.svg" alt="edit" width="20" height="20" className="icon" id="editIcon" /></a> : null}
                        {isLoggedIn==='true' ? <a><img src="src/assets/delete.svg" alt="delete" width="20" height="20" className="icon" onClick={() => deleteContact(item.id)} /></a> : null}
                    </div>
                    
                    {expandedFields[item.id] && (
                        <div className="expanded-fields">
                            <p>email address: {item.email}</p>
                            <p>password: {item.password}</p>
                            <p>category: {item.category}</p>
                            <p>subcategory: {item.subCategory}</p>
                            <p>phone number: {item.phoneNumber}</p>
                            <p>date of birth: {item.dateOfBirth}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>;

    return (
        <div className="flex-container">
            <div className="centered-content">
                <h1 id="tabelLabel">Contacts</h1>
                {contents}
            </div>
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('Contacts');
        const data = await response.json();
        setContacts(data);
    }

    async function deleteContact(id) {
        fetch('Contacts/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        populateWeatherData();
    }
}

export default DisplayContacts;