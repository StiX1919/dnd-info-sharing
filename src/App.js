import React, { Component } from 'react';
import Header from './components/header/Header'
import Profile from './components/profile/Profile'

import axios from 'axios'
import {connect} from 'react-redux'

import {setUser} from './ducks/reducers/userReducer'

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
    if(!this.props.user){
      axios.get('/api/checkSession').then(res => {
        this.props.setUser(res.data)
      })
    }
  }
  
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

const mapStateToProps = state => ({...state.userReducer})

export default connect(mapStateToProps, {setUser})(App);
