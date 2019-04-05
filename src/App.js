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


  render() {
    return (
      <div className="App">
        <header className="App-header">
        
          <Table />
        </header>
      </div>
    );
  }
}

export default App;
