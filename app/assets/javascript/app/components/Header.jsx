import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import capitalize from '../util/capitalize';

class Header extends React.Component {

  render() {
    const adminOfThisCity = this.props.loggedIn && this.props.match.params.city &&
        this.props.match.params.city.toUpperCase().replace(/-/g, ' ') ==
        this.props.user.city_name;
    const contributorFormHash = `${this.props.location.pathname}#contributors`;
    const loginHash = `${this.props.location.pathname}#login`;
    const city = !!this.props.match.params.city;
    const townLower = city ? this.props.match.params.city.toLowerCase() : null;
    const heading = city
        ? capitalize(this.props.match.params.city)
        : 'Roadworks';

    return (
      <header className="component Header">
        <div className="title">
          {city ? (
            <img
              src={`/assets/${townLower}-seal.png`}
              alt={`${heading} Seal`}
            />
          ) : null}
          <h1>{heading}</h1>
        </div>

        <nav>
          {adminOfThisCity ? (
            <Link key="contributors" to={contributorFormHash}>Manage Contributors</Link>
          ) : null}
          {this.props.loggedIn ? (
            <button key="logout" onClick={this.props.logout}>Logout {this.props.user.name}</button>
          ) : (
            <Link to={loginHash}>Municipal Login</Link>
          )}
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
};

export default Header;
