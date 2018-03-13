import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

const configureStore = (railsProps) => (
  createStore(
    rootReducer,
    railsProps,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default configureStore;
