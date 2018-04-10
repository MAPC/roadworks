import React from 'react';

import SelectField from './SelectField';

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

    const options = months.map(month => (
      <option key={month} value={month}>{month}</option>
    ));

    return (
      <SelectField name={this.props.name}>
        <option selected disabled>-- Month --</option>
        {options}
      </SelectField>
    );
  }

};


export default MonthField;
