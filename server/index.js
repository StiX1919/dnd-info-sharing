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

let messages = []

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
}
)
app.get('/api/checkSession', (req, res) => {
    if(req.session.passport){
        res.status(200).send(req.session.passport.user)
    }
    else res.sendStatus(500)
    
    // req.app.get('db').getDemoUser().then(user => {
        //     res.status(200).send(user[0])
        // })
})
    console.log(app.session, 'inserve')
    
    app.put('/api/updateUser', updateUser)
    
    app.get('/api/getGroups', getGroups)
    app.post('/api/createGroup', createGroup)
    app.get('/api/groupRooms/:id', getGroupRooms)
    
    app.get('/api/getMessages/:id', getMessages)
    app.post('/api/postMessage', postMessage)



    const io = socket(app.listen(PORT_NUM, () => {
        console.log('We are live on port ', PORT_NUM)
    }))
    
    let interval;
    io.on('connection', (client) => {
        console.log('new guy on')
        if(interval){
            clearInterval(interval)
        }
        interval = setInterval(() => console.log('in interval'), 2000)




        client.on('updateRoom', async (id) => {

            let db = app.get('db')
            messages = await db.messages.where("room_id = $1", [id])
            client.emit('newMessages', {messages})
            
        })

        client.on('newMessage', async(messageData) => {
            const {room, message, time_stamp, userID} = messageData
            const db = app.get('db')
            let newMessage = await db.messages.insert({created_by: userID, message: message, room_id: room, time_stamp: time_stamp})
            // let messages = await db.messages.where("room_id = $1", [room])
            console.log(newMessage)
            io.sockets.emit('newMessage', {newMessage, room})
        })
        
        client.on('disconnect', () => {
            console.log('user disconnected')
            io.emit('user disconnected')
        })
    })
    
    
    // io.listen(PORT_NUM)
    // console.log('Live on port ', PORT_NUM)
    // app.listen(PORT_NUM, () => {
        //     console.log(`We are live on port: ${PORT_NUM}`)
// })