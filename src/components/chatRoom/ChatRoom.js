import React, {useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux';
import { getMessages } from '../../ducks/reducers/groupReducer'
import moment from 'moment'


import './chatRoom.css'

function ChatRoom (props) {
    let [state, setState] = useState({timestamp: 'none yet'})
    const messagesEnd = useRef(null)

    useEffect( () => {
        console.log('effect hit')
        if(props.groupReducer.currentRoom !== 0) {
            props.getMessages(props.groupReducer.currentRoom)
        }
        scrollToBottom()
    }, [props.groupReducer.currentRoom]);
    
    function scrollToBottom() {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    let messages = props.groupReducer.messages.map(message => {
        let time = moment.parseZone(message.time_stamp, 'MMMM Do YYYY, h:mm:ss a').utc().fromNow()
        return (
            <div className='message-info'>
                <h1>{message.message}</h1>
                <h4>{time}</h4>
            </div>
        )
    })
    // console.log(state)
    return (
        <div className='chat-room'>
        <div  id='messages' className='messages'>
            <button onClick={scrollToBottom}/>
                {messages}
                <div style={{height: '10px', width: '100px'}} ref={messagesEnd}></div>
            </div>
        </div>
    )
}
const mapState = state => state

export default connect(mapState, {getMessages})(ChatRoom)