import React, {Component} from 'react'
import './Header.css'

import logo from '../../logo'
import {connect} from 'react-redux'
import {openProfile} from '../../ducks/reducers/userReducer';
import Button from '../toolComponents/Button'

class Header extends Component {

    userLogin() {
        window.location.href='http://localhost:3001/api/login'
    }


    render(){
        let user_image
        if(this.props.user){
            user_image = this.props.user.user_image
        }
        return (
            <div className='header'>
                <div className='button-holder'><img className='app-logo' src={logo} alt='logo'/></div>
                <h1 className='app-title'>Header</h1>
                <div className='button-holder'>
                    {this.props.user 
                        ? <Button buttFunc={this.props.openProfile} style={this.props.user ?{backgroundImage: `url(${user_image ? user_image : 'https://wdcolledge.com/wp-content/uploads/2018/04/placeholder.png'})`}: null}></Button>
                        : <Button buttFunc={this.userLogin}>Login</Button>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({...state.userReducer})

export default connect(mapStateToProps, {openProfile})(Header)