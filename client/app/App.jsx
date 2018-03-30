import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'

import configureStore from './store/appStore';
import ViewerContainer from './containers/ViewerContainer';

import './assets/styles/app.scss';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.

export default (props) => {
  const history = createHistory();
  return (
    <Provider store={configureStore(props, history)}>
      <ConnectedRouter history={history}>
        <Route path="/:city" component={ViewerContainer} />
      </ConnectedRouter>
    </Provider>
  );
};
