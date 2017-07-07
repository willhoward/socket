import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, basic }) => (
  <div className={`icon ${basic && 'basic'}`}>
    <img src={`/icons/${icon}.svg`} alt={icon} />
  </div>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  basic: PropTypes.bool,
};

Icon.defaultProps = {
  basic: false,
};

export default Icon;
