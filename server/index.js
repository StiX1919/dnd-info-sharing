require('dotenv').config()
const express = require('express')
const session = require('express-session')
const axios = require('axios')

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




app.listen(PORT_NUM, () => {
    console.log(`We are live on port: ${PORT_NUM}`)
})