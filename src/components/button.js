import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, value, onClick, disabled }) => (
  <button type={type} onClick={() => onClick()} disabled={disabled}>
    {value}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  onClick: () => '',
  disabled: false,
};

export default Button;
