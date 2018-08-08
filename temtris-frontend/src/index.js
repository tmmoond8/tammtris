import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './styles/main.scss';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />  
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
