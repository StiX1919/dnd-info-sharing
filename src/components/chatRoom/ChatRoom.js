import React, {useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux';
import { getMessages } from '../../ducks/reducers/groupReducer'
import MessagesHolder from './crComponents/MessagesHolder/MessagesHolder'
import moment from 'moment'


import './chatRoom.css'

function ChatRoom (props) {
    let [state, setState] = useState({timestamp: 'none yet'})

    useEffect( () => {
        console.log('effect hit')
        
        if(props.groupReducer.currentRoom !== 0) {
            props.getMessages(props.groupReducer.currentRoom)
        }
    }, [props.groupReducer.currentRoom]);
    
    
    // console.log(state)
    return (
        <div className='chat-room'>
            {props.groupReducer.messages &&
                <MessagesHolder />
            }
        </div>
    )
}
const mapState = state => state

export default connect(mapState, {getMessages})(ChatRoom)