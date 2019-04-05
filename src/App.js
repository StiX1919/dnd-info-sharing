import React, { Component } from 'react';

import axios from 'axios'
import logo from './logo.svg'
import Table from './components/table/Table'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
    }
  }
  async userLogin() {
    window.location.href='http://localhost:3001/api/login'
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.userLogin}>Login</button>
        
          <Table />
        </header>
      </div>
    );
  }
}

export default App;
