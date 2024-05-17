import { useEffect, useState } from 'react';
//import './App.css';
import Menu from './Menu';
import './Contacts.css';

function App() {
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.firstName}>
                        <td>{forecast.lastName}</td>
                        <td>{forecast.email}</td>
                        <td>{forecast.category}</td>
                        <td>{forecast.phoneNumber}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <div>
                <Menu />
            </div>
            <div className="flex-container">
                <div className="centered-content">
                <h1 id="tabelLabel">Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                    {contents}
                </div>
            </div>
        </div>
    );
    
    async function populateWeatherData() {
        const response = await fetch('Contacts');
        const data = await response.json();
        setForecasts(data);
    }
}

export default App;