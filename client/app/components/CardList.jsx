import React from 'react';
import PropTypes from 'prop-types';


class CardList extends React.Component {

  renderItems() {
    const items = this.props.items;

    console.log(items);

    if (items.length > 0) {
      return items.map(item => <li>{item.title}</li>);
    }
  }
  
  render() {
    return (
      <ul className="component CardList">
        {renderItems()}
      </ul>
    );
  }

};

export default CardList;
