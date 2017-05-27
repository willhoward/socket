import React from 'react';
import firebase from 'firebase';
import Context from '../components/context';

const Console = () => {
  const user = firebase.auth().currentUser;

  return (
    <div className="window">
      <Context />
      { !user.username && <p>No username set</p> }
      <div className="window--menu" />
    </div>
  );
};

export default Console;
