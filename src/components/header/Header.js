import React, {Component} from 'react'
import './Header.css'

class Header extends Component {

    userLogin() {
        window.location.href='http://localhost:3001/api/login'
      }

    render(){
        return (
            <div className='header'>
                <h1 className='app-logo'>Logo</h1>
                <h1 className='app-title'>Header</h1>
                <button className='login-button' onClick={this.userLogin}>Login</button>
            </div>
        )
    }
}

export default Header