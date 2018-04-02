import PropTypes from 'prop-types';
import React from 'react';

class TextField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
        />
      </div>
    );
  }
}

TextField.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default TextField;
