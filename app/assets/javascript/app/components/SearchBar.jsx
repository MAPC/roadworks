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

      return (
        <li key={`${result.title}${result.typeDetail}`} className={classes} style={styles}>
          <div className="result-column">
            <h3>{result.title}</h3>
              
          </div>

          <div className="result-column">
            <Tags items={result.tags} />
          </div>
        </li>
      );
    });

    const resultsClasses = (results.length > 0) ? 'active' : '';

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
