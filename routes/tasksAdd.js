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

exports.addTask = function(req, res) { 
	console.log("Adding a new task");

	var newTask = {
		"title": req.query.task,
		"due_date": req.query.due,
		"priority": req.query.priority,
		"description": req.query.description,
		"assigned": []
	  };

	data.teams.teamlist.push(newTeam);
	data.teams.nextIds.nextTeamId = currCount;
	data.teams.nextIds.nextCalendarId = currCountCalen;
  	res.render("teamlist", data);
};