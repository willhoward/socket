import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import Window from './window';
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

ReactDOM.render(
  <Window />
  , document.getElementById('root'));
registerServiceWorker();
