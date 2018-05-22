import React, { Component } from 'react';
import './styles.css';
import TrendOverTime from './TrendOverTime';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      searchInput: '',
      searchResults: '',
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._sendQuery = this._sendQuery.bind(this);
  }

  componentDidMount() {
    fetch('/api/getusername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  _handleInputChange(e) {
    this.setState({ searchInput: e.target.value });
  }

  _sendQuery() {
    fetch(`/api/search?q=${this.state.searchInput}`)
      .then(res => res.json())
      .then(data => this.setState({ searchResults: data.results }));
  }

  render() {
    const { searchInput, searchResults } = this.state;
    return (
      <div className="container">
        <div className="header">
          {
            this.state.username ? 
            <h1>Aloha {this.state.username}!</h1>
            : 
            <h1>Loading.. please wait!</h1>
          }
        </div>
        <div className="sidebar">
          <input
            id="search"
            type="text"
            value={searchInput}
            onChange={this._handleInputChange} />
          <button id="send" onClick={this._sendQuery}>Search</button>
        </div>
        <div className="content">
          {/* {
            !this.state.searchResults ?
            'Enter a search term to view trends'
            :
            searchResults
          } */}
          <TrendOverTime trendData={searchResults} margin={{ top: 20, right: 30, bottom: 30, left: 50 }} />
        </div>
        <div className="footer">
          ✌🏼 mikehern
        </div>
      </div>
    );
  }
}

export default App;
