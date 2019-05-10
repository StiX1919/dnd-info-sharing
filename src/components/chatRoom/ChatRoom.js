import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { getMessages } from '../../ducks/reducers/groupReducer'
import moment from 'moment'

import { subscribeToTimer } from '../../api'

function ChatRoom (props) {
    let [state, setState] = useState({timestamp: 'none yet'})

    useEffect(() => {
        // console.log(props)
    
        // subscribeToTimer((err, timestamp) => {
        //     setState({timestamp})
        // })
        console.log('effect hit')
        if(props.groupReducer.currentRoom !== 0) {
            props.getMessages(props.groupReducer.currentRoom)
        }
    }, [props.groupReducer.currentRoom])

    let messages = props.groupReducer.messages.map(message => {
        let time = moment.parseZone(message.time_stamp, 'MMMM Do YYYY, h:mm:ss a').utc().fromNow()
        return (
            <div>
                <h1>{message.message}</h1>
                <h4>{time}</h4>
            </div>
        )
    })
    console.log(state)
    return (
        <div className='chat-room'>
            {messages}
        </div>
    )
}
const mapState = state => state

export default connect(mapState, {getMessages})(ChatRoom)