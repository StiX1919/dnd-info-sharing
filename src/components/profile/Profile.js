import React, {Component} from 'react'
import {connect} from 'react-redux'

import './profile.css'

class Profile extends Component {

    render() {
        console.log('profile', this.props)
        const { profile, user } = this.props
        return (
            <div className={profile ? 'profile-bar hidden' : 'profile-bar'}>
                <h2>Profile:</h2>
                <h3>Username:</h3>
                <input placeholder='Username' value={user.username}/>
                <h3>Profile Picture:</h3>
                <input placeholder='Username' value={user.user_image}/>
                <button>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = state => {return {...state.userReducer}}

export default connect(mapStateToProps, {})(Profile)