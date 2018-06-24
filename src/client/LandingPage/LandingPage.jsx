import React, { Component } from 'react';
import Typed from 'react-typed';
import './landingpage.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentTrends: [],
      searchInput: '',
    };

    this._searchInputHandler = this._searchInputHandler.bind(this);
    this._chooseForMeClicked = this._chooseForMeClicked.bind(this);
    this._viewPopularityClicked = this._viewPopularityClicked.bind(this);
    this._enterKeyHandler = this._enterKeyHandler.bind(this);
  }

  componentDidMount() {
    fetch('/api/getRecentTrends')
      .then(res => res.json())
      .then(trendingQueries => this.setState({
         recentTrends: trendingQueries 
      }));
  }

  _searchInputHandler(e) {
    this.setState({ searchInput: e.target.value });
  }

  _chooseForMeClicked() {
    const defaultTrends = [
      'royal wedding',
      'Golden State Warriors',
      'World Cup',
      'summer vacation ideas',
      '10 day forecast',
      'Mexico',
      'Robert Mueller',
    ];
    const randomSelect = (collection) => Math.floor(Math.random() * collection.length - 1);

    this.setState({ searchInput: defaultTrends[randomSelect(defaultTrends)] });
  }

  _viewPopularityClicked() {
    if (this.state.searchInput.length !== 0) {
      this.props.landingSearchTerm(this.state.searchInput);
    }
  }

  _enterKeyHandler(event) {
    if (event.key === 'Enter') {
      this._viewPopularityClicked();
    }
  }

  render () {
    const { recentTrends, searchInput } = this.state;
    return (
      <div>
        <div className="landing-wrapper">
          <header>
            What are people <br /> <span id="landing-searching--gradient">
              searching{' '}
            </span> for?
          </header>
          <section>
            <div>
              Other folks from <span>around the world</span> are searching for
            </div>
          </section>
          <main>
            <Typed strings={recentTrends} typeSpeed={40} backSpeed={100} attr="placeholder" loop>
              <input type="search" id="landing-searchbox" value={searchInput} autoComplete="off" onKeyPress={this._enterKeyHandler} onChange={this._searchInputHandler} />
            </Typed>
            <div className="landing-btn--group">
              <button className="landing-popular-btn" onClick={this._viewPopularityClicked}>
                View popularity
              </button>
              <button className="landing-random-btn" onClick={this._chooseForMeClicked}>
                Choose for me
              </button>
            </div>
          </main>
          <footer>©2018 ✌🏽</footer>
        </div>
      </div>
    );
  }
}

export default LandingPage;