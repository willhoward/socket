import React, { Component } from 'react';
import firebase from 'firebase';
import Avatar from './avatar';

class Chats extends Component {
  constructor() {
    super();

    this.state = {
      chats: [],
    };
  }

  componentWillMount() {
    firebase.database().ref('chats').on('value', snap => {
      const chats = [];
      Object.keys(snap.val()).forEach(i => {
        const chat = snap.val()[i];
        chats.push(chat);
      });
      this.setState({ chats });
    });
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
