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
            placeholder={'No plans have been submitted for this area yet.'}
            items={this.props.plans}
            collapsed={this.props.hideAllPlans}
            onClick={this.props.toggleAllPlans}
            itemOnClick={this.props.togglePlan}
            itemOnEditClick={this.props.onEditPlan}
          />
          <Card
            title={'Permits by Type'}
            placeholder={'There are no permit types available for this area.'}
            items={this.props.permitTypes}
            collapsed={this.props.hideAllPermitTypes}
            onClick={this.props.toggleAllPermitTypes}
            itemOnClick={this.props.togglePermitType}
          />
          <Card
            title={'Details'}
            placeholder={'Click a label on the map to view its details.'}
            items={this.props.details}
            collapsed={this.props.hideDetails}
            onClick={this.props.toggleDetails}
          />
        </div>
        {this.props.loggedIn ? (
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
        ) : null}
      </section>
    );
  }
};

export default CardList;
