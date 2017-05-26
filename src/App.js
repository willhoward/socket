import React, { Component } from 'react';
import firebase from 'firebase';
import Page from './components/page';
import Window from './components/window';
import Auth from './components/auth';

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
        return this.setState({ user, loading: false });
      }
      return this.setState({ user: null, loading: false });
    });
  }

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <Page>
        { user ? <Window /> : <Auth /> }
      </Page>
    );
  }
}

export default App;
