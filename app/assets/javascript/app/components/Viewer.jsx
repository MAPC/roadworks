import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import MapContainer from '../containers/MapContainer';
import CardListContainer from '../containers/CardListContainer';
import SearchBarContainer from '../containers/SearchBarContainer';
import PlanCreateContainer from '../containers/PlanCreateContainer';

import capitalize from '../util/capitalize';


class Viewer extends React.Component {

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
          <Route path="/:city/:resource?/:action?" component={MapContainer} />

          <div className="left-panel">
            <Route exact path="/:city" component={CardListContainer} />
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
