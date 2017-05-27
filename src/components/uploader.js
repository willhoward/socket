import React from 'react';
import PropTypes from 'prop-types';

const Uploader = ({ url, onComplete }) => {
  const handleChange = event => onComplete(event.target.files[0]);
  const style = { backgroundImage: `url('${url}')` };

  return (
    <div className="uploader" style={style}>
      <input id="uploader" type="file" onChange={handleChange} />
      { !url &&
        <label htmlFor="uploader"><p>Upload Profile Photo</p></label>
      }
    </div>
  );
};

Uploader.propTypes = {
  onComplete: PropTypes.func.isRequired,
  image: PropTypes.string,
};

Uploader.defaultProps = {
  image: '',
};

export default Uploader;
