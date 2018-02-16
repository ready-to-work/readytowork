
/*
 * GET a team page.
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
	var teamID = req.params.teamid;
	var team;
	for (var i in teams.teamlist)
	{
		var currTeam = teams.teamlist[i];
		if( currTeam.teamID == teamID ) team = currTeam;
	}
	team.events = calendars[team.calenID].events;
	data.currTeam = team;

	res.render('team', data);
};