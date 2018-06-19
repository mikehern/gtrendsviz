import React, { Component } from 'react';

import './dashboard.css';
import TrendOverTime from '../TrendOverTime/TrendOverTime';
import News from '../News/News';
import RelatedSearch from '../RelatedSearch/RelatedSearch';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDate: '',
      searchInput: '',
      searchResults: '',
      searchQuery: '',
      relatedResults: '',
      landingSearchSubmitted: false
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._sendQuery = this._sendQuery.bind(this);
    this._dateHandler = this._dateHandler.bind(this);
    this._clickedRelatedSearch = this._clickedRelatedSearch.bind(this);
  }

  componentDidMount() {
    document.body.classList.add('dashboard-body--display');

    this.setState({
      searchInput: this.props.landingSearch,
      landingSearchSubmitted: true
    });
  }

  _handleInputChange(e) {
    this.setState({ searchInput: e.target.value });
  }

  _clickedRelatedSearch(keyword) {
    this.setState({ searchInput: keyword });
    this._sendQuery();
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

  componentDidUpdate() {
    if (this.props.landingSearch && this.state.landingSearchSubmitted) {
      this._sendQuery();
      this.setState({ landingSearchSubmitted: false });
    }
  }

  render() {
    const { searchInput, searchResults, searchDate, searchQuery, relatedResults } = this.state;
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
          {!!relatedResults && <RelatedSearch data={relatedResults} searchTerm={this._clickedRelatedSearch} label={searchQuery}/>}
        </div>
        <div className="content">
          <TrendOverTime data={searchResults} searchDate={this._dateHandler} />
          {!!searchDate && <News keyword={searchQuery} date={searchDate} />}
        </div>
      </div>
    );
  }
}

export default Dashboard;
