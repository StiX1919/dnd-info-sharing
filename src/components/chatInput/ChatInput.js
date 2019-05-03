import React, {Component} from 'react'

import {connect} from 'react-redux'
import './chatInput.css'

class ChatInput extends Component {
    constructor(){
        super()
    }


    render() {
        return (
            <div className='message-input'>
                <input className='main-input' />
            </div>
        )
    }
}


const mapState = state => state

export default connect(mapState, {})(ChatInput)
