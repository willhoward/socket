import React from 'react';
import PropTypes from 'prop-types';
import Icon from './icon';

const Chat = ({ active }) => {
  return (
    <div className="window--main">
      <div className="stream" />
      <div className="composer flex">
        <div className="flex--space">
          <input type="search" placeholder={active} />
        </div>
        <div className="flex--item">
          <Icon basic icon="send" />
        </div>
      </div>
    </div>
  );
}

Chat.propTypes = {
  active: PropTypes.string.isRequired,
};

export default Chat;
