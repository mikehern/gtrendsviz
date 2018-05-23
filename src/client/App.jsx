import React, { Component } from 'react';

import './styles.css';
import TrendOverTime from './TrendOverTime';
import tempData from './tempData';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDate: '',
      searchInput: '',
      searchResults: '',
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._sendQuery = this._sendQuery.bind(this);
    this._dateHandler = this._dateHandler.bind(this);
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
    // fetch(`/api/search?q=${this.state.searchInput}`)
    //   .then(res => res.json())
    //   .then(data => this.setState({ searchResults: data.results }));

    this.setState({ searchResults: tempData });
  }

  _dateHandler(date) {
    this.setState({ searchDate: date });
  }

  render() {
    const { searchInput, searchResults } = this.state;
    return (
      <div className="container">
        <div className="header">
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
          <TrendOverTime data={searchResults} searchDate={this._dateHandler} />
        </div>
        <div className="footer">
          ✌🏼 mikehern
        </div>
      </div>
    );
  }
}

export default App;
