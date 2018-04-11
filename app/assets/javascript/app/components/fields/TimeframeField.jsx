import PropTypes from 'prop-types';
import React from 'react';

import MonthYearField from './MonthYearField';
import SegmentFieldContainer from '../../containers/SegmentFieldContainer';

class TimeframeField extends React.Component {

  render() {
    const segments = this.props.segmentIndicies.map((index) => (
      <SegmentFieldContainer
        key={index}
        timeframeIndex={this.props.index}
        index={index}
      />
    ));
    const startDateDisplay = this.props.start
        ? new Date(this.props.start)
            .toLocaleString('en-us', { month: "long", year: 'numeric' })
        : 'Unknown Date';
    const endDateDisplay = this.props.end
        ? new Date(this.props.end)
            .toLocaleString('en-us', { month: "long", year: 'numeric' })
        : 'Unknown Date';
    return (
      <div className="component TimeframeField">
        <div className="timeframe-header">
          <h4>From <span>{startDateDisplay}</span> to <span>{endDateDisplay}</span></h4>

          <button
            className="minor"
            data-action="delete-timeframe"
            onClick={this.props.removeTimeframe}
          >
            Delete Timeframe
          </button>
        </div>

        <div className="timeframe-columns">
          <div className="column">
            <div className="field minor">
              <label htmlFor="start-date">Start Date</label>
              <MonthYearField
                monthName="start-date-month"
                yearName="start-date-year"
                value={this.props.start}
                onChange={this.props.onTimeframeStartChange}
              />
            </div>

            <div className="field minor">
              <label htmlFor="end-date">End Date</label>
              <MonthYearField
                monthName="end-date-month"
                yearName="end-date-year"
                value={this.props.end}
                onChange={this.props.onTimeframeEndChange}
              />
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
  addSegment: PropTypes.func.isRequired,
};

export default TimeframeField;
