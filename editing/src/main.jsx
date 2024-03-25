import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import configureStorage from './redux/storage.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={configureStorage()}>
    <App />
  </Provider>
)