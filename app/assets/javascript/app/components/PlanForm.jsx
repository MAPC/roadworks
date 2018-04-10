import PropTypes from 'prop-types';
import React from 'react';

import YearField from './fields/YearField';
import MonthField from './fields/MonthField';
import SelectField from './fields/SelectField';
import TimeframeFieldContainer from '../containers/TimeframeFieldContainer';


class PlanForm extends React.Component {

  render() {
    const timeframes = this.props.timeframeIndicies.map((index) => {
      <TimeframeFieldContainer key={index} index={index} />
    });
    return (
      <div className="component PlanForm">
        <div className="key-info">
          <div className="field">
            <label htmlFor="plan-name">Plan Name</label>
            <input name="plan-name" placeholder="Enter Plan Name ..." />
          </div>

          <div className="field">
            <label htmlFor="plan-type">Plan Type</label>
            <SelectField name="plan-type">
              <option disabled selected>-- Select Plan Type --</option>
              <option value="paving">Paving</option>
              <option value="moratorium">Moratorium</option>
            </SelectField>
          </div>
        </div>

        <ol className="timeframes">
          {timeframes}
        </ol>

        <button className="styled light"  data-action="add-timeframe" onClick={this.props.addTimeframe}>
          <img src="/assets/calendar-dark.svg" />
          Add Timeframe
        </button>
      </div>
    );
  }
}

PlanForm.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  timeframeIndicies: PropTypes.array,
  onPlanNameChange: PropTypes.func.isRequired,
  onPlanTypeChange: PropTypes.func.isRequired,
  removeTimeframe: PropTypes.func.isRequired,
  addTimeframe: PropTypes.func.isRequired,
};

export default PlanForm;
