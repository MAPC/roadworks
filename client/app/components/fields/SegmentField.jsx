import PropTypes from 'prop-types';
import React from 'react';

import DropdownField from './DropdownField';
import ToggleField from './ToggleField';

import enums from './../../constants/enums';

class SegmentField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="segmentfield">
        <DropdownField
          options={this.props.roadOptions}
          value={this.props.segment.road}
          onChange={this.props.onRoadChange}
        />
        <ToggleField
          value={this.props.segment.origType == enums.SEGMENT_END_POINT_TYPES.ADDRESS}
          onChange={value => this.props.onOrigTypeChange(value
              ? enums.SEGMENT_END_POINT_TYPES.NODE
              : enums.SEGMENT_END_POINT_TYPES.ADDRESS)}
        />
        <DropdownField
          options={this.props.crossStreetOptions}
          value={this.props.segment.orig}
          onChange={this.props.onOrigChange}
          disabled={!this.props.segment.road}
        />
        <ToggleField
          value={this.props.segment.destType == enums.SEGMENT_END_POINT_TYPES.ADDRESS}
          onChange={value => this.props.onDestTypeChange(value
              ? enums.SEGMENT_END_POINT_TYPES.NODE
              : enums.SEGMENT_END_POINT_TYPES.ADDRESS)}
        />
        <DropdownField
          options={this.props.crossStreetOptions}
          value={this.props.segment.dest}
          onChange={this.props.onDestChange}
          disabled={!this.props.segment.road}
        />
      </div>
    );
  }
}

SegmentField.propTypes = {
  roadOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  crossStreetOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  segment: PropTypes.object.isRequired,
  onRoadChange: PropTypes.func.isRequired,
  onOrigTypeChange: PropTypes.func.isRequired,
  onOrigChange: PropTypes.func.isRequired,
  onDestTypeChange: PropTypes.func.isRequired,
  onDestChange: PropTypes.func.isRequired,
};

export default SegmentField;
