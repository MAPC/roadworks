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

const intOrNull = x => (x && x !== 'NONE') ? parseInt(x) : null;


class MonthYearField extends React.Component {

  constructor(props) {
    super(props);

    const valueAsDate = props.value ? new Date(props.value) : null;
    this.state = {
      month: valueAsDate ? valueAsDate.getMonth() : 'NONE',
      year: valueAsDate ? valueAsDate.getFullYear() : 'NONE',
    };

    this.monthOptions = monthPool;
    this.yearOptions = [];

    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      const valueAsDate = new Date(nextProps.value);
      this.setState({
        month: valueAsDate ? valueAsDate.getMonth() : 'NONE',
        year: valueAsDate ? valueAsDate.getFullYear() : 'NONE',
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const selectedYear = intOrNull(nextState.year);

    if (selectedYear) {
      if (nextProps.predate) {
        const predateYear = (new Date(nextProps.predate)).getFullYear();

        if (predateYear > selectedYear) {
          this.setState({ year: predateYear });
        }
      }

      if (nextProps.postdate) {
        const postdateYear = (new Date(nextProps.postdate)).getFullYear();

        if (postdateYear < selectedYear) {
          this.setState({ year: postdateYear });
        }
      }
    }
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

      if (selectedYear && predateYear === selectedYear) {
        startMonth = predateMonth;
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

      if (selectedYear && postdateYear === selectedYear) {
        endMonth = postdate.getMonth() + 1;
      }

      if (selectedMonth && postdateMonth < selectedMonth) {
        startYearMod = -1;
      }

      range = (postdateYear - startYear) + 1 + startYearMod;
    }

    const monthOptions = monthPool.slice(startMonth, endMonth);
    const yearOptions = (new Array(range)).fill(null).map((_, i) => ({
      label: (startYear + i).toString(),
      value: (startYear + i).toString(),
    }));

    return (
      <div className="multi-select">
        <SelectField
          name={this.props.monthName}
          placeholder={'-- Month --'}
          options={monthOptions}
          value={this.state.month}
          onChange={this.onMonthChange}
        />
        <SelectField
          name={this.props.yearName}
          placeholder={'-- Year --'}
          options={yearOptions}
          value={this.state.year}
          onChange={this.onYearChange}
        />
      </div>
    );
  }
};

export default MonthYearField;
