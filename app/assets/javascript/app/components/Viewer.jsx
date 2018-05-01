import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import MapContainer from '../containers/MapContainer';
import CardListContainer from '../containers/CardListContainer';
import LoginFormContainer from '../containers/LoginFormContainer';
import PlanCreateContainer from '../containers/PlanCreateContainer';
import ContributorFormContainer from '../containers/ContributorFormContainer';
import HeaderContainer from '../containers/HeaderContainer';
import HomeContainer from '../containers/HomeContainer';

import constants from '../constants/constants';

class Viewer extends React.Component {

  render() {
    const redirect = this.props.match.params.city
        ? `/${this.props.match.params.city.toLowerCase()}`
        : '/';

    return (
      <section className="component Viewer">
        <Route path="/:city?" component={HeaderContainer} />
        <div className="page-wrapper">
          <Route path="/:city?/:resource?/:action?" component={MapContainer} />
          <Route path="/:city?" render={(props) => {
            const hash = props.location.hash;
            const city = props.match.params.city;
            if (hash == '#login') { return <LoginFormContainer {...props} />; }
            if (hash == '#contributors' && city) {
              return <ContributorFormContainer {...props} />;
            }
            return null;
          }}/>
          <Switch>
            <Route path="/:city" render={(props) => {
              const standardCity = props.match.params.city.toUpperCase().replace(/-/g, ' ');
              if (!constants.ENABLED_CITIES.includes(standardCity)) {
                return (<Redirect to="/" />);
              }
              return (
                <div className="left-panel">
                  <Switch>
                    <Route exact path="/:city" component={CardListContainer} />
                    <Route path="/:city/plan/create" render={(props) =>
                      this.props.user.id ? (
                        <PlanCreateContainer {...props} />
                      ) : (
                        <Redirect to={redirect} />
                      )
                    }/>
                  </Switch>
                </div>
              );
            }}/>
            <Route path="/" component={HomeContainer}/>
          </Switch>
        </div>
      </section>
    );
  }
}

Viewer.propTypes = {
};

export default Viewer;
