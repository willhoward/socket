import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, value, onClick }) => (
  <button type={type} onClick={() => onClick()}>
    {value}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  onClick: () => '',
};

export default Button;
