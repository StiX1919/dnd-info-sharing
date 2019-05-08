import React, {Component} from 'react'

import Button from '../toolComponents/Button/Button'
import {connect} from 'react-redux'
import './chatInput.css'

class ChatInput extends Component {


    render() {
        let name = 'loading'
        const {groups, currentGroup, currentRoom} = this.props.groupReducer
        console.log(this.props)
        if(this.props.groupReducer.groups[0]){
            name = groups.find((group) => group.group_id === currentGroup).rooms.find((room) => room.id === currentRoom).name
            // [currentGroup].rooms[currentRoom]
        }
        return (
            <div className='message-input'>
                <div className='input-holder'>
                    <Button style={{height: '35px', width: '35px', marginRight: '10px'}}>+</Button>
                    <div className='line-break-input'></div>
                    <input placeholder={`message #${name}`} className='main-input' />
                </div>
            </div>
        )
    }
}


const mapState = state => state

export default connect(mapState, {})(ChatInput)
