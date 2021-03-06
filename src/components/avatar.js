import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

class Avatar extends Component {
  static propTypes = {
    userID: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    userID: '',
    onClick: () => '',
  };

  constructor() {
    super();

    this.state = {
      image: '',
      loading: true,
      error: '',
    };
  }

  componentDidMount() {
    firebase.database().ref(`users/${this.props.userID}/avatar`).once('value').then(snap => {
      firebase
        .storage()
        .refFromURL(snap.val())
        .getMetadata()
        .then(metadata =>
          this.setState({ image: metadata.downloadURLs[0], loading: false, error: '' }),
        )
        .catch(error => this.setState({ loading: false, error: error.message }));
    });
  }

  render() {
    const { onClick } = this.props;
    const { image, loading } = this.state;
    return (
      <button className={`avatar ${!loading && 'loaded'}`} onClick={onClick}>
        <img src={image} alt="Avatar" onLoad={() => this.setState({ loading: false })} />
      </button>
    );
  }
}

export default Avatar;
