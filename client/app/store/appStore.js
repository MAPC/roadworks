import { applyMiddleware, createStore, compose } from 'redux';
import middleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (initialState, history) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        middleware,
        routerMiddleware(history)
      )
    )
  )
};

export default configureStore;
