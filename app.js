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
var events = require('./routes/events');
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
app.use(express.cookieParser('TeeHeeExDee'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// // Handle 404
// app.use(function(req, res) {
//  res.send('404: Page not Found', 404);
// });

// // Handle 500
// app.use(function(error, req, res, next) {
//  res.send('500: Internal Server Error', 500);
// });

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Route requests
app.get('/', index.view);
app.get('/login', index.login);
app.get('/signup', index.signup);
app.get('/signupcomplete', index.signupcomplete);
app.get('/devlogin', index.devlogin);
app.get('/logout', index.logout);
app.get('/home', home.view);
app.get('/home/accept/:teamid', home.accept);
app.get('/home/reject/:teamid', home.reject);
app.get('/teamlist', teamlist.view);
app.get('/teamlist/add', teamlist.addTeam);
app.get('/profile', profile.view);
app.get('/settings', settings.view);
app.get('/teamlist/:teamid/', team.view);
app.get('/teamlist/:teamid/invite', team.invite);
app.get('/teamlist/:teamid/events', events.view);
app.get('/teamlist/:teamid/events/add', events.addEvent);
app.get('/teamlist/:teamid/events/edit', events.editEvent);
app.get('/teamlist/:teamid/tasks', tasks.view);
app.get('/teamlist/:teamid/tasks/add', tasks.addTask);
app.get('/teamlist/:teamid/tasks/edit', tasks.editTask);

// Start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
