import React, { Component } from 'react';

import axios from 'axios'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
        </header>
      </div>
    );
  }
}

export default App;
