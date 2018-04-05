import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CardList from './CardList';
import CardContainer from '../containers/CardContainer';

import fmt from '../util/fmt';


class Cards extends React.Component {

  render() {
    const cards = this.props.cards.map(card => {
      return (
        <CardContainer title={card.title}>
          <CardList items={card.items} type={card.type} />
        </CardContainer>
      );
    });

    const { to, linkContent } = ((toTemplate, fromTemplate, props) => {
      const from = fmt(fromTemplate, props.match.params.city);
      const to = fmt(toTemplate, props.match.params.city);

      if (props.location.pathname === to) {
        return {
          to: from,
          linkContent: (
            <div>
              <span className="x">+</span> Cancel
            </div>
          ),
        };
      }
      else {
        return {
          to,
          linkContent: (
            <div>
              <img src="/assets/add-to-list.svg" />
              Add Plan to Map
            </div>
          ),
        };
      }
    })('/{}/plan/create', '/{}', this.props);

    return (
      <section className="component Cards">
        <div className={`plan-cards ${this.props.location.pathname === fmt('/{}/plan/create', this.props.match.params.city) ? 'inactive' : ''}`}>
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
