require('dotenv').config()
const express = require('express')

const app = express()
const {PORT_NUM} = process.env

app.use(express.json())


app.listen(PORT_NUM, () => {
    console.log(`We are live on port: ${PORT_NUM}`)
})