import PropTypes from 'prop-types';
import React from 'react';

import DropdownField from './DropdownField';
import ToggleField from './ToggleField';
import TextField from './TextField';

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
        {this.props.segment.origType == enums.SEGMENT_END_POINT_TYPES.NODE ? (
          <DropdownField
            options={this.props.crossStreetOptions}
            value={this.props.segment.orig}
            onChange={(opt) => this.props.onOrigChange(opt.value)}
            disabled={!this.props.segment.road}
          />
        ) : (
          <TextField
            value={this.props.segment.orig}
            onChange={this.props.onOrigChange}
          />
        )}
        <ToggleField
          value={this.props.segment.destType == enums.SEGMENT_END_POINT_TYPES.ADDRESS}
          onChange={value => this.props.onDestTypeChange(value
              ? enums.SEGMENT_END_POINT_TYPES.NODE
              : enums.SEGMENT_END_POINT_TYPES.ADDRESS)}
        />
        {this.props.segment.destType == enums.SEGMENT_END_POINT_TYPES.NODE ? (
          <DropdownField
            options={this.props.crossStreetOptions}
            value={this.props.segment.dest}
            onChange={(opt) => this.props.onDestChange(opt.value)}
            disabled={!this.props.segment.road}
          />
        ) : (
          <TextField
            value={this.props.segment.dest}
            onChange={this.props.onDestChange}
          />
        )}
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
