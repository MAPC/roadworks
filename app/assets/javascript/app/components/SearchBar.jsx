import React from 'react';
import PropTypes from 'prop-types';


class SearchBar extends React.Component {

  render() {
    return (
      <div className="component SearchBar">
        <img src="/assets/search.svg" />
        <input className="component SearchBar" placeholder="Search Roads with Work ..." />
      </div>
    );
  }

};


export default SearchBar;
