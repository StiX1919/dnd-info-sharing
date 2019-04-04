import React, { Component } from 'react';

import Button from './components/hookDemo'

import axios from 'axios'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    }
  }

  componentDidMount() {
    axios.get('/auth/getUser').then(response => {
      const {username, password} = response.data
      this.setState({username, password, loggedIn: true})
      console.log(response.data, 'in cdm')
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  loginUser = () => {
    const {password, username} = this.state
    axios.post('/auth/login', {password, username}).then(response => {
      this.setState({loggedIn: true})
      console.log(response.data, 'in cdm')
    })
  }


  render() {
    console.log(this.state, 'message')
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button />
          {this.state.loggedIn 
            ? <h1>Thanks for loggin in: {this.state.username}</h1>
            : <div>
              <input onChange={this.handleChange} value={this.state.username} name='username'/>
              <input onChange={this.handleChange} value={this.state.password} name='password'/>
              <button onClick={this.loginUser}>Sign in</button>
            </div>
          }
          
          
        </header>
      </div>
    );
  }
}

export default App;
