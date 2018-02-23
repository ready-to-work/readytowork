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
		"id": TEAMS.nextTaskID,
		"title": req.query.title,
		"priority": req.query.priority,
		"dueDate": req.query.dueDate,
		"dueTime": req.query.dueTime,
		"description": req.query.description,
		"assigned": [] // TODO
	};

	TEAMS.nextTaskID++;
	TEAMS[teamID].tasks.push(newTask);

  	res.redirect("/" + userID + "/teamlist/" + teamID + "/tasks");
};

exports.editTask = function(req, res) { 
	console.log("Editing a new task");
	
	var userid = req.params.userid;
	var teamid = req.params.teamid;

	var currTeam = TEAMS[teamid];
	var newTask = {
		"id": req.query.id,
		"title": req.query.title,
		"priority": req.query.priority,
		"dueDate": req.query.dueDate,
		"dueTime": req.query.dueTime,
		"description": req.query.description,
		"assigned": [] // TODO
	};
	for(var i in currTeam.tasks)
	{
		if(req.query.id == currTeam.tasks[i].id)
		{
			currTeam.tasks[i] = newTask;
		}
	}

  	res.redirect("/" + userid + "/teamlist/" + teamid + "/tasks");
	
};