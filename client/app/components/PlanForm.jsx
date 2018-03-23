import PropTypes from 'prop-types';
import React from 'react';

import SegmentFieldContainer from '../containers/SegmentFieldContainer';

class PlanForm extends React.Component {
  render() {
    return (
      <div>
        <h1>Plan Builder</h1>
        <SegmentFieldContainer
          value={this.props.segments[0]}
          onChange={(val) => this.props.onSegmentChange(0, val)}
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
