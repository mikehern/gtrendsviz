import React, { Component } from 'react';
import Typed from 'react-typed';
import './landingpage.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return <div>
        <div className="landing-wrapper">
          <header>
            What are people <br /> <span id="searching">searching </span> for?
          </header>
          <section>
            <div>
              Other folks from <span>around the United States</span> are searching for
            </div>
          </section>
          <main>
            <Typed
              strings={[
                '2pac',
                'nba trade',
                'who is robert mueller']}
              typeSpeed={40}
              backSpeed={100}
              attr="placeholder"
              loop >
              <input type="search" id="landing-searchbox--display" />
            </Typed>
            <span>
              <button id="landing-searchbutton--display">View popularity</button>
              <button id="landing-searchbutton--display">Choose for me</button>
            </span>
          </main>
          <footer>©2018 ✌🏽</footer>
        </div>
      </div>;
  }
}

export default App;