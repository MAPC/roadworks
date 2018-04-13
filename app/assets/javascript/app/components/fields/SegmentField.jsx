import PropTypes from 'prop-types';
import React from 'react';

import DropdownField from './DropdownField';
import ToggleField from './ToggleField';
import TextField from './TextField';

import enums from './../../constants/enums';
import capitalize from '../../util/capitalize';


class SegmentField extends React.Component {

  render() {
    const { timeframeIndex, index } = this.props;

    const endpointLabels = {
      on: 'Address',
      off: 'Cross Street'
    };

    return (
      <div className="component SegmentField">
        <div className="road-selector">
          <DropdownField
            name={`segment-${timeframeIndex}-${index}`}
            options={this.props.roadOptions}
            value={this.props.segment.road_id}
            onChange={this.props.onRoadChange}
            placeholder="-- Select Road --"
          />
          <ToggleField
            labels={{on: "Segment", off: "Whole Road" }}
            value={this.props.segment.is_segment}
            onChange={this.props.onTypeChange}
          />
          <button className="x" onClick={this.props.removeSegment}>+</button>
        </div>

        {this.props.segment.is_segment ? (
        <div className="endpoints">
          <div className="endpoint">
            <ToggleField
              labels={endpointLabels}
              classes='secondary'
              value={this.props.segment.is_orig_type_address}
              onChange={this.props.onOrigTypeChange}
            />
            {this.props.segment.is_orig_type_address ? (
              <TextField
                name={`segment-orig-${timeframeIndex}-${index}`}
                value={this.props.segment.custom_nodes[this.props.segment.orig]
                    ? this.props.segment.custom_nodes[this.props.segment.orig].address
                    : ''}
                onChange={this.props.onOrigChange}
                placeholder="Address Number ..."
                debounce={500}
              />
            ) : (
              <DropdownField
                name={`segment-orig-${timeframeIndex}-${index}`}
                options={this.props.crossStreetOptions}
                value={this.props.segment.orig}
                onChange={(opt) => this.props.onOrigChange(opt.value)}
                disabled={!this.props.segment.road_id}
                placeholder="-- Select Endpoint --"
              />
            )}
          </div>

          <div className="endpoint-delim">
            to
          </div>

          <div className="endpoint">
            <ToggleField
              labels={endpointLabels}
              classes='secondary'
              value={this.props.segment.is_dest_type_address}
              onChange={this.props.onDestTypeChange}
            />
            {this.props.segment.is_dest_type_address ? (
              <TextField
                name={`segment-dest-${timeframeIndex}-${index}`}
                value={this.props.segment.custom_nodes[this.props.segment.dest]
                    ? this.props.segment.custom_nodes[this.props.segment.dest].address
                    : ''}
                placeholder="Address Number ..."
                onChange={this.props.onDestChange}
                debounce={500}
              />
            ) : (
              <DropdownField
                name={`segment-dest-${timeframeIndex}-${index}`}
                options={this.props.crossStreetOptions}
                value={this.props.segment.dest}
                onChange={(opt) => this.props.onDestChange(opt.value)}
                disabled={!this.props.segment.road_id}
                placeholder="-- Select Endpoint --"
              />
            )}
          </div>
        </div>
        ) : null}
      </div>
    );
  }
}

SegmentField.propTypes = {
  roadOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
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
