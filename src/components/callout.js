import React from 'react';
import PropTypes from 'prop-types';

const Callout = ({ type, value }) => (
  <div className={`callout ${type}`}>
    <p className="white">{value}</p>
  </div>
);

Callout.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Callout.defaultProps = {
  type: '',
};

export default Callout;
