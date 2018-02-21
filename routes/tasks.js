/*
 * GET a tasks page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json')
var data = {};

exports.view = function(req, res){
	var userID = req.params.userid;
	data.userID = userID; // COPY PASTE FOR EVERY PAGE FOR NAVBAR

	data.currTeam = TEAMS[req.params.teamid];

	for (var i in data.currTeam.tasks)
	{
		data.currTeam.tasks[i].assignedNames = [];

		for (var j in data.currTeam.tasks[i].assigned)
		{
			data.currTeam.tasks[i].assignedNames.push(
				USERS[data.currTeam.tasks[i].assigned[j]].firstName + " " +
				USERS[data.currTeam.tasks[i].assigned[j]].lastName);
		}
	}

  	res.render('tasks', data);
};

exports.addTask = function(req, res) { 
	console.log("Adding a new task");
	var userID = req.params.userid;
	var teamID = req.params.teamid;

	var newTask = {
		"title": req.query.title,
		"priority": req.query.priority,
		"dueDate": req.query.dueDate,
		"dueTime": req.query.dueTime,
		"description": req.query.description,
		"assigned": [] // TODO
	  };

	TEAMS[teamID].tasks.push(newTask);

  	res.redirect("/" + userID + "/teamlist/" + teamID + "/tasks");
};