import React, { Component } from 'react';
import Particles from 'react-particles-js';

import config from './particleconfig';
import './landingpage.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return(
      <div>
        <Particles params={config} width="100vw" height="100vh" style={{ backgroundColor: "#043558" }}>
          Particles?
        </Particles>
      </div>
    )
  }
}

export default App;