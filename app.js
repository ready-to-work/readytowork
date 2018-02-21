
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

// Routes
var index = require('./routes/index');
var home = require('./routes/home');
var teamlist = require('./routes/teamlist');
var profile = require('./routes/profile');
var settings = require('./routes/settings');
var team = require('./routes/team');
var calendar = require('./routes/calendar');
var tasks = require('./routes/tasks');

var app = express();

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Route requests
app.get('/', index.view);
app.get('/login', index.login);
app.get('/:userid/home', home.view);
app.get('/:userid/teamlist', teamlist.view);
app.get('/:userid/teamlist/add', teamlist.addTeam);
app.get('/:userid/profile', profile.view);
app.get('/:userid/settings', settings.view);
app.get('/:userid/teamlist/:teamid', team.view);
app.get('/:userid/teamlist/:teamid/calendar', calendar.view);
app.get('/:userid/teamlist/:teamid/tasks', tasks.view);
app.get('/:userid/teamlist/:teamid/tasks/add', tasks.addTask);

// Start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
