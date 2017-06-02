import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Avatar extends Component {
  static propTypes = {
    image: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    image: '',
    onClick: () => '',
  };

  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  render() {
    const { image, onClick } = this.props;
    const { loading } = this.state;
    return (
      <button className="avatar" onClick={onClick}>
        <img className={loading && 'loading'} src={image} alt="Avatar" onLoad={() => this.setState({ loading: false })} />
      </button>
    );
  }
}

export default Avatar;
