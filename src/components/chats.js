import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
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

  componentWillMount() {
    const chatsRef = firebase.database().ref('chats');
    chatsRef.once('value', snap => {
      const chats = [];
      snap.forEach(s => {
        const data = s.val();
        const chat = {
          key: s.key,
          createdBy: data.createdBy,
          members: {
            0: data.members[0],
            1: data.members[1],
          },
        };
        chats.push(chat);
      });
      this.setState({ chats });
    });
  }

  render() {
    const { chats } = this.state;
    const { onSelectChat } = this.props;
    return (
      <ul className="chats">
        { chats.map(chat => (
          <li className="chat" key={chat.key}>
            <p className="black">{chat.createdBy}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default Chats;
