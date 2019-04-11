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
                <input type='text' id='username-input' className='prof-input name-text' placeholder={`UserName: ${user.username}`} />
                <label htmlFor="username-input" className="username-label">Username</label>
                <input type='text' id='prof-pic-input' className='prof-input pic-text' placeholder='New Profile image'/>
                <label htmlFor="prof-pic-input" className="prof-pic-label">Profile Picture</label>
                <img className='current-pic' src={user.user_image} alt='current profile pic'/>
                <button>Logout</button>
            </div>
        )
    }
}

// maybe bring in s3 or something to import pics from computers

const mapStateToProps = state => {return {...state.userReducer}}

export default connect(mapStateToProps, {})(Profile)