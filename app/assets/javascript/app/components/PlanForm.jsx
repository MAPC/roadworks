import PropTypes from 'prop-types';
import React from 'react';

import TextField from './fields/TextField';
import SelectField from './fields/SelectField';
import TimeframeFieldContainer from '../containers/TimeframeFieldContainer';


class PlanForm extends React.Component {

  render() {
    const timeframes = this.props.timeframeIndicies.map((index) => (
      <TimeframeFieldContainer key={index} index={index} />
    ));
    const planTypeOptions = [
      { label: 'Paving', value: 'PAVING'},
      { label: 'Moratorium', value: 'MORATORIUM'},
      { label: 'Water', value: 'WATER'},
      { label: 'Sewer', value: 'SEWER'},
      { label: 'Electrical', value: 'ELECTRICAL'},
      { label: 'Communications', value: 'COMMUNICATIONS'},
      { label: 'Gas', value: 'GAS'},
    ];
    const planTypePlaceholder = '-- Select Plan Type --';
    return (
      <div className="component PlanForm">
        <div className="key-info">
          <div className="field">
            <label htmlFor="plan-name">Plan Name</label>
            <TextField
              name="plan-name"
              placeholder="Enter Plan Name ..."
              value={this.props.name}
              onChange={(value) => this.props.onPlanNameChange(value)}
              debounce={500}
            />
          </div>

          <div className="field">
            <label htmlFor="plan-type">Plan Type</label>
            <SelectField
              name="plan-type"
              options={planTypeOptions}
              placeholder={planTypePlaceholder}
              value={this.props.type}
              onChange={this.props.onPlanTypeChange}
            />
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
  addTimeframe: PropTypes.func.isRequired,
};

export default PlanForm;
