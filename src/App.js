import React, { Component } from 'react';
import Header from './components/header/Header'
import Profile from './components/profile/Profile'

import axios from 'axios'

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      profile: false,
      username: ''
    }
    
  }

  componentDidMount(){
    axios.get('/api/checkSession').then(res => {
      this.setState({username: res.data.username})
    })
  }
  
  render() {
    console.log(this.state)
    let {loggedIn, profile} = this.state
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
