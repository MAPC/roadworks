import React from 'react';
import PropTypes from 'prop-types';

import Tags from './Tags';


class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      query: '',
    };

    this.timer = null;
    this.debounce = 500;
    this.setQuery = this.setQuery.bind(this);
  }


  setQuery(e) {
    const query = e.target.value;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.props.fetchResults(query);
    }, this.debounce);

    this.setState({ query });
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
      (this.state.query !== '' && results.length > 0) ? 'active' : '',
    ].join(' ').trim();

    return (
      <div className="component SearchBar">
        <div className="search-input">
          <img src="/assets/search.svg" />
          <input placeholder="Search Roads with Work ..." onChange={this.setQuery} value={this.state.query} />
        </div>

        <ul className={resultsClasses}>
          {results}
        </ul>
      </div>
    );
  }

};


export default SearchBar;
