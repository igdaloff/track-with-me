var passport = require('passport');
var User = require('../models/User');
var FacebookStrategy = require('passport-facebook').Strategy;

// Serialization for passport - all based on the user.id, not the facebookId
passport.serializeUser(function(user, done) {
  console.log("serializaing user: " + user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne( { '_id': id }, function (err, user) {
    console.log("deserialized user: " + user);
    done(err, user);
  });
});

/* The clientID and clientSecret will change depending on environment.
   These are the DEV credentials.

   TODO - figure out the best way to accoplish this in Node/Express */
passport.use(new FacebookStrategy({
    clientID: '197017313781062',
    clientSecret: 'e216a7201d3e0d2e36d6d5ae18f75bdf',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: [ 'id', 'displayName', 'username', 'picture' ]
  },
  
  function(accessToken, refreshToken, profile, done) {

    var pictureUlr = 'https://graph.facebook.com/' + profile.username + '/picture?type=large'

    // TODO - this should be refactored into User.js as User.findOrCreate()
    User.findOne( { facebookId : profile.id }, function (err, user) {
      if (err) return next(err);


      if (user) {

        console.log("profile picture: " + profile.picture);
        
        // update the user with latest data from facebook
        User.update(
            { facebookId: profile.id }
          , { $set: 
              { displayName : profile.displayName,
                picture : pictureUlr }
            }
          , function(error, result) {
              if (error) console.log("Error updating user info: " + error);
            }
        );

        console.log("logged in as " + user.displayName);
        return done(err, user);
      } 


      User.create({ facebookId: profile.id, displayName : profile.displayName, picture : pictureUlr }, function (err, user){
        console.log("logged in as " + user.displayName);
        return done(err, user);
      });
    });
  }
));
