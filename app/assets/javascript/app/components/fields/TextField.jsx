import PropTypes from 'prop-types';
import React from 'react';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
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
      <input
        name={this.props.name}
        className="component TextField"
        type={this.props.type ? this.props.type : 'text'}
        value={this.props.debounce ? this.state.value : this.props.value}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}

TextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  debounce: PropTypes.number,
};

export default TextField;
