import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Avatar from './avatar';
import Icon from './icon';

class Chats extends Component {
  static propTypes = {
    active: PropTypes.string,
    onSelectChat: PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: null,
  };

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
        const currentUser = firebase.auth().currentUser;
        const member = (data.members[0].id === currentUser.uid) ? data.members[1] : data.members[0];
        const chat = {
          key: s.key,
          createdBy: data.createdBy,
          member,
        };
        chats.push(chat);
      });
      this.setState({ chats });
    });
  }

  render() {
    const { active, onSelectChat } = this.props;
    const { chats } = this.state;
    return (
      <ul className="chats">
        { chats.map(chat => (
          <a key={chat.key} onClick={() => onSelectChat(chat.key, chat.member.id)} role="button" tabIndex="0">
            <li className={`chat ${active === chat.key && 'active'}`}>
              <div className="chat--item">
                <Avatar userID={chat.member.id} />
              </div>
              <div className="chat--space">
                <p className="black">{chat.member.displayName}</p>
              </div>
              <div className="chat--item">
                <Icon icon="more" transparent />
              </div>
            </li>
          </a>
        ))}
      </ul>
    );
  }
}

export default Chats;
