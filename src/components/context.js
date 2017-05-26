import React from 'react';
import firebase from 'firebase';

const Context = () => {
  const signOut = () => firebase.auth().signOut()
    .catch(error => console.log(error));

  return (
    <div className="context">
      <div className="context--space">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="context--item">
        <div className="avatar" onClick={() => signOut()} />
      </div>
    </div>
  );
};

export default Context;
