
/**
 * Module dependencies.
 */
var User = require('./models/User');

var express = require('express')
  , routes = require('./routes')
  , dates = require('./routes/dates')
  , login = require('./routes/login')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

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

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieSession({ secret: 'S0nJ0l0ve!', maxAge: 360*5 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Serialization for passport
passport.serializeUser(function(user, done) {
  console.log("serialize - user.id: " + user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserialize - id: " + id);
  User.findOne( { 'id': id }, function (err, user) {
    done(err, user);
  });
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/', routes.index);
app.get('/login', login.login);
app.get('/dates', dates.list);
app.get('/create', dates.form);
app.post('/create', dates.submit(app.get('dates')));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
