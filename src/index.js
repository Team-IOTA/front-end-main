import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ReactDOM } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Router>
      <App />
    </Router>
    
);

reportWebVitals();
