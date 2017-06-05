import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import algoliasearch from 'algoliasearch';
import Context from '../components/context';
import SearchResults from '../components/search-results';
import Chats from '../components/chats';
import NewChat from '../components/new-chat';

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
      chat: '1234',
    };
  }

  onSetSearch = () => this.setState({ search: true });

  onRemoveSearch = () => this.setState({ search: false });

  onSelectChat = chat => this.setState({ chat });

  onSearch = event => {
    const user = firebase.auth().currentUser;
    const client = algoliasearch(
      process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
      process.env.REACT_APP_ALGOLIA_API_KEY,
    );
    const index = client.initIndex('users');
    if (event.target.value.length > 0) {
      this.setState({ search: true });
      index.search({
        query: event.target.value,
        filters: `NOT  objectID:${user.uid}`,
      }).then(res => {
        this.setState({ results: res.hits });
      });
    } else {
      this.setState({ search: false, results: [] });
    }
  };

  onAddChat = id => {
    const user = firebase.auth().currentUser;
    const members = [user.uid, id];
    firebase.database().ref(`chats/${user.uid}_${id}`).set({
      members,
      createdBy: user.uid,
    });
  };

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
        <Context
          onSetSearch={this.onSetSearch}
          onRemoveSearch={this.onRemoveSearch}
          onSearch={this.onSearch}
        />
        {search
          ? <SearchResults results={results} onAddChat={this.onAddChat} />
          : <span>
            <Chats onSelectChat={this.onSelectChat} />
            <NewChat />
          </span>}
      </div>
    );
  }
}

export default Console;
