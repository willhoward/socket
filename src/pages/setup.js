import React, { Component } from 'react';
import firebase from 'firebase';
import Input from '../components/input';
import Button from '../components/button';
import Spacer from '../components/spacer';
import Callout from '../components/callout';
import Uploader from '../components/uploader';

class Setup extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      avatar: '',
      loading: false,
      error: '',
    };
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
      error: '',
    });
  };

  handleCompletedUpload = file => {
    const user = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`${user.uid}/avatars/${file.name.replace(/ /g, '_')}`);
    this.setState({ loading: true });
    fileRef
      .put(file)
      .then(snap => {
        const fullPath = snap.metadata.fullPath;
        const avatar = storageRef.child(fullPath).toString();
        firebase.database().ref(`users/${user.uid}`).update({
          avatar,
        });
        firebase
          .storage()
          .refFromURL(avatar)
          .getMetadata()
          .then(metadata =>
            this.setState({ avatar: metadata.downloadURLs[0], loading: false, error: '' }),
          )
          .catch(error => this.setState({ error: error.message }));
      })
      .catch(error => this.setState({ error: error.message }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    const { userName } = this.state;

    firebase.database().ref(`users/${user.uid}`).update({
      userName,
    });
  };

  render() {
    const { userName, avatar, loading, error } = this.state;

    return (
      <form className="gateway" onSubmit={this.handleSubmit}>
        <h1 className="white align-center">Set Up Profile</h1>
        <Spacer />
        <p>{avatar}</p>
        <img src={avatar} alt="avatar" />
        <Uploader onComplete={this.handleCompletedUpload} />
        <Input
          type="text"
          name="userName"
          placeholder="Username"
          value={userName}
          onChange={this.handleChange}
        />
        <Button value={loading ? 'Loading...' : 'Save Profile'} type="submit" />
        {error && <Callout type="error" value={error} />}
      </form>
    );
  }
}

export default Setup;
