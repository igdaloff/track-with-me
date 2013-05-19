
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , dates = require('./routes/dates')
  , login = require('./routes/login')
  , http = require('http')
  , path = require('path')
  , auth = require('./auth/routes')
  , passport = require('passport')

var app = express();

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

app.get('/auth/facebook', auth.facebook);
app.get('/auth/facebook/callback', auth.facebookCallback);
app.get('/', routes.index);
app.get('/login', login.login);
app.get('/dates', dates.list);
app.get('/create', dates.form);
app.post('/create', dates.submit(app.get('dates')));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
