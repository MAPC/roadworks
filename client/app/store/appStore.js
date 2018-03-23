import { applyMiddleware, createStore, compose } from 'redux';
import middleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(middleware)
    )
  )
};

export default configureStore;
