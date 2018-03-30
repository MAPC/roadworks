import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CardList from './CardList';
import CardContainer from '../containers/CardContainer';


class Cards extends React.Component {

  render() {
    const cards = this.props.cards.map(card => {
      return (
        <CardContainer title={card.title}>
          <CardList items={card.items} type={card.type} />
        </CardContainer>
      );
    });

    const { to, linkContent } = (location => {
      if (this.props.location.pathname === location) {
        return {
          to: "/ayer",
          linkContent: (
            <div>
              <span className="x">+</span> Cancel
            </div>
          ),
        };
      }
      else {
        return {
          to: location,
          linkContent: (
            <div>
              <img src="/assets/add-to-list.svg" />
              Add Plan to Map
            </div>
          ),
        };
      }
    })("/ayer/plan/create");

    return (
      <section className="component Cards">
        <div className={`plan-cards ${this.props.location.pathname === '/ayer/plan/create' ? 'inactive' : ''}`}>
          {cards}
        </div>

        <Link to={to} className="button styled" data-action="toggle-plan-form">
          {linkContent}
        </Link>
      </section>
    );
  }
};

export default Cards;
