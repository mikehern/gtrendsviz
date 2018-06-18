import React, { Component } from 'react';
import Typed from 'react-typed';
import './landingpage.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentTrends: [],
      searchInput: '',
    };

    this._searchInputHandler = this._searchInputHandler.bind(this);
    this._chooseForMeClicked = this._chooseForMeClicked.bind(this);
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
    const { recentTrends } = this.state;
    const defaultRandom = [
      'royal wedding',
      'Golden State Warriors',
      'Robert Mueller',
      'World Cup',
      'summer vacation ideas'
    ];
    const isRecentsLoaded = Boolean(recentTrends.length >= 1);

    const randomSelect = (collection) => Math.floor(Math.random() * collection.length - 1);

    if (isRecentsLoaded) {
      this.setState({ searchInput: recentTrends[randomSelect(recentTrends)] })
    } else {
      this.setState({ searchInput: defaultRandom[randomSelect(defaultRandom)] });
    }

  }

  render () {
    const { recentTrends, searchInput } = this.state;
    return <div>
        <div className="landing-wrapper">
          <header>
            What are people <br /> <span id="searching">searching </span> for?
          </header>
          <section>
            <div>
              Other folks from <span>around the world</span> are searching for
            </div>
          </section>
          <main>
            <Typed
              strings={recentTrends}
              typeSpeed={40}
              backSpeed={100}
              attr="placeholder"
              loop >
              <input
                type="search"
                id="landing-searchbox--display"
                value={searchInput}
                onChange={this._searchInputHandler}  />
            </Typed>
            <span className="landing-searchbutton--group">
              <button className="landing-searchbutton--display">View popularity</button>
              <button
                className="landing-randombutton--display"
                onClick={this._chooseForMeClicked}
              >Choose for me</button>
            </span>
          </main>
          <footer>©2018 ✌🏽</footer>
        </div>
      </div>;
  }
}

export default App;