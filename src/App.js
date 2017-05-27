import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Page from './components/page';
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
      loading: true,
      userName: '',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return this.setState({ user, loading: false });
      }
      return this.setState({ user: null, loading: false });
    });

    if (this.state.user) {
      const dbRefUserName = firebase.database().ref(`users/${this.state.user.uid}/userName`);
      dbRefUserName.on('value', snap => this.setState({ userName: snap.val() }));
    }
  }

  renderConsole = () => {
    const { user, userName } = this.state;
    if (user) {
      return (userName ? <Console /> : <Setup />);
    }
    return <Login />;
  }

  render() {
    const { user, loading } = this.state;
    console.log(this.state.userName);

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <Router history={history}>
        <Page>
          <Switch>
            <Route exact path="/" render={this.renderConsole} />
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
