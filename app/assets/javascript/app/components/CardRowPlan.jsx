import React from 'react';
import PropTypes from 'prop-types';

class CardRowPlan extends React.Component {

  render() {
    const classes = !this.props.active ? 'inactive' : '';

    return (
      <li
        className={`component CardRow hoverable ${classes}`}
        style={{ borderColor: this.props.color }}
        onClick={this.props.onClick}
      >
        <span>{this.props.title}</span>
        {this.props.editable ? (<a onClick={this.props.onEdit}>Edit</a>) : null}
      </li>
    );
  }

};

export default CardRowPlan;
