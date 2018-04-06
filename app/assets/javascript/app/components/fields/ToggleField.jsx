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
    const classNames = (() => {
      let classNames = 'component ToggleField';
      classNames += (this.props.classes ? ' ' + this.props.classes : '');
      classNames += (this.props.value ? ' active' : '');

      return classNames;
    })();

    return (
      <div 
        className={classNames}
        onClick={this.toggle}
      >
        <div className="labels">
          <div className="label">
            {this.props.labels.on}
          </div>
          <div className="label">
            {this.props.labels.off}
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
