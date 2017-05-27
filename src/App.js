import React, { Component } from 'react';
import firebase from 'firebase';
import Page from './components/page';
import Window from './components/window';
import Signup from './components/signup';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      loading: true,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return this.setState({ user, emailVerified: user.emailVerified, loading: false });
      }
      return this.setState({ user: null, emailVerified: false, loading: false });
    });
  }

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <Page>
        { user ? <Window /> : <Signup /> }
      </Page>
    );
  }
}

export default App;
