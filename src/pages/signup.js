import React, { Component } from 'react';
import firebase from 'firebase';

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      error: '',
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.updateProfile(user);
        this.sendEmailVerification(user);
      })
      .catch(error => this.setState({ error: error.message }));
  }

  updateProfile = user => {
    const { displayName } = this.state;
    user.updateProfile({ displayName })
      .catch(error => this.setState({ error: error.message }));
  }

  sendEmailVerification = user => {
    user.sendEmailVerification()
      .catch(error => this.setState({ error: error.message }));
  }

  render() {
    const { displayName, email, password, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="displayName" value={displayName} onChange={this.handleChange} />
        <input type="email" name="email" value={email} onChange={this.handleChange} />
        <input type="password" name="password" value={password} onChange={this.handleChange} />
        <button type="submit">Submit</button>
        { error && <p>{error}</p> }
        <p><a href="/login">Login</a> instead</p>
      </form>
    );
  }
}

export default Signup;
