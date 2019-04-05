require('dotenv').config()
const express = require('express')
const session = require('express-session')
const axios = require('axios')

const passport = require('passport');
const Auth0Strategy = require("passport-auth0");

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

passport.use( 
    new Auth0Strategy(
  {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/api/login"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    
    app.get('db').getUserByAuthId([profile.id]).then(response => {

        if(!response[0]) {
            app.get('db').createUserByAuthId([profile.id, 'email'])
            .then(created => {
                return done(null, created[0])
            })
        } else {
            return done(null, response[0])
            
        }
    })

  }
));
passport.serializeUser(function(user, done) {
    done(null, user)
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




app.listen(PORT_NUM, () => {
    console.log(`We are live on port: ${PORT_NUM}`)
})