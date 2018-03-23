import PropTypes from 'prop-types';
import React from 'react';

import MapContainer from '../containers/MapContainer';
import PlanFormContainer from '../containers/PlanFormContainer';

class Viewer extends React.Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
        <MapContainer />
        <PlanFormContainer />
      </div>
    );
  }
}

Viewer.propTypes = {
};

export default Viewer;
