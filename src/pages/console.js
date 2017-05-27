import React, { Component } from 'react';
import firebase from 'firebase';
import Context from '../components/context';

class Console extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    const dbRefProfile = firebase.database().ref().child('userName');
    dbRefProfile.on('value', snap => this.setState({ userName: snap.val() }));
  }

  render() {
    const { userName } = this.state;

    return (
      <div className="window">
        <Context />
        <p className="black">{userName}</p>
        <div className="window--menu" />
      </div>
    );
  }
}

export default Console;
