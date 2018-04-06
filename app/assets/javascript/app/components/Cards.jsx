import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
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

    return (
      <section className="component Cards">
        <Route path="/:city/plan/create" children={({ match }) => (
          <div className={`plan-cards ${match ? 'inactive' : ''}`}>
            {cards}
          </div>
        )}/>
        <Switch>
          <Route path="/:city/plan/create" render={(props) => (
            <Link
              to={`/${props.match.params.city}`}
              className="button styled"
              data-action="toggle-plan-form"
            >
              <div>
                <span className="x">+</span> Cancel
              </div>
            </Link>
          )}/>
          <Route exact path="/:city" render={(props) => (
            <Link
              to={`/${props.match.params.city}/plan/create`}
              className="button styled"
              data-action="toggle-plan-form"
            >
              <div>
                <img src="/assets/add-to-list.svg" />
                Add Plan to Map
              </div>
            </Link>
          )}/>
        </Switch>
      </section>
    );
  }
};

export default Cards;
