import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import store from './redux/store/store'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './ThemeConfig';

import axios from 'axios'

axios.defaults.baseURL = "https://markets-center-api.up.railway.app" || process.env.REACT_APP_API;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
