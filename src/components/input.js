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

  onChange = event => this.props.onChange(event.target.name, event.target.value);

  render() {
    const { active } = this.state;
    const { type, name, placeholder, value } = this.props;

    return (
      <div className={`field ${(value || active) && 'active'}`}>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={this.onChange}
          onFocus={() => this.setState({ active: true })}
          onBlur={() => this.setState({ active: false })}
          placeholder={placeholder}
          autoComplete="new-password"
        />
        <label htmlFor={name}>{placeholder}</label>
      </div>
    );
  }
}

export default Input;
