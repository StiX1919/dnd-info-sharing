import React, { Component } from 'react';
import Header from './components/header/Header'

import axios from 'axios'

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  componentDidMount(){
    axios.get('/api/checkSession').then(res => {
      console.log(res.data)
    })
  }
  
  
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
