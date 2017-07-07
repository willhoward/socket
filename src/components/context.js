import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Avatar from './avatar';

class Context extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      avatar: '',
      loading: true,
      error: '',
    };
  }

  signOut = () => firebase.auth().signOut()
    .catch(error => console.log(error));

  render() {
    const { onSearch } = this.props;
    const user = firebase.auth().currentUser;
    return (
      <div className="context flex">
        <div className="flex--item">
          <Avatar userID={user.uid} onClick={this.signOut} />
        </div>
        <div className="flex--space">
          <input type="search" placeholder="Search by username..." onChange={onSearch} />
        </div>
      </div>
    );
  }
}

export default Context;
