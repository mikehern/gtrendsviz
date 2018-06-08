import React, { Component } from 'react';

import '../styles.css';
import TrendOverTime from '../TrendOverTime/TrendOverTime';
import News from '../News/News';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDate: '',
      searchInput: '',
      searchResults: '',
      searchQuery: '',
      relatedResults: ''
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
    fetch(`/api/search?q=${this.state.searchInput}`)
      .then(res => res.json())
      .then(data => this.setState({
        searchResults: data.results,
        searchQuery: this.state.searchInput,
      }));

    fetch(`/api/relatedSearch?q=${this.state.searchInput}`)
      .then(res => res.json())
      .then(data => this.setState({ relatedResults : data.results }));
  }

  _dateHandler(date) {
    const thisYear = new Date().getFullYear()
    const selectedDate = new Date(date).setFullYear(thisYear);
    const currentDate = new Date(selectedDate);

    this.setState({ searchDate: currentDate });
  }

  render() {
    const { searchInput, searchResults, searchDate, searchQuery } = this.state;
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
          {!!searchDate && <News keyword={searchQuery} date={searchDate} />}
        </div>
        <div className="footer">
          ✌🏼 mikehern
        </div>
      </div>
    );
  }
}

export default App;
