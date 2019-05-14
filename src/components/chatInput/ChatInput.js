import React, {Component} from 'react'
import moment from 'moment'
// import moment from 'moment-timezone'

import Button from '../toolComponents/Button/Button'
import {connect} from 'react-redux'
import './chatInput.css'

import {postMessage, newMessages, newMessage} from '../../ducks/reducers/groupReducer'
import {submitNewMessage} from '../../api'


class ChatInput extends Component {
    constructor(){
        super()
        this.state = {
            inputVal: ''
        }
    }
    handleChange = (e) => {
        this.setState({inputVal: e.target.value})
        
        // console.log('timestamp', timestamp)
        // console.log()
    }
    submit = () => {
        let timestamp = moment().utc().format('MMMM Do YYYY, h:mm:ss a');
        // this.props.postMessage(this.props.groupReducer.currentRoom, this.state.inputVal, timestamp)
        submitNewMessage({userID:this.props.userReducer.user.user_id ,room: this.props.groupReducer.currentRoom, message: this.state.inputVal, time_stamp: timestamp}, (err, messages) => {
            console.log(messages)
            this.props.newMessage(messages)
        })
        this.setState({inputVal: ''})
    }

    render() {
        let name = 'loading'
        const {groups, currentGroup, currentRoom} = this.props.groupReducer
        if(this.props.groupReducer.groups[0]){
            name = groups.find((group) => group.group_id === currentGroup).rooms.find((room) => room.id === currentRoom).name
            // [currentGroup].rooms[currentRoom]
        }
        return (
            <div className='message-input'>
                <div className='input-holder'>
                    <Button style={{height: '35px', width: '35px', marginRight: '10px'}}>+</Button>
                    <div className='line-break-input'></div>
                    <input placeholder={`message #${name}`} 
                        className='main-input' 
                        value={this.state.inputVal} 
                        onKeyDown={(e) => {
                            if(e.keyCode === 13 && this.state.inputVal)
                            this.submit()
                        }} 
                        onChange={e => this.handleChange(e)} />
                </div>
            </div>
        )
    }
}


const mapState = state => state

export default connect(mapState, {postMessage, newMessages, newMessage})(ChatInput)
