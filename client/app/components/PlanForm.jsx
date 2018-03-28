import PropTypes from 'prop-types';
import React from 'react';

import SegmentFieldContainer from '../containers/SegmentFieldContainer';

class PlanForm extends React.Component {
  render() {
    return (
      <div>
        <h1>Plan Builder</h1>
        <SegmentFieldContainer
          segment={this.props.segments[0]}
          onRoadChange={(opt) => this.props.onSegmentRoadChange(0, opt.value)}
          onOrigChange={(opt) => this.props.onSegmentOrigChange(0, opt.value)}
          onDestChange={(opt) => this.props.onSegmentDestChange(0, opt.value)}
        />
      </div>
    );
  }
}

PlanForm.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
};

export default PlanForm;
