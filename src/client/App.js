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
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
        {this.state.username ? (
          <h1>Aloha {this.state.username}!</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}

export default App;
