import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from './Card';

import fmt from '../util/fmt';


class CardList extends React.Component {

  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <section className="component CardList">
        <div className={'plan-cards'}>
          <Card
            title={'Plans and Moratoriums'}
            items={this.props.plans}
            type={'plan'}
            collapsed={this.props.hideAllPlans}
            onClick={this.props.toggleAllPlans}
            itemOnClick={this.props.togglePlan}
          />
          <Card
            title={'Permits by Type'}
            items={this.props.permitTypes}
            type={'permit'}
            collapsed={this.props.hideAllPermitTypes}
            onClick={this.props.toggleAllPermitTypes}
            itemOnClick={this.props.togglePermitType}
          />
        </div>
        <Link
          to={`/${this.props.match.params.city}/plan/create`}
          className="button styled"
          data-action="toggle-plan-form"
        >
          <div>
            <img src="/assets/add-to-list.svg" />
            Add Plan to Map
          </div>
        </Link>


      </section>
    );
  }
};

export default CardList;
