import openSocket from 'socket.io-client'
import {newMessages} from './ducks/reducers/groupReducer'
import { animateScroll } from "react-scroll";
const socket = openSocket('http://localhost:3001')



console.log('in api')

// socket.on('newMessages', ({messages, room}) => {
//     console.log('it happened', messages, room)
//     newMessages({messages, room})
// })

function subscribeToTimer(cb) {
    // socket.disconnect()
    socket.on('timer', timestamp => cb(null, timestamp))
    socket.emit('subscribeToTimer', 1000)
}


function roomMessages(roomID, cb) {

    socket.emit('updateRoom', roomID)
    socket.on('newMessages', ({messages, room}) => cb(null, {messages, room}))
}


function submitNewMessage(messageData, cb){
    socket.emit('newMessage', messageData)

    // socket.on('newMessages', messages => cb(null, messages))
}

export {subscribeToTimer, roomMessages, submitNewMessage}