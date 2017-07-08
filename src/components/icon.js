import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, basic, onClick }) => (
  <div className={`icon ${basic && 'basic'}`} onClick={onClick}>
    <img src={`/icons/${icon}.svg`} alt={icon} />
  </div>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  basic: PropTypes.bool,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  basic: false,
  onClick: () => '',
};

export default Icon;
