import React from 'react';


class MonthField extends React.Component {

  render() {
    const months = [
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
    ];

    const options = months.map(month => <option value={month}>{month}</option>);

    return (
      <select name={this.props.name}>
        <option selected disabled>-- Month --</option>
        {options}
      </select>
    );
  }

};


export default MonthField;
