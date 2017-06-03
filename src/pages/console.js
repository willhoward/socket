import React, { Component } from 'react';
import firebase from 'firebase';
import algoliasearch from 'algoliasearch';
import Context from '../components/context';
import SearchResults from '../components/search-results';
import Chats from '../components/chats';
import NewChat from '../components/new-chat';

class Console extends Component {
  constructor() {
    super();

    this.state = {
      search: false,
      results: [],
    };
  }

  onToggleSearch = () => {
    this.setState({ search: !this.state.search });
  }

  onSearch = event => {
    const client = algoliasearch(
      process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
      process.env.REACT_APP_ALGOLIA_API_KEY,
    );
    const index = client.initIndex('users');
    if (event.target.value.length > 0) {
      index.search(event.target.value, (err, content) => {
        this.setState({ results: content.hits });
      });
    } else {
      this.setState({ results: [] });
    }
  }

  onAddChat = id => {
    const user = firebase.auth().currentUser;
    const members = [user.uid, id];
    firebase.database().ref(`chats/${user.uid}_${id}`).set({
      members,
      createdBy: user.uid,
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
    const { search, results } = this.state;
    return (
      <div className="window">
        <Context onToggleSearch={this.onToggleSearch} onSearch={this.onSearch} />
        { search ?
          <SearchResults results={results} onAddChat={this.onAddChat} />
          :
          <span>
            <Chats />
            <NewChat />
          </span>
        }
      </div>
    );
  }
}

export default Console;
