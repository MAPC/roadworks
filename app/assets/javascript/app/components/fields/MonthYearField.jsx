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
    const intOrNull = x => (x && x !== 'NONE') ? parseInt(x) : null;
    const selectedYear = intOrNull(this.state.year);
    const selectedMonth = intOrNull(this.state.month);

    let startMonth = 0;
    let endMonth = monthPool.length;
    let startYear = this.props.startYear || (new Date()).getFullYear();
    let range = this.props.range || 25;
    let startYearMod = 0;

    if (this.props.predate) {
      const predate = new Date(this.props.predate);
      const predateYear = predate.getFullYear()
      const predateMonth = predate.getMonth();

      if (selectedYear) {
        if (predateYear === selectedYear) {
          startMonth = predateMonth;
        }
        else if (predateYear > selectedYear) {
          this.setState({ year: predateYear });
        }
      }

      if (selectedMonth && predateMonth > selectedMonth) {
        startYearMod = 1; 
      }

      range -= (predateYear - startYear);
      startYear = predateYear + startYearMod;
    }

    if (this.props.postdate) {
      const postdate = new Date(this.props.postdate);
      const postdateYear = postdate.getFullYear();
      const postdateMonth = postdate.getMonth();

      if (selectedYear) {
        if (postdateYear === selectedYear) {
          endMonth = postdate.getMonth() + 1;
        }
        else if (postdateYear < selectedYear) {
          this.setState({ year: postdateYear });
        }
      }

      if (selectedMonth && postdateMonth < selectedMonth) {
        startYearMod = -1;
      }

      range = (postdateYear - startYear) + 1 + startYearMod;
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
