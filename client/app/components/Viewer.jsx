import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router'

import MapContainer from '../containers/MapContainer';
import CardsContainer from '../containers/CardsContainer';
//import PlanFormContainer from '../containers/PlanFormContainer';


class Viewer extends React.Component {
  render() {
    return (
      <section className="component Viewer">
        <header>
          <div className="title">
            <img src="/assets/ayer-seal.png" alt="Town of Ayer Seal" />
            <h1>Town of Ayer</h1>
          </div>

          <nav>
            <a href="">FAQ</a>
            <a href="">Login</a>
          </nav>
        </header>
        <div className="page-wrapper">
          <MapContainer />
          <CardsContainer />
        </div>
      </section>
    );
  }
}

Viewer.propTypes = {
};

export default Viewer;
