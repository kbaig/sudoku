import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import { store } from './redux';

const appWithProviders = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(appWithProviders, document.getElementById('root'));
