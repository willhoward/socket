import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ children }) => (
  <div className="page">
    <div className="page--background" />
    <div className="page--foreground">
      { children }
    </div>
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
