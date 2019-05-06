import React, { Component } from 'react';
import Header from './components/header/Header'
import GroupBar from './components/groupBar/GroupBar'
// import RoomBar from './components/roomBar/RoomBar'
import Profile from './components/profile/Profile'
import GroupModel from './components/groupBar/GroupModel'
import ChatInput from './components/chatInput/ChatInput'

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

export default connect(mapStateToProps, {setUser})(App);
