import { createStore, combineReducers } from 'redux';
import { defaultModules} from './modules';

const configure = () => {
  const store = createStore(combineReducers(defaultModules));
  return store;
}

export default configure;