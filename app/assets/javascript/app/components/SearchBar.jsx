import React from 'react';
import PropTypes from 'prop-types';

import Tags from './Tags';


class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = { query: null };
  }


  render() {
    const results = this.props.results.map(result => {
      const classes = result.type === 'permit' ? 'borderless' : '';
      const styles = { borderColor: result.color };

      const diamond = (() => {
        if (result.type === 'permit') {
          return <span className="diamond" style={styles}></span>;
        }
      })();

      return (
        <li key={`${result.title}${result.typeDetail}`} className={classes} style={styles}>
          {diamond}

          <div className="result-column result-details">
            <h3>{result.title}</h3>
            {result.typeDetail}
          </div>

          <div className="result-column result-tags">
            <Tags items={result.tags} />
          </div>
        </li>
      );
    });

    const resultsClasses = [
      'component CardList',
      (results.length > 0) ? 'active' : '',
    ].join(' ').trim();

    return (
      <div className="component SearchBar">
        <div className="search-input">
          <img src="/assets/search.svg" />
          <input placeholder="Search Roads with Work ..." value={this.state.query} />
        </div>

        <ul className={resultsClasses}>
          {results}
        </ul>
      </div>
    );
  }

};


export default SearchBar;
