import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {

  render() {
    return (
      <article className="component Card">
        <div className="card-header">
          <h3>{this.props.title}</h3>
          <button>
            <span className="absolute-center">-</span>
          </button>
        </div>

        {this.props.children}
      </article>
    );
  }

};

export default Card;
