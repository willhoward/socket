import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import Window from './window';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

ReactDOM.render(
  <Window />
  , document.getElementById('root'));
registerServiceWorker();
