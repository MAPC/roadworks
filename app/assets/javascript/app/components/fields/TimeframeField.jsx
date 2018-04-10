import PropTypes from 'prop-types';
import React from 'react';

import YearField from './fields/YearField';
import MonthField from './fields/MonthField';
import SelectField from './fields/SelectField';
import SegmentFieldContainer from '../containers/SegmentFieldContainer';

class TimeframeField extends React.Component {

  render() {
    const segments = this.props.segmentIndicies.map((index) => (
      <SegmentFieldContainer
        key={index}
        timeframeIndex={this.props.timeframeIndex}
        index={index}
      />
    ));

    return (
      <div className="timeframe">
        <div className="timeframe-header">
          <h4>From <span>May 2018</span> to <span>September 2018</span></h4>

          <button className="minor" data-action="delete-timeframe">
            Delete Timeframe
          </button>
        </div>

        <div className="timeframe-columns">
          <div className="column">
            <div className="field minor">
              <label htmlFor="start-date">Start Date</label>
              <div className="multi-select">
                <MonthField name="start-date-month" />
                <YearField name="start-date-year" />
              </div>
            </div>

            <div className="field minor">
              <label htmlFor="end-date">End Date</label>
              <div className="multi-select">
                <MonthField name="end-date-month" />
                <YearField name="end-date-year" />
              </div>
            </div>
          </div>

          <div className="column minor">
            <label htmlFor="roads">Roads</label>
            <div className="roads">
              {segments}
            </div>
          </div>
        </div>

        <button className="styled light" data-action="add-road" onClick={this.props.addSegment}>
          <img src="/assets/road-2.svg" />
          Add Road
        </button>
      </div>
    );
  }
}

TimeframeField.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  segmentIndicies: PropTypes.array,
  onTimeframeStartChange: PropTypes.func.isRequired,
  onTimeframeEndChange: PropTypes.func.isRequired,
  removeSegment: PropTypes.func.isRequired,
  addSegment: PropTypes.func.isRequired,
};

export default TimeframeField;
