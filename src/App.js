import React, { Component } from 'react';
import Header from './components/header/Header'
import GroupBar from './components/groupBar/GroupBar'
// import RoomBar from './components/roomBar/RoomBar'
import Profile from './components/profile/Profile'
import GroupModel from './components/groupBar/GroupModel'
import ChatInput from './components/chatInput/ChatInput'
import ChatRoom from './components/chatRoom/ChatRoom'

import axios from 'axios'
import {connect} from 'react-redux'

import {setUser} from './ducks/reducers/userReducer'
import {newMessage} from './ducks/reducers/groupReducer'

import openSocket from 'socket.io-client'

import './App.css';

const socket = openSocket('http://localhost:3001')
class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      profile: false,
      username: '',
      showing: false
    }

  }
  
  componentDidMount(){
    if(!this.props.user){
      axios.get('/api/checkSession').then(res => {
        this.props.setUser(res.data)
      })
    }
    socket.on('newEmitMessage', messages => {
      (() => {
        console.log('MESSAGES: ', messages)
        this.props.newMessage(messages)
    })()
  })
  }
  handleShowing = () => {
    this.setState((prevState) => {
      return {showing: !prevState.showing}
    })
  }
  
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <Header />
        <div>
          {this.props.user &&
            <div>
              <div className={this.state.showing ? 'bar-tab open' : 'bar-tab'} onClick={this.handleShowing}></div>
              <GroupBar hidden={this.state.showing}/>
              <ChatRoom />
              <ChatInput />
            </div>
          }
          
          {this.props.profile &&
            <Profile />
          }
        </div>





        {/* model for adding new group*/}
        {this.props.groupModel &&
          <GroupModel />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({...state.userReducer, groupModel: state.groupReducer.groupModel})

export default connect(mapStateToProps, {setUser, newMessage})(App);
