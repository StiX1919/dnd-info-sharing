require('dotenv').config()
const express = require('express')
const session = require('express-session')
const axios = require('axios')
const massive = require('massive')
const socket = require('socket.io')

const passport = require('passport');

const {updateUser} = require('./controllers/userController')
const {getGroups, createGroup, getGroupRooms, postMessage, getMessages} = require('./controllers/groupController')

const app = express()
const auth = require('./authSetup')
const {PORT_NUM, SESSION_SECRET} = process.env

app.use(express.json())
massive(process.env.CONNECTION_STRING)
.then(db => {
    app.set("db", db);
})
.catch(err => console.log('massive-err', err));


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))


app.use( passport.initialize() )
app.use( passport.session() )
passport.use( auth(app) );
passport.serializeUser(function(user, done) {
    let {username, user_image, uu_id, user_id} = user
    done(null, {username, user_image, uu_id, user_id})
})
passport.deserializeUser(function(obj, done) {
    done(null, obj)
})


app.get('/api/login', passport.authenticate('auth0', {
    failureRedirect: `http://localhost:3001/api/login`
    }), (req, res) => {
    res.redirect(`http://localhost:3000`)
})
app.get('/api/checkSession', (req, res) => {
    if(req.session.passport){
        res.status(200).send(req.session.passport.user)
    }
    else res.sendStatus(500)
})

app.put('/api/updateUser', updateUser)

app.get('/api/getGroups', getGroups)
app.post('/api/createGroup', createGroup)
app.get('/api/groupRooms/:id', getGroupRooms)

app.get('/api/getMessages/:id', getMessages)
app.post('/api/postMessage', postMessage)



const io = socket(app.listen(PORT_NUM, () => {
    console.log('We are live on port ', PORT_NUM)
}))


io.on('connection', (client) => {
    console.log('new guy on')
    
    client.on('updateRoom', async (id) => {
        let messages;
        let db = app.get('db')
        messages = await db.messages.find({room_id: id}, {limit:20, order: [{field:"message_id", direction:"desc"}]})
        // console.log(messages, messages.reverse())
        client.emit('newMessages', {messages: messages.reverse()})            
    })

    client.on('newMessage', async(messageData) => {

        console.dir(client.listenerCount())
        const {room, message, time_stamp, userID} = messageData
        const db = app.get('db')
        let updatedMessage = await db.messages.insert({created_by: userID, message: message, room_id: room, time_stamp: time_stamp})
        console.log(client.id);
        io.emit('newEmitMessage', {updatedMessage, room})
    })
        
    client.on('disconnect', () => {
        console.log('user disconnected')
        io.emit('user disconnected')
    })
})