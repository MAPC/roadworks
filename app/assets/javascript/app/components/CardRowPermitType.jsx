import React from 'react';
import PropTypes from 'prop-types';

class CardRowPermitType extends React.Component {

  render() {
    const style = { borderColor: this.props.color };
    const classes = !this.props.active ? 'inactive' : '';
    return (
      <li
        className={`component CardRow borderless hoverable ${classes}`}
        style={style}
        onClick={this.props.onClick}
      >
        <span className="diamond" style={style}></span>
        <span>{this.props.title}</span>
      </li>
    );
  }

};

export default CardRowPermitType;
