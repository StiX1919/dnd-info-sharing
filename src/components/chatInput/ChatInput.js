import React, {Component} from 'react'

import Button from '../toolComponents/Button/Button'
import {connect} from 'react-redux'
import './chatInput.css'

class ChatInput extends Component {
    constructor(){
        super()
    }


    render() {
        return (
            <div className='message-input'>
                <div className='input-holder'>
                    <Button style={{height: '35px', width: '35px', marginRight: '10px'}}>+</Button>
                    <h1 className='line-break'>|</h1>
                    <input placeholder="What's on your mind?" className='main-input' />
                </div>
            </div>
        )
    }
}


const mapState = state => state

export default connect(mapState, {})(ChatInput)
