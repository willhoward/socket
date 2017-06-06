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
    chatsRef.on('value', snap => {
      const { chats } = this.state;
      snap.forEach(s => chats.push(s.val()));
    });
  }

  render() {
    const { chats } = this.state;
    const { onSelectChat } = this.props;
    return (
      <ul className="chats">
        <li className="chat" />
      </ul>
    );
  }
}

export default Chats;
