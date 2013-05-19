var passport = require('passport');
var User = require('../models/User');
var FacebookStrategy = require('passport-facebook').Strategy;

// Serialization for passport
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne( { 'id': id }, function (err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: '197017313781062',
    clientSecret: 'e216a7201d3e0d2e36d6d5ae18f75bdf',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: [ 'id', 'displayName', 'username', 'picture' ]
  },
  
  function(accessToken, refreshToken, profile, done) {

    console.log("in callback.  profile.id: " + profile.id + ", displayName: " + profile.displayName);
    var pictureUlr = 'https://graph.facebook.com/' + profile.username + '/picture?type=large'

    // TODO - this should be refactored into User.js as User.findOrCreate()
    User.findOne( { facebookId : profile.id }, function (err, user) {
      console.log("in User.findOne callback");
      if (err) return next(err);


      if (user) {
        console.log("user: " + user);

        console.log("updating display name to: " + profile.displayName);
        console.log("updating imgUrl to: " + profile.picture);
        console.log("username: " + profile.username);
        
        // update the user with latest data from facebook
        User.update(
            { facebookId: profile.id }
          , { $set: 
              { displayName : profile.displayName,
                picture : pictureUlr }
            }
          , function(error, result) {
              console.log('result: ' + result);
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

exports.facebook = passport.authenticate('facebook');
exports.facebookCallback = passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' });
