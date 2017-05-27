import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Page from './components/page';
import NotFound from './pages/not-found';
import Window from './components/window';
import Login from './pages/login';
import Signup from './pages/signup';

const history = createBrowserHistory();

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
      <Router history={history}>
        <Page>
          <Switch>
            <Route exact path="/" component={user ? Window : Login} />
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
