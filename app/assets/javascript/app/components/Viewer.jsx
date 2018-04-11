import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router'

import MapContainer from '../containers/MapContainer';
import CardsContainer from '../containers/CardsContainer';
import SearchBarContainer from '../containers/SearchBarContainer';
import PlanCreateContainer from '../containers/PlanCreateContainer';

import capitalize from '../util/capitalize';


class Viewer extends React.Component {

  componentDidMount() {
    this.props.fetchCity();
    this.props.fetchRoads();
    this.props.fetchPlans();
  }

  render() {
    const townLower = this.props.match.params.city.toLowerCase();
    const townCapitalized = capitalize(this.props.match.params.city);

    return (
      <section className="component Viewer">
        <header>
          <div className="title">
            <img src={`/assets/${townLower}-seal.png`} alt={`Town of ${townCapitalized} Seal`} />
            <h1>Town of {townCapitalized}</h1>
          </div>

          <nav>
            <a href="">FAQ</a>
            <a href="">Login</a>
          </nav>
        </header>
        <div className="page-wrapper">
          <Route path="/:city" component={MapContainer} />

          <div className="left-panel">
            <SearchBarContainer />

            <Route path="/:city" component={CardsContainer} />
            <Route path="/:city/plan/create" component={PlanCreateContainer} />
          </div>
        </div>
      </section>
    );
  }
}

Viewer.propTypes = {
};

export default Viewer;
