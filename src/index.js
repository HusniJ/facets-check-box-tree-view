import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'fontsource-roboto';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
