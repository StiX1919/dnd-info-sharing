
require('dotenv').config()
const Auth0Strategy = require("passport-auth0");

module.exports = function(app){
    return new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      app.get('db').getUserByAuthId([profile.id]).then(response => {
          let fullName = profile.displayName
  
          if(!response[0]) {
              app.get('db').createUserByAuthId([profile.id, fullName, profile.picture])
              .then(created => {
                  return done(null, created[0])
              })
          } else {
              return done(null, response[0])
              
          }
      })
  
    }
  )
}