import React, { Component } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Dashboard from '../Dashboard/Dashboard';
import { Transition } from 'react-transition-group';

import './app.css';
import loader from '../assets/loader.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landingLoadFinished: true,
      landingSearchSubmitted: false,
      landingSearchTerm: '',
    };

    this._imageLoadComplete = this._imageLoadComplete.bind(this);
    this._setSearch = this._setSearch.bind(this);
  }

  _imageLoadComplete() {
    this.setState({ landingLoadFinished : true });
  }

  _setSearch(term) {
    this.setState({
      landingSearchTerm: term,
      landingSearchSubmitted: true,
    });
  }

  render() {
    const {landingLoadFinished, landingSearchSubmitted, landingSearchTerm } = this.state;
    // const tempImage = "https://images.pexels.com/photos/660548/bormio-river-pebbles-italy-660548.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1142&w=1920";
    const transitionStyles = {
      entering: {
        opacity: 0,
        transition: `opacity 1400ms cubic-bezier(0.215, 0.610, 0.355, 1.000)`
      },
      entered: { display: 'none' },
    }

    return (
      <React.Fragment>
        {landingLoadFinished ||
          <div className="landing-placeholder--display">
            <img src={loader} />
            {/* <img
              src={tempImage}
              style={{ display: 'none' }}
              onLoad={this._imageLoadComplete} /> */}
          </div>}
        {landingLoadFinished &&
          <Transition in={(landingLoadFinished && landingSearchSubmitted)} timeout={1800}>
            {(state) => (
              <div style={transitionStyles[state]}>
                <LandingPage landingSearchTerm={(term) => this._setSearch(term)} />
              </div>
            )}
          </Transition>}
        {landingSearchSubmitted &&
          <Dashboard landingSearch={landingSearchTerm}/>}
      </React.Fragment>
    );
  }
}

export default App;