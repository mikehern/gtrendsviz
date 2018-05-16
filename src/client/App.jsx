import React, { Component } from 'react';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }

  componentDidMount() {
    fetch('/api/getusername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h5>Header</h5>
          {this.state.username ? (
            <h1>Aloha {this.state.username}!</h1>
          ) : (
            <h1>Loading.. please wait!</h1>
          )}
        </div>
        <div className="sidebar">
          <h5>Sidebar</h5>
        </div>
        <div className="content">
          <h5>Content</h5>
        </div>
        <div className="footer">
          <h5>Footer</h5>
          ✌🏼 mikehern
        </div>
      </div>
    );
  }
}

export default App;
