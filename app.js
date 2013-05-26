/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , engine = require('ejs-locals')
  , dates = require('./routes/dates')
  , http = require('http')
  , path = require('path')
  , auth = require('./auth/routes')
  , passport = require('passport')
  , facebook = require('./routes/facebook');


// throwaway
var spotify = require('./routes/spotify');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieSession({ secret: 'S0nJ0l0ve!', maxAge: 360*5 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(facebook.Facebook.middleware({ appId: '197017313781062', secret: 'e216a7201d3e0d2e36d6d5ae18f75bdf' }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Only supporting Facebook for now
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

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/', routes.index);
app.get('/dates', ensureAuthenticated, dates.list);
app.get('/create', ensureAuthenticated, dates.form);
app.post('/create', dates.submit);

app.get('/searchSpotify', spotify.search);
app.get('/searchFacebook', facebook.search);

// for ajax searching
app.get('/spotifySearch', spotify.ajaxSearchTracks);
app.get('/facebookSearch', /* facebook.loginRequired */ ensureAuthenticated, facebook.ajaxSearchFriends);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
