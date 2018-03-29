import React from 'react';
import PropTypes from 'prop-types';

import CardList from './CardList';
import CardContainer from '../containers/CardContainer';
import SearchBarContainer from '../containers/SearchBarContainer';


class Cards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cards = this.props.cards.map(card => {
      return (
        <CardContainer title={card.title}>
          <CardList items={card.items} type={card.type} />
        </CardContainer>
      );
    });

    return (
      <section className="component Cards">
        <SearchBarContainer />

        <div className="plan-cards inactive">
          {cards}
        </div>

        <button className="styled" data-action="toggle-plan-form">
          <img src="/assets/add-to-list.svg" />
          Add Plan to Map
        </button>
      </section>
    );
  }
};

export default Cards;
