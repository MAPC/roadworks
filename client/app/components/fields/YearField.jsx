import React from 'react';

import SelectField from './SelectField';

class YearField extends React.Component {

  render() {
    const startYear = this.props.startYear || (new Date()).getFullYear();
    const range = this.props.range || 25;

    const yearOptions = (new Array(range))
                        .fill(null)
                        .map((_, i) => <option value={startYear + i}>{startYear + i}</option>);

    return (
      <SelectField name={this.props.name}>
        <option disabled selected>-- Year --</option>
        {yearOptions}
      </SelectField>
    );
  }

};


export default YearField;
