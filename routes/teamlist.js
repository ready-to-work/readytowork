
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

exports.addTeam = function(req, res) { 
	console.log("Adding a new team");
	var currCount = data.teams.nextIds.nextTeamId + 1;
	var currCountCalen = data.teams.nextIds.nextCalendarId + 1;

	var newTeam = {
		"teamID": currCount,
		"teamName": req.query.name,
		"members": [
	   		{
				"name": "tester", //this will have to be user id later on!
				"id": 1,
				"role": "admin"
			}
		],
	   	"calenID": currCountCalen,
	   	"tasks": [],
	   	"description": req.query.description
	};

	console.log(currCount);
	console.log(currCountCalen);
	data.teams.teamlist.push(newTeam);
	data.teams.nextIds.nextTeamId = currCount;
	data.teams.nextIds.nextCalendarId = currCountCalen;
  	res.redirect("/teamlist");
};