import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './app';
import NotFound from './not-found';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const config = {
  apiKey: 'AIzaSyD3mRdsyHcPf0FbhkbJWf0ZkjMPRG9Ttmc',
  authDomain: 'socket-65ebb.firebaseapp.com',
  databaseURL: 'https://socket-65ebb.firebaseio.com',
  projectId: 'socket-65ebb',
  storageBucket: 'socket-65ebb.appspot.com',
  messagingSenderId: '473787475654',
};

firebase.initializeApp(config);

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={App} />
      <Route render={NotFound} />
    </Switch>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
