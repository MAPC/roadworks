import React from 'react';

import SelectField from './SelectField';

class MonthYearField extends React.Component {
  constructor(props) {
    super(props);

    const monthPool = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ].map((label, value) => ({ label, value }));

    const startMonth = parseInt(this.props.startMonth) || 0;
    const endMonth = parseInt(this.props.endMonth) || monthPool.length;
    
    this.monthOptions = monthPool.slice(startMonth, endMonth);

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
