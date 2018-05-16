import React, { Component } from 'react';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      searchInput: '',
    };

    this._handleInputChange = this._handleInputChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/getusername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  _handleInputChange(e) {
    console.log(e.target.value);
    this.setState({ searchInput: e.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          {this.state.username ? (
            <h1>Aloha {this.state.username}!</h1>
          ) : (
            <h1>Loading.. please wait!</h1>
          )}
        </div>
        <div className="sidebar">
          <input id="search" type="text" value={this.state.searchInput} onChange={this._handleInputChange} />
          <button id="send">Search</button>
        </div>
        <div className="content">
        </div>
        <div className="footer">
          ✌🏼 mikehern
        </div>
      </div>
    );
  }
}

export default App;
