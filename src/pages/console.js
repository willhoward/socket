import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import algoliasearch from 'algoliasearch';
import Context from '../components/context';
import SearchResults from '../components/search-results';
import Chats from '../components/chats';
import Chat from '../components/chat';
import SafetyCurtain from '../components/safety-curtain';

class Console extends Component {
  static propTypes = {
    returnUserName: PropTypes.func,
  };

  static defaultProps = {
    returnUserName: () => '',
  };

  constructor() {
    super();

    this.state = {
      search: false,
      results: [],
      active: '',
    };
  }

  onSetSearch = () => this.setState({ search: true });

  onRemoveSearch = () => this.setState({ search: false });

  onSelectChat = key => this.setState({ active: key });

  onSearch = event => {
    const user = firebase.auth().currentUser;
    const client = algoliasearch(
      process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
      process.env.REACT_APP_ALGOLIA_API_KEY,
    );
    const index = client.initIndex('users');
    if (event.target.value.length > 0) {
      this.setState({ search: true });
      index
        .search({
          query: event.target.value,
          filters: `NOT  objectID:${user.uid}`,
        })
        .then(res => {
          this.setState({ results: res.hits });
        });
    } else {
      this.setState({ search: false, results: [] });
    }
  };

  onSelectSearchResult = user => {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once('value').then(userSnap => {
      const currentUser = userSnap.val();
      const targetUser = user;
      const chatId = currentUser.id.charAt[0] < targetUser.id.charAt[0] ? `${currentUser.id}_${targetUser.id}` : `${targetUser.id}_${currentUser.id}`;
      const chatRef = firebase.database().ref(`chats/${chatId}`);
      chatRef.child('createdBy').once('value', chatSnap => {
        if (chatSnap.val()) {
          this.setState({ search: false, active: chatId });
        } else {
          const members = [];
          currentUser.acceptedChat = true;
          targetUser.acceptedChat = false;
          members.push(currentUser, targetUser);
          chatRef.set({ createdBy: currentUser.id, members });
          this.setState({ search: false, active: chatId });
        }
      });
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    const { userName } = this.state;

    firebase.database().ref(`users/${user.uid}`).update({
      userName,
      displayName: user.displayName,
    });
    return this.props.returnUserName(userName);
  };

  render() {
    const { search, results, active } = this.state;
    return (
      <div className="window">
        <Context onSearch={this.onSearch} />
        { search
          ? <SearchResults results={results} onSelectSearchResult={this.onSelectSearchResult} />
          : <span>
            <Chats onSelectChat={this.onSelectChat} active={active} />
            { active ?
              <Chat active={active} />
              :
              <SafetyCurtain />
            }
          </span> }
      </div>
    );
  }
}

export default Console;
