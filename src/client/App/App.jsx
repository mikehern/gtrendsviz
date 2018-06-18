import React, { Component } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Dashboard from '../Dashboard/Dashboard';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landingLoadFinished: false,
      landingSearchSubmitted: false,
      landingSearchTerm: '',
    };

    this._imageLoadComplete = this._imageLoadComplete.bind(this);
    this._setSearch = this._setSearch.bind(this);
  }

  componentDidMount() {
    console.log('state: ', this.state.landingLoadFinished);
  }

  _imageLoadComplete() {
    console.log('noww the image loaded.');
    this.setState({ landingLoadFinished : true });
  }

  _setSearch(term) {
    console.log('term is: ', term);
    this.setState({
      landingSearchTerm: term,
      landingSearchSubmitted: true,
    });
  }

  render() {
    const {landingLoadFinished, landingSearchSubmitted } = this.state;
    const tempImage = "https://images.pexels.com/photos/660548/bormio-river-pebbles-italy-660548.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1142&w=1920";

    return (
      <React.Fragment>
        {landingLoadFinished || <img src={tempImage} style={{ display: 'none' }} onLoad={this._imageLoadComplete} />}
        {landingLoadFinished && !landingSearchSubmitted && <LandingPage landingSearchTerm={(term) => this._setSearch(term)} />}
        {landingSearchSubmitted && <Dashboard />}
      </React.Fragment>
    );
  }
}

export default App;