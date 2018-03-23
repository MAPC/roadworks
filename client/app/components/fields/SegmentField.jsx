import PropTypes from 'prop-types';
import React from 'react';

import DropdownField from './DropdownField.jsx';

class SegmentField extends React.Component {
  constructor(props) {
    super(props);
    this.onRoadChange = this.onRoadChange.bind(this);
    this.onOrigCrossStreetChange = this.onOrigCrossStreetChange.bind(this);
    this.onDestCrossStreetChange = this.onDestCrossStreetChange.bind(this);
  }

  onRoadChange(newRoad) {
    this.props.onChange(Object.assign({}, this.props.value, {
      road: newRoad.value,
    }));
  }

  onOrigCrossStreetChange(newRoad) {
    this.props.onChange(Object.assign({}, this.props.value, {
      origCrossStreet: newRoad.value,
    }));
  }

  onDestCrossStreetChange(newRoad) {
    this.props.onChange(Object.assign({}, this.props.value, {
      destCrossStreet: newRoad.value,
    }));
  }

  render() {
    return (
      <div className="segmentfield">
        <DropdownField
          options={this.props.roadOptions}
          value={this.props.value.road}
          onChange={this.onRoadChange}
        />
        <DropdownField
          options={this.props.crossStreetOptions}
          value={this.props.value.origCrossStreet}
          onChange={this.onOrigCrossStreetChange}
        />
        <DropdownField
          options={this.props.crossStreetOptions}
          value={this.props.value.destCrossStreet}
          onChange={this.onDestCrossStreetChange}
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
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SegmentField;
