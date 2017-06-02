import React, { Component } from 'react';
import Context from '../components/context';
import SearchResults from '../components/search-results';
import Chats from '../components/chats';
import NewChat from '../components/new-chat';

class Console extends Component {
  constructor() {
    super();

    this.state = {
      search: false,
    };
  }

  onToggleSearch = () => {
    this.setState({ search: !this.state.search });
  }

  render() {
    const { search } = this.state;
    return (
      <div className="window">
        <Context onToggleSearch={this.onToggleSearch} />
        { search ?
          <SearchResults />
          :
          <span>
            <Chats />
            <NewChat />
          </span>
        }
      </div>
    );
  }
}

export default Console;
