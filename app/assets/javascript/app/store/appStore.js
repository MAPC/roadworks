import { applyMiddleware, createStore, compose } from 'redux';
import middleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createHistory();

export const store = ((initialState, history) => {
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
})({}, history);
