import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/appStore';
import ViewerContainer from './containers/ViewerContainer';

import './assets/styles/app.scss';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.

export default (props) => {
  return (
    <Provider store={ReactOnRails.getStore('store')}>
      <ViewerContainer />
    </Provider>
  );
};
