import React from 'react';
import PropTypes from 'prop-types';


class CardList extends React.Component {
  
  render() {
    const listContent = this.props.items.map(item => {
      const ifInactive = (!item.active) ? 'inactive' : '';

      return (
        <li key={item.title} className={ifInactive} style={{borderColor: item.color}}>
          {item.title}
          <a href="">Edit</a>
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
