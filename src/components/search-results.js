import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';
import Icon from './icon';

const SearchResults = ({ results, onAddChat }) => (
  <div className="search-results">
    <ul>
      { results.map(result => (
        <li className="search-result" key={result.objectID} onClick={() => onAddChat(result.objectID)}>
          <div className="search-result--item">
            <Avatar userID={result.id} />
          </div>
          <div className="search-result--space">
            <p className="green"><b>{result.displayName}</b></p>
            <p className="grey">{result.userName}</p>
          </div>
          <div className="search-result--item">
            <Icon icon="more" />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

SearchResults.propTypes = {
  results: PropTypes.array,
  onAddChat: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  results: [],
};

export default SearchResults;
