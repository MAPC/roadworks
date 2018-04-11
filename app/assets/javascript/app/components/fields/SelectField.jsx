import React from 'react';

class SelectField extends React.Component {
  render() {
    const options = this.props.options.map((opt) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ));
    const placeholder = this.props.placeholder ? (
      <option disabled value="NONE">{this.props.placeholder}</option>
    ) : null;
    return (
      <div className="component SelectField">
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
        >
          {placeholder}
          {options}
        </select>
      </div>
    );
  }
}

export default SelectField;
