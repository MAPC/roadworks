import PropTypes from 'prop-types';
import React from 'react';

import MonthField from './fields/MonthField';
import YearField from './fields/YearField';
import SegmentFieldContainer from '../containers/SegmentFieldContainer';


class PlanForm extends React.Component {

  render() {

    const roads = this.props.segments.map((segment, i) => {
      return (
        <article className="road">
          <SegmentFieldContainer
            id={i}
          />
          <button className="x" onClick={() => this.props.removeSegment(segment)}>+</button>
        </article>
      );
    });

    return (
      <div className="component PlanForm">
        <div className="key-info">
          <div className="field">
            <label for="plan-name">Plan Name</label>
            <input name="plan-name" placeholder="Enter Plan Name ..." />
          </div>

          <div className="field">
            <label for="plan-type">Plan Type</label>
            <select name="plan-type">
              <option disabled selected>-- Select Plan Type --</option>
              <option value="moratorium">Moratorium</option>
            </select>
          </div>
        </div>

        <div className="timeframes">
          <article className="timeframe">
            <div className="timeframe-header">
              <h4>From <span>May 2018</span> to <span>September 2018</span></h4>

              <button class="minor" data-action="delete-timeframe">
                Delete Timeframe
              </button>
            </div>

            <div className="timeframe-columns">
              <div className="column">
                <div className="field minor">
                  <label for="start-date">Start Date</label>
                  <div className="multi-select">
                    <MonthField name="start-date-month" />
                    <YearField name="start-date-year" />
                  </div>
                </div>

                <div className="field minor">
                  <label for="end-date">End Date</label>
                  <div className="multi-select">
                    <MonthField name="end-date-month" />
                    <YearField name="end-date-year" />
                  </div>
                </div>
              </div>

              <div className="column minor">
                <label for="roads">Roads</label>
                <div className="roads">
                  {roads}
                </div>
              </div>
            </div>

            <button className="styled light" data-action="add-road" onClick={this.props.addSegment}>
              Add Road
            </button>
          </article>
        </div>

        <button className="styled light"  data-action="add-timeframe" onClick={this.props.addTimeframe}>
          Add Timeframe
        </button>
      </div>
    );
  }
}

PlanForm.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
};

export default PlanForm;
