import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';

const SearchResults = ({ results }) => (
  <div className="search-results">
    <ul>
      { results.map(result => (
        <li key={result.objectID}>
          <Avatar image="/" />
          <p className="green"><b>{result.displayName}</b></p>
          <p className="grey">{result.userName}</p>
          <img src="/icons/more.svg" alt="more" />
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
