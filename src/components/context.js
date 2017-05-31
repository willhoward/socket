import React, { Component } from 'react';
import firebase from 'firebase';

class Context extends Component {
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
    const avatarRef = firebase.database().ref(`users/${user.uid}/avatar`);
    firebase
      .storage()
      .refFromURL(avatarRef)
      .getMetadata()
      .then(metadata =>
        this.setState({ avatar: metadata.downloadURLs[0], loading: false, error: '' }),
      )
      .catch(error => this.setState({ loading: false, error: error.message }));
  }

  signOut = () => firebase.auth().signOut()
    .catch(error => console.log(error));

  render() {
    const { avatar } = this.state;
    return (
      <div className="context">
        <div className="context--space">
          <input type="search" placeholder="Search by username..." />
        </div>
        <div className="context--item">
          <img src={avatar} alt="Profile" onClick={this.signOut} />
        </div>
      </div>
    );
  }
}

export default Context;
