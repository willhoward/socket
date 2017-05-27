import React, { Component } from 'react';
import firebase from 'firebase';

class Setup extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userNameAvailable: false,
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
    const user = firebase.auth().currentUser;
    const { userName } = this.state;

    user.updateProfile({ userName })
      .catch(error => this.setState({ error: error.message }));
  }

  render() {
    const { userName, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="userName" value={userName} onChange={this.handleChange} />
        <button type="submit">Submit</button>
        { error && <p>{error}</p> }
      </form>
    );
  }
}

export default Setup;
