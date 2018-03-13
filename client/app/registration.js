import 'babel-polyfill';
import 'es5-shim';
import ReactOnRails from 'react-on-rails';

import App from './App';
import store from './store/appStore';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
});

ReactOnRails.registerStore({
  store,
});
