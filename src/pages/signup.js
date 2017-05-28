import React, { Component } from 'react';
import firebase from 'firebase';
import Input from '../components/input';
import Button from '../components/button';
import Spacer from '../components/spacer';
import Callout from '../components/callout';

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      loading: false,
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
    this.setState({ loading: true });
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.updateProfile(user);
        this.sendEmailVerification(user);
      })
      .catch(error => this.setState({ loading: false, error: error.message }));
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
    const { displayName, email, password, loading, error } = this.state;
    return (
      <form className="gateway" onSubmit={this.handleSubmit}>
        <h1 className="white align-center">Sign Up</h1>
        <Spacer />
        <Input type="text" name="displayName" placeholder="Your name" value={displayName} onChange={this.handleChange} />
        <Input type="email" name="email" placeholder="Email address" value={email} onChange={this.handleChange} />
        <Input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
        <Button value={loading ? 'Loading...' : 'Sign Up'} type="submit" disabled={loading} />
        { error && <Callout type="error" value={error} /> }
        <Spacer />
        <p className="align-center">Already with us? <a className="white" href="/login">Log In</a></p>
      </form>
    );
  }
}

export default Signup;
