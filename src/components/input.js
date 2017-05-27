import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    type: 'text',
    placeholder: '',
    value: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  render() {
    const { active } = this.state;
    const { type, name, placeholder, value, onChange } = this.props;

    return (
      <div className="field">
        <label htmlFor={name}>{placeholder}</label>
        <input stype={type} id={name} name={name} value={value} onChange={onChange} />
      </div>
    );
  }
}

export default Input;
