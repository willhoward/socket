import React, { Component } from 'react';
import firebase from 'firebase';

class Login extends Component {
  constructor() {
    super();

    this.state = {

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
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => this.setState({ error: error.message }));
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="email" name="email" value={email} onChange={this.handleChange} />
        <input type="password" name="password" value={password} onChange={this.handleChange} />
        <button type="submit">Submit</button>
        { error && <p>{error}</p> }
      </form>
    );
  }
}

export default Login;