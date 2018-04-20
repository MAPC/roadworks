import React from 'react';
import PropTypes from 'prop-types';

class CardRowDetail extends React.Component {

  render() {
    return (
      <li
        className={'component CardRow info'}
        onClick={this.props.onClick}
      >
        <div className="card-row-label">{this.props.label}</div>
        <div className="card-row-value">{this.props.value}</div>
      </li>
    );
  }
};

export default CardRowDetail;
