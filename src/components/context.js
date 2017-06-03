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

  componentDidMount() {
    const user = firebase.auth().currentUser;
    firebase.database().ref(`users/${user.uid}/avatar`).once('value').then(snap => {
      firebase
        .storage()
        .refFromURL(snap.val())
        .getMetadata()
        .then(metadata =>
          this.setState({ avatar: metadata.downloadURLs[0], loading: false, error: '' }),
        )
        .catch(error => this.setState({ loading: false, error: error.message }));
    });
  }

  signOut = () => firebase.auth().signOut()
    .catch(error => console.log(error));

  render() {
    const { avatar } = this.state;
    const { onToggleSearch, onSearch } = this.props;
    return (
      <div className="context">
        <div className="context--space">
          <input type="search" placeholder="Search by username..." onChange={onSearch} onFocus={onToggleSearch} />
        </div>
        <div className="context--item">
          <Avatar image={avatar} onClick={this.signOut} />
        </div>
      </div>
    );
  }
}

export default Context;
