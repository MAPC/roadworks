import PropTypes from 'prop-types';
import React from 'react';

class ToggleField extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this._active = !this.props.value;
  }

  toggle() {
    this._active = !this._active;

    this.props.onChange(this._active);
  }

  render() {
    return (
      <div 
        className={`component ToggleField ${this.props.value ? 'active' : ''}`}
        onClick={this.toggle}
      >
        <div className="labels">
          <div className="label">
            Address
          </div>
          <div className="label">
            Cross Street
          </div>
        </div>
      </div>
    );
  }
}

ToggleField.propTypes = {
  trueLabel: PropTypes.string,
  falseLabel: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ToggleField;
