import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import Menu from './Menu.jsx'
import './index.css'
import { AuthProvider } from './AuthContext';

//import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
  </React.StrictMode>,
)
