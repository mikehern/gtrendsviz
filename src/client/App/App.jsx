import React, { Component } from 'react';
import Typed from 'react-typed';
import './landingpage.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { recentTrends: [] };
  }

  componentDidMount() {
    fetch('/api/getRecentTrends')
      .then(res => res.json())
      .then(trendingQueries => this.setState({ recentTrends: trendingQueries }));
  }

  render () {
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
              strings={this.state.recentTrends}
              typeSpeed={40}
              backSpeed={100}
              attr="placeholder"
              loop >
              <input type="search" id="landing-searchbox--display" />
            </Typed>
            <span className="landing-searchbutton--group">
              <button className="landing-searchbutton--display">View popularity</button>
              <button className="landing-searchbutton--display">Choose for me</button>
            </span>
          </main>
          <footer>©2018 ✌🏽</footer>
        </div>
      </div>;
  }
}

export default App;