import React from 'react';
import firebase from 'firebase';
import Page from './components/page';
import Window from './components/window';
import Auth from './components/auth';

const App = () => {
  const user = firebase.auth().currentUser;

  return (
    <Page>
      {user ? <Window /> : <Auth />}
    </Page>
  );
};

export default App;
