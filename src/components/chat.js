import React from 'react';
import Icon from './icon';

const Chat = () => (
  <div className="window--main">
    <div className="stream" />
    <div className="composer flex">
      <div className="flex--space">
        <input type="search" placeholder="New message..." />
      </div>
      <div className="flex--item">
        <Icon icon="send" />
      </div>
    </div>
  </div>
);

export default Chat;
