import React, {Component} from 'react'
import './Header.css'

import logo from '../../logo'
import {connect} from 'react-redux'
import {} from '../../ducks/reducers/userReducer';

class Header extends Component {

    userLogin() {
        window.location.href='http://localhost:3001/api/login'
    }


    render(){
        return (
            <div className='header'>
                <div className='button-holder'><img className='app-logo' src={logo} alt='logo'/></div>
                <h1 className='app-title'>Header</h1>
                <div className='button-holder'>
                    {this.props.user 
                        ? <img className='user-button' src={this.props.user.user_image} alt='user'/>
                        : <button className='login-button' onClick={this.userLogin}>Login</button>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({...state.userReducer})

export default connect(mapStateToProps, {})(Header)