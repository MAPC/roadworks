import React from 'react';
import PropTypes from 'prop-types';

import Tags from './Tags';

class Card extends React.Component {

  render() {
    const toggler = <span className="absolute-center">{this.props.collapsed ? '+' : '-'}</span>;
    const listContent = this.props.items.map(item => {

      /*
      * Attributes
      */
      const classes = [
        (this.props.type === 'permit') ? 'borderless' : null,
        (!item.active) ? 'inactive' : null,
      ].join(' ').trim();

      const styles = {
        borderColor: item.color,
      };


      /*
      * Children
      */
      const diamond = (() => {
        if (this.props.type === 'permit') {
          return <span className="diamond" style={styles}></span>;
        }
      })();

      const editLink = (() => {
        if (this.props.type !== 'permit') {
          return <a href="">Edit</a>;
        }
      })();

      return (
        <li
          key={item.title}
          className={classes}
          style={styles}
          onClick={() => this.props.itemOnClick(item.id)}
        >
          {diamond}
          {item.title}
          <Tags items={item.tags} />
          {editLink}
        </li>
      );
    });
    return (
      <article className={`component Card ${this.props.collapsed ? 'collapsed' : ''}`}>
        <div className="card-header">
          <h3>{this.props.title}</h3>
          <button onClick={this.props.onClick}>
            {toggler}
          </button>
        </div>
        <ul className="card-items">
          {listContent}
        </ul>
      </article>
    );
  }

};

export default Card;
