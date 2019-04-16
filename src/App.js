import React, { Component } from 'react';
import Header from './components/header/Header'
import TableBar from './components/tableBar/TableBar'
import Profile from './components/profile/Profile'
import TableModel from './components/tableBar/TableModel'

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
        <div>
          {this.props.user &&
            <TableBar />
          }
          {this.props.profile &&
            <Profile />
          }
        </div>





        {/* model for adding new table*/}
        {this.props.tableModel &&
          <TableModel />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({...state.userReducer, tableModel: state.tableReducer.tableModel})

export default connect(mapStateToProps, {setUser})(App);
