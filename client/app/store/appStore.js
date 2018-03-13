import { applyMiddleware, createStore } from 'redux';
import middleware from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (railsProps) => (
  createStore(
    rootReducer,
    railsProps,
    composeWithDevTools(
      applyMiddleware(middleware)
    )
  )
);

export default configureStore;
