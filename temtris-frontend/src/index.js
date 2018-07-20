import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/base.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />  
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
