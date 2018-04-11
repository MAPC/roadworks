import React from 'react';

import SelectField from './SelectField';

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


class MonthYearField extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      month: 'NONE',
      year: 'NONE',
    };

    this.monthOptions = monthPool;
    this.yearOptions = [];

    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
    this.setTimeConstraints = this.setTimeConstraints.bind(this);
  }

  setTimeConstraints() {
    const selectedYear = (this.state.year && this.state.year !== 'NONE') ? parseInt(this.state.year) : null;
    let startMonth = 0;
    let endMonth = monthPool.length;
    let startYear = this.props.startYear || (new Date()).getFullYear();
    let range = this.props.range || 25;

    if (this.props.predate) {
      const predate = new Date(this.props.predate);
      const predateYear = predate.getFullYear()

      if (selectedYear) {
        if (predateYear === selectedYear) {
          startMonth = predate.getMonth();
        }
        else if (predateYear > selectedYear) {
          this.setState({ year: predateYear });
        }
      }

      range -= (predateYear - startYear);
      startYear = predateYear;
    }

    if (this.props.postdate) {
      const postdate = new Date(this.props.postdate);
      const postdateYear = postdate.getFullYear();

      if (selectedYear) {
        if (postdateYear === selectedYear) {
          endMonth = postdate.getMonth() + 1;
        }
        else if (postdateYear < selectedYear) {
          this.setState({ year: postdateYear });
        }
      }

      range = (postdateYear - startYear) + 1;
    }

    this.monthOptions = monthPool.slice(startMonth, endMonth);
    this.yearOptions = (new Array(range)).fill(null).map((_, i) => ({
      label: (startYear + i).toString(),
      value: (startYear + i).toString(),
    }));
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
    this.setTimeConstraints();

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
