import React, {Component} from 'react'
import {connect} from 'react-redux'

import './profile.css'

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            editName: '',
            editPic: '',

            changeUserInfo: false
        }
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({[e.target.name]: e.target.value})
    }

    addDefaultImg = (e) => {
        if(this.props.user.user_image){
            e.target.src = this.props.user.user_image
        } else e.target.src = 'https://wdcolledge.com/wp-content/uploads/2018/04/placeholder.png'
    }

    

    render() {
        console.log('profile', this.props)
        const { profile, user } = this.props
        const {changeUserInfo} = this.state
        if(changeUserInfo){
            return (
                <div className={profile ? 'profile-bar hidden' : 'profile-bar'}>
                    
                    <h2>Profile:</h2>
                    <input 
                        type='text' 
                        id='username-input' 
                        className='prof-input name-text' 
                        placeholder={`UserName: ${user.username}`} 
                        value={this.state.editName}
                        name='editName'
                        onChange={this.handleChange}/>
                    <label htmlFor="username-input" className="username-label">Username</label>
                    <input 
                        type='text' 
                        id='prof-pic-input' 
                        className='prof-input pic-text' 
                        placeholder='New Profile image'
                        value={this.state.editPic}
                        name='editPic'
                        onChange={this.handleChange}/>
                    <label htmlFor="prof-pic-input" className="prof-pic-label">Profile Picture</label>
                    <img className='current-pic' src={this.state.editPic} onError={this.addDefaultImg} alt='old profile pic'/>
                    <button onClick={() => this.setState({changeUserInfo: !changeUserInfo})}>Cancel</button>
                    <button>Logout</button>
                </div>
            )
        } else {
            return (
                <div className={profile ? 'profile-bar hidden' : 'profile-bar'}>
                    <h1>Username:</h1>
                    <h2>{user.username}</h2>
                    <img className='current-pic' src={user.user_image} onError={this.addDefaultImg} alt='current profile pic'/>
                    <button onClick={() => this.setState({changeUserInfo: !changeUserInfo})}>Update user Info</button>
                    <button>Logout</button>
                </div>
            )
        }
    }
}

// maybe bring in s3 or something to import pics from computers

const mapStateToProps = state => {return {...state.userReducer}}

export default connect(mapStateToProps, {})(Profile)