import PropTypes from 'prop-types';
import React from 'react';

import DropdownField from './DropdownField';
import ToggleField from './ToggleField';
import TextField from './TextField';

import enums from './../../constants/enums';
import capitalize from '../../util/capitalize';

class SegmentField extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSegment: false,
    };

    this.toggleIsSegment = this.toggleIsSegment.bind(this);
  }

  toggleIsSegment() {
    this.setState({ isSegment: !this.state.isSegment });
  }

  render() {
    const endpointLabels = {
      on: 'Address',
      off: 'Cross Street'
    };

    return (
      <div className="component SegmentField">
        <div className="road-selector">
          <DropdownField
            options={this.props.roadOptions}
            value={this.props.segment.road}
            onChange={this.props.onRoadChange}
            placeholder="-- Select Road --"
          />
          <ToggleField
            labels={{on: "Segment", off: "Whole Road" }}
            value={this.state.isSegment}
            onChange={this.toggleIsSegment}
          />
          <button className="x" onClick={() => this.props.removeSegment(this.props.segment)}>+</button>
        </div>

        {this.state.isSegment ? (
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
                value={this.props.segment.custom_nodes[this.props.segment.orig]
                    ? this.props.segment.custom_nodes[this.props.segment.orig].address
                    : ''}
                onChange={this.props.onOrigChange}
                placeholder="Address Number ..."
                debounce={500}
              />
            ) : (
              <DropdownField
                options={this.props.crossStreetOptions}
                value={this.props.segment.orig}
                onChange={(opt) => this.props.onOrigChange(opt.value)}
                disabled={!this.props.segment.road}
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
                value={this.props.segment.custom_nodes[this.props.segment.dest]
                    ? this.props.segment.custom_nodes[this.props.segment.dest].address
                    : null}
                placeholder="Address Number ..."
                onChange={this.props.onDestChange}
                debounce={500}
              />
            ) : (
              <DropdownField
                options={this.props.crossStreetOptions}
                value={this.props.segment.dest}
                onChange={(opt) => this.props.onDestChange(opt.value)}
                disabled={!this.props.segment.road}
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
