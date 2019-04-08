import React, { Component } from 'react';
import Header from './components/header/Header'

import axios from 'axios'

import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      profile: false
    }
  }

  componentDidMount(){
    axios.get('/api/checkSession').then(res => {
      console.log(res.data)
      if(res.data.passport){
        this.setState({loggedIn: true})
        if(res.data.passport.user.username){
          this.setState({profile: true})
        }
      }
    })
  }
  
  
  render() {
    let {loggedIn, profile} = this.state
    return (
      <div className="App">
        <Header />
        {loggedIn 
          ? profile 
            ? <h1>Thanks for loggin in</h1>
            : <h1>Input user info</h1>
          : <h1>Please login</h1>
        }
      </div>
    );
  }
}

export default App;
