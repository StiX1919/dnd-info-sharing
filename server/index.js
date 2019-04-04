require('dotenv').config()
const express = require('express')
const session = require('express-session')

const app = express()
const {PORT_NUM, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}))

app.post('/auth/login', (req, res) => {
    const {username, password} = req.body
    req.session.user = {username, password}
    res.status(200).send(req.session)
})
app.get('/auth/getUser', (req, res) => {
    if(req.session.user){
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send('log in plz')
    }

})


app.listen(PORT_NUM, () => {
    console.log(`We are live on port: ${PORT_NUM}`)
})