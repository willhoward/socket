import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from './avatar';

class Chats extends Component {
  static propTypes = {
    onSelectChat: PropTypes.func.isRequired,
  }

  constructor() {
    super();

    this.state = {
      chats: [],
    };
  }

  render() {
    const { chats } = this.state;
    const { onSelectChat } = this.props;
    return (
      <ul className="chats">
        { chats.map(chat => {
          const id = `${chat.members[0]}_${chat.members[1]}`;
          return (
            <li className="chat" key={id} onClick={() => onSelectChat(id)}>
              <div className="chat--item">
                <Avatar image="/" />
              </div>
              <div className="chat--space">
                <p className="black">{id}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Chats;
