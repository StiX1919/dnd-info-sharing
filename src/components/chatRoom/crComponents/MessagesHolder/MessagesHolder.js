import React, {useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux';
import { getMessages } from '../../../../ducks/reducers/groupReducer'
import moment from 'moment'


// import './chatRoom.css'

function MessagesHolder (props) {
    let [count, setCount] = useState(0)
    const messagesEnd = useRef(null)
    const wrapper = useRef(null)

    useEffect( () => {
        const {scrollHeight, parentElement} = wrapper.current
        if(scrollHeight === (154 + parentElement.scrollTop + parentElement.clientHeight)){
            scrollToBottom('smooth')
        } else if (parentElement.scrollTop === 0){
            scrollToBottom('auto')
        }
        // setCount(++count)
    });
    
    function scrollToBottom(way) {
        console.log('hit')
        messagesEnd.current.scrollIntoView({ behavior: way });
    }

    let messages = props.groupReducer.messages.map((message, i )=> {
        let time = moment.parseZone(message.time_stamp, 'MMMM Do YYYY, h:mm:ss a').utc().fromNow()
        return (
            <div key={i} className='message-info'>
                <h1>{message.message}</h1>
                <h4>{time}</h4>
            </div>
        )
    })
    console.log(count)
    return (
        <div ref={wrapper} id='messages' className='messages'>
            <button onClick={scrollToBottom}/>
            {messages}
            <div style={{height: '10px', width: '100px'}} ref={messagesEnd}></div>
        </div>
    )
}
const mapState = state => state

export default connect(mapState, {getMessages})(MessagesHolder)