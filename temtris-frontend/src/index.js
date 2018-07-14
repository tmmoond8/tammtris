import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/base.scss';

Object.prototype.deepCopy = function(target) {
  return Object.assign(Object.create(target), target);
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
