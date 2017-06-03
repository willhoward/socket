import React from 'react';
import PropTypes from 'prop-types';

const SearchResults = ({ results }) => (
  <div className="search-results">
    <ul>
      { results.map(result => (
        <li key={result.objectID}>
          <p className="black">{result.userName}</p>
        </li>
      ))}
    </ul>
  </div>
);

SearchResults.propTypes = {
  results: PropTypes.array,
};

SearchResults.defaultProps = {
  results: [],
};

export default SearchResults;
