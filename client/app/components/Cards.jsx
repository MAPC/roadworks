import React from 'react';
import PropTypes from 'prop-types';

import CardList from './CardList';
import CardContainer from '../containers/CardContainer';
import SearchBarContainer from '../containers/SearchBarContainer';


class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.items = [
      {
        color: '#EF4579',
        active: true,
        title: '2015-2020 Road Paving Plan',
      },
      {
        color: '#A48EB2',
        active: true,
        title: 'Sewer Repair Plan',
      },
      {
        color: '#F0E92D',
        active: false,
        title: 'Water Repair Plan',
      },
    ];
  }

  render() {
    return (
      <section className="component Cards">

        <SearchBarContainer />

        <div class="plan-cards">
          <CardContainer title="Town Plans">
            <CardList items={this.items} />
          </CardContainer>

          <CardContainer title="Utility Company Capital Plans">
            <CardList items={this.items} />
          </CardContainer>

          <CardContainer title="All Permits">
            <CardList items={this.items} />
          </CardContainer>

          <CardContainer title="Upcoming Permits">
            <CardList items={this.items} />
          </CardContainer>
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
