import { useEffect, useState } from 'react';
import '/src/Contacts.css'

function DisplayContacts() {
    const [forecasts, setForecasts] = useState();

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

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div className="data-list-container">
            <h2>Lista danych</h2>
            {forecasts.map(item => (
                <div key={item.id} className="data-item">
                    <div className="data-item-content" onClick={() => handleFieldClick(item.id)}>
                        <strong>{item.firstName} {item.lastName}</strong>
                        <a href="/login"><img src="src/assets/edit.svg" alt="edit" width="20" height="20" className="icon" id="editIcon"/></a>
                        <a><img src="src/assets/delete.svg" alt="delete" width="20" height="20" className="icon" onClick={()=>deleteContact(item.id)} /></a>
                    </div>
                    {expandedFields[item.id] && (
                        <div className="expanded-fields">
                            <p>email address: {item.email}</p>
                            <p>password: {item.password}</p>
                            <p>category: {item.category}</p>
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
        setForecasts(data);
    }

    async function deleteContact(id) {
        console.log(id);
        fetch('Contacts/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        populateWeatherData();
    }
}

export default DisplayContacts;