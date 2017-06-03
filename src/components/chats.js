import React, { Component } from 'react';
import firebase from 'firebase';

class Chats extends Component {
  constructor() {
    super();

    this.state = {
      chats: [],
    };
  }

  componentWillMount() {
    firebase.database().ref('/chats').once('value').then(snap => {
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
          <li key={`${chat.members[0]}_${chat.members[1]}`}>
            <p className="black">{`${chat.members[0]}_${chat.members[1]}`}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default Chats;
