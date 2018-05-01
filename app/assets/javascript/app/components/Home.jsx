import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import Map from './Map';
import HeaderContainer from '../containers/HeaderContainer';

import constants from '../constants/constants';

class Home extends React.Component {

  render() {
    return (
      <div className="component Home">
        <div className="header">
          <h2>Select your town</h2>
        </div>
        <ul>
          <li>
            <Link to='/ayer'>Ayer</Link>
          </li>
          <li>
            <Link to='/north-reading'>North Reading</Link>
          </li>
          <li>
            <Link to='/milton'>Milton</Link>
          </li>
          <li>
            <Link to='/westborough'>Westborough</Link>
          </li>
        </ul>
      </div>
    );
  }
}

Home.propTypes = {
};

export default Home;
