import React from 'react';
import PropTypes from 'prop-types';

import Tags from './Tags';


class CardList extends React.Component {
  
  render() {
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
        <li key={item.title} className={classes} style={styles}>
          {diamond}
          {item.title}
          <Tags items={item.tags} />
          {editLink}
        </li>
      );
    });

    return (
      <ul className="component CardList">
        {listContent}
      </ul>
    );
  }

};

export default CardList;
