
/*
 * GET teamlist page.
 */

var logins = require('../dummy_data/logins.json');
var users = require('../dummy_data/users.json');
var teams = require('../dummy_data/teams.json');
var calendars = require('../dummy_data/calendars.json');
var data = {
	"logins": logins,
	"users": users,
	"teams": teams,
	"calendars": calendars
}

exports.view = function(req, res){
  res.render('teamlist', data);
};