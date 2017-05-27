import React, { Component } from 'react';
import firebase from 'firebase';
import Input from '../components/input';
import Button from '../components/button';
import Spacer from '../components/spacer';
import Callout from '../components/callout';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
      error: '',
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
      <form className="gateway" onSubmit={this.handleSubmit}>
        <h1 className="white align-center">Log In</h1>
        <Spacer />
        <Input type="email" name="email" placeholder="Email address" value={email} onChange={this.handleChange} />
        <Input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
        <Button value="Log In" type="submit" />
        { error && <Callout type="error" value={error} /> }
        <Spacer />
        <p className="align-center">Need an account? <a className="white" href="/signup">Sign Up</a></p>
      </form>
    );
  }
}

export default Login;
