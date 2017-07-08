import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Icon from './icon';
import Button from './button';

class Chat extends Component {
  static propTypes = {
    active: PropTypes.string.isRequired,
    targetUser: PropTypes.string.isRequired,
  };

  constructor() {
    super();

    this.state = {
      loading: true,
      newMessage: '',
      messages: [],
    };
  }

  componentDidMount() {
    const { active } = this.props;
    const messagesRef = firebase.database().ref(`messages/${active}`);
    messagesRef.on('value', snap => {
      const messages = [];
      snap.forEach(s => {
        const message = s.val();
        message.id = s.key;
        messages.push(message);
      });
      this.setState({ messages });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      const { active } = nextProps;
      const messagesRef = firebase.database().ref(`messages/${active}`);
      messagesRef.on('value', snap => {
        const messages = [];
        snap.forEach(s => {
          const message = s.val();
          message.id = s.key;
          messages.push(message);
        });
        this.setState({ messages });
      });
    }
  }

  handleChange = event => {
    this.setState({ newMessage: event.target.value });
  }

  sendMessage = event => {
    event.preventDefault();
    const { newMessage } = this.state;
    const { active, targetUser } = this.props;
    const messagesRef = firebase.database().ref(`messages/${active}`);
    const currentUser = firebase.auth().currentUser;
    messagesRef.push().set({
      chat: active,
      content: newMessage,
      sentBy: currentUser.uid,
      target: targetUser,
      read: false,
    });
    this.setState({ newMessage: '' });
  }

  render() {
    const { loading, newMessage, messages } = this.state;
    return (
      <div className="window--main">
        <div className="stream">
          { messages.map(message => (
            <div className={message.sentBy === firebase.auth().currentUser.uid ? 'message right' : 'message left'} key={message.id}>
              <div className="message--content">
                <p className="black">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={this.sendMessage}>
          <div className="composer flex">
            <div className="flex--space">
              <input className="composer--field" type="text" placeholder="Type a message" value={newMessage} onChange={this.handleChange} />
            </div>
            <div className="flex--item">
              <a type="submit">
                <Icon icon="send" basic onClick={this.sendMessage} />
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Chat;
