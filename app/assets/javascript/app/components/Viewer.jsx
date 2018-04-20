import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import MapContainer from '../containers/MapContainer';
import CardListContainer from '../containers/CardListContainer';
import LoginFormContainer from '../containers/LoginFormContainer';
import PlanCreateContainer from '../containers/PlanCreateContainer';

import capitalize from '../util/capitalize';


class Viewer extends React.Component {

  render() {
    const showLoginLink = `${this.props.location.pathname}#login`;
    const showLoginForm = this.props.location.hash === '#login';
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

            {this.props.user.email !== null
              ? <button onClick={this.props.logout}>Logout {this.props.user.email}</button>
              : <Link to={showLoginLink}>Municipal Login</Link>
            }
          </nav>
        </header>
        <div className="page-wrapper">
          <Route path="/:city/:resource?/:action?" component={MapContainer} />

          <div className="left-panel">
            <Route exact path="/:city" component={CardListContainer} />
            <Route path="/:city/plan/create" component={PlanCreateContainer} />
          </div>

          {showLoginForm ? <LoginFormContainer /> : null}
        </div>
      </section>
    );
  }
}

Viewer.propTypes = {
};

export default Viewer;
