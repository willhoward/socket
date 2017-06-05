import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Avatar from './avatar';

class Context extends Component {
  static propTypes = {
    onSetSearch: PropTypes.func.isRequired,
    onRemoveSearch: PropTypes.func.isRequired,
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
    const { onToggleSearch, onSearch } = this.props;
    const user = firebase.auth().currentUser;
    return (
      <div className="context">
        <div className="context--space">
          <input type="search" placeholder="Search by username..." onChange={onSearch} onFocus={onToggleSearch} />
        </div>
        <div className="context--item">
          <Avatar userID={user.uid} onClick={this.signOut} />
        </div>
      </div>
    );
  }
}

export default Context;
