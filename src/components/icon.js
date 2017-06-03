import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon }) => (
  <div className="icon">
    <img src={`/icons/${icon}.svg`} alt={icon} />
  </div>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
