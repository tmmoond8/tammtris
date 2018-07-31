import { createStore, combineReducers } from 'redux';
import { defaultModules} from './modules';

const configure = () => {
  const store = createStore(combineReducers(defaultModules), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return store;
}

export default configure;