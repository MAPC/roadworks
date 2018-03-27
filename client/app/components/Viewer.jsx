import PropTypes from 'prop-types';
import React from 'react';

import MapContainer from '../containers/MapContainer';
import PlanFormContainer from '../containers/PlanFormContainer';

class Viewer extends React.Component {
  render() {
    return (
      <div>
        <MapContainer />
        <PlanFormContainer />
      </div>
    );
  }
}

Viewer.propTypes = {
};

export default Viewer;
