import React, { Component } from 'react';
import firebase from 'firebase';

class Auth extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('Adding user');
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => console.log(error.message));
  }

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="email" name="email" value={email} onChange={this.handleChange} />
        <input type="password" name="password" value={password} onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Auth;
