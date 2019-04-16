import React, {Component} from 'react'
import {connect} from 'react-redux'

import {saveUserInfo} from '../../ducks/reducers/userReducer'

import './profile.css'
import { ucs2 } from 'punycode';

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
        this.setState({[name]: value})
    }

    addDefaultImg = (e) => {
        if(this.props.user.user_image){
            e.target.src = this.props.user.user_image
        } else e.target.src = 'https://wdcolledge.com/wp-content/uploads/2018/04/placeholder.png'
    }
    saveUser = () => {
        let username = this.state.editName
        let userImage = this.state.editPic
        if(username === ''){
            username = this.props.user.username
        }
        if(userImage === ''){
            userImage = this.props.user.user_image
        }
        
        this.props.saveUserInfo({username, userImage})
        this.setState({changeUserInfo: !this.state.changeUserInfo})
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
                    <div className='profile-button-holder'>
                        <button onClick={this.saveUser} >Save</button>
                        <button onClick={() => this.setState({changeUserInfo: !changeUserInfo, editName: '', editPic: ''})}>Cancel</button>
                    </div>
                    <button>Logout</button>
                </div>
            )
        } else {
            return (
                <div className={profile ? 'profile-bar hidden' : 'profile-bar'}>
                    <h2>Username:</h2>
                    <h3>{user.username}</h3>
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

export default connect(mapStateToProps, {saveUserInfo})(Profile)