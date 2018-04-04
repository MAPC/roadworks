import 'babel-polyfill';
import 'es5-shim';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './../app/App';

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
);
