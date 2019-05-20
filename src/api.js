import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3001')

// socket.on('newEmitMessage')
let count = 0
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
    socket.removeListener('newEmitMessage');
    
    socket.emit('newMessage', messageData)
    if(count > 0) {
        socket.on('newEmitMessage', messages => {
            cb(null, messages); 
        })
    }
}

export {subscribeToTimer, roomMessages, submitNewMessage}