import React, { Component } from 'react';
import Avatar from './avatar';

class Chats extends Component {
  constructor() {
    super();

    this.state = {
      chats: [],
    };
  }

  componentWillMount = () => {
    const chatsRef = firebase.database().ref('chats');
  }

  render() {
    const { chats } = this.state;
    return (
      <ul className="chats">
        { chats.map(chat => (
          <li className="chat" key={`${chat.members[0]}_${chat.members[1]}`}>
            <div className="chat--item">
              <Avatar image="/" />
            </div>
            <div className="chat--space">
              <p className="black">{`${chat.members[0]}_${chat.members[1]}`}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Chats;
