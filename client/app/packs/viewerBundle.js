import ReactOnRails from 'react-on-rails';

import Viewer from '../bundles/Viewer/startup/Viewer';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Viewer,
});
