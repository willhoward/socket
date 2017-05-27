import React, { Component } from 'react';
import firebase from 'firebase';
import Input from '../components/input';
import Button from '../components/button';

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
        <Input type="email" name="email" placeholder="Email address" value={email} onChange={this.handleChange} />
        <Input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
        <Button value="Login" type="submit" />
        { error && <p>{error}</p> }
        <p><a href="/signup">Signup</a> instead</p>
      </form>
    );
  }
}

export default Login;
