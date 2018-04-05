import PropTypes from 'prop-types';
import React from 'react';

import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';


class DropdownField extends React.Component {

  render() {
    const options = this.props.options.filter(option => option.label !== null);

    return (
      <div className="component DropdownField">
        <Select
          options={options}
          value={this.props.value}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          searchable
        />
      </div>
    );
  }

}

DropdownField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default DropdownField;
