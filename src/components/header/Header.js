import React, {Component} from 'react'
import './Header.css'

import {connect} from 'react-redux'
import userReducer from '../../ducks/reducers/userReducer';

class Header extends Component {

    userLogin() {
        window.location.href='http://localhost:3001/api/login'
    }


    render(){
        return (
            <div className='header'>
                <h1 className='app-logo'>Logo</h1>
                <h1 className='app-title'>Header</h1>
                {this.props.user 
                    ? <div className='button-holder'><img className='user-button' src={this.props.user.user_image} alt='user'/></div>
                    : <div className='button-holder'><button className='login-button' onClick={this.userLogin}>Login</button></div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({...state.userReducer})

export default connect(mapStateToProps, {})(Header)