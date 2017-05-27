import React from 'react';
import PropTypes from 'prop-types';

const Uploader = ({ onComplete }) => {
  const handleChange = event => onComplete(event.target.files[0]);

  return (
    <input type="file" onChange={handleChange} />
  );
};

Uploader.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default Uploader;
