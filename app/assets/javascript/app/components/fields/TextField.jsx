import PropTypes from 'prop-types';
import React from 'react';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      timer: null,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const val = event.target.value;
    if (this.props.debounce) {
      clearTimeout(this.state.timer);
      return this.setState({
        value: val,
        timer: setTimeout(() => this.props.onChange(val), this.props.debounce)
      })
    }
    return this.props.onChange(val);
  }

  render() {
    return (
      <div>
        <input
          value={this.props.debounce ? this.state.value : this.props.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

TextField.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  debounce: PropTypes.number,
};

export default TextField;
