/*
 * GET a tasks page.
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
	data.currTeam = team;

  res.render('tasks', data);
};

exports.addTask = function(req, res) { 
	console.log("Adding a new task");

	var teamID = req.params.teamid;
	var team;
	for (var i in teams.teamlist)
	{
		var currTeam = teams.teamlist[i];
		if( currTeam.teamID == teamID ) team = currTeam;
	}

	var newTask = {
		"title": req.query.title,
		"priority": req.query.priority,
		"due_date": req.query.due_date,
		"description": req.query.description,
		"assigned": []
	  };

	team.tasks.push(newTask);
	data.currTeam = team;

  	res.redirect("/teamlist/team/" + teamID + "/tasks");
};