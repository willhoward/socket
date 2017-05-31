import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Page from './components/page';
import Loading from './components/loading';
import NotFound from './pages/not-found';
import Console from './pages/console';
import Login from './pages/login';
import Signup from './pages/signup';
import Setup from './pages/setup';

const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const dbRefProfile = firebase.database().ref(`users/${user.uid}/userName`);
        return dbRefProfile.once('value')
          .then(snap => {
            if (snap.val()) {
              return this.setState({ user, userName: snap.val(), loading: false });
            }
            return this.setState({ user, userName: '', loading: false });
          })
          .catch(error => console.log(error.message));
      }
      return this.setState({ user: null, loading: false });
    });
  }

  returnUserName = userName => this.setState({ userName });

  render() {
    const { user, userName, loading } = this.state;

    if (loading) {
      return (
        <Page>
          <Loading />
        </Page>
      );
    }

    if (user && !userName) {
      return (
        <Page>
          <Setup returnUserName={this.returnUserName} />
        </Page>
      );
    }

    return (
      <Router history={history}>
        <Page>
          <Switch>
            <Route exact path="/" render={() => (user ? <Console /> : <Login />)} />
            <Route exact path="/login" render={() => (user ? <Redirect to="/" /> : <Login />)} />
            <Route exact path="/signup" render={() => (user ? <Redirect to="/" /> : <Signup />)} />
            <Route component={NotFound} />
          </Switch>
        </Page>
      </Router>
    );
  }
}

export default App;
