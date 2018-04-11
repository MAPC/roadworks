import React from 'react';

import SelectField from './SelectField';

class MonthYearField extends React.Component {
  constructor(props) {
    super(props);
    this.monthOptions = [
      { label: 'January', value: '0' },
      { label: 'February', value: '1' },
      { label: 'March', value: '2' },
      { label: 'April', value: '3' },
      { label: 'May', value: '4' },
      { label: 'June', value: '5' },
      { label: 'July', value: '6' },
      { label: 'August', value: '7' },
      { label: 'September', value: '8' },
      { label: 'October', value: '9' },
      { label: 'November', value: '10' },
      { label: 'December', value: '11' },
    ];
    const startYear = this.props.startYear || (new Date()).getFullYear();
    const range = this.props.range || 25;
    this.yearOptions = (new Array(range)).fill(null).map((_, i) => ({
      label: (startYear + i).toString(),
      value: (startYear + i).toString(),
    }));
    this.state = {
      month: 'NONE',
      year: 'NONE',
    };
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
  }

  onMonthChange(month) {
    this.setState({
      month: month,
    }, () => {
      if (this.state.year != 'NONE') {
        this.props.onChange(new Date(this.state.year, month).toISOString());
      }
    });
  }

  onYearChange(year) {
    this.setState({
      year: year,
    }, () => {
      if (this.state.month != 'NONE') {
        this.props.onChange(new Date(year, this.state.month).toISOString());
      }
    });
  }

  render() {
    return (
      <div className="multi-select">
        <SelectField
          name={this.props.monthName}
          placeholder={'-- Month --'}
          options={this.monthOptions}
          value={this.state.month}
          onChange={this.onMonthChange}
        />
        <SelectField
          name={this.props.yearName}
          placeholder={'-- Year --'}
          options={this.yearOptions}
          value={this.state.year}
          onChange={this.onYearChange}
        />
      </div>
    );
  }
};

export default MonthYearField;
