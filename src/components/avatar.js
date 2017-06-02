import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Avatar extends Component {
  static propTypes = {
    image: PropTypes.string,
  };

  static defaultProps = {
    image: '',
  };

  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }

  render() {
    const { image } = this.props;
    const { loading } = this.state;
    return (
      <div className="avatar">
        <img className={loading && 'loading'} src={image} alt="Avatar" onLoad={() => this.setState({ loading: false })} />
      </div>
    );
  }
}

export default Avatar;
