/*
 * GET a tasks page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json')
var data = {};

exports.view = function(req, res){
	if (!req.session.userID) res.redirect('/');
	var userID = req.session.userID;
	data.userID = userID;

	// Check if they are actually a member of this team
	var isMember = false;
	for (var i in TEAMS[req.params.teamid].members)
	{
		if (TEAMS[req.params.teamid].members[i].userID == userID) isMember = true;
	}
	if (!isMember) res.redirect('/teamlist');

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

	var userID = req.session.userID;
	var teamID = req.params.teamid;

	//date value is: YYYY-MM-DD
	var year = req.query.dueDate.substring(0,4);
	var month = req.query.dueDate.substring(5,7);
	var day = req.query.dueDate.substring(8);
	var newDate = month + "/" + day + "/" + year;

	var newTask = {
		"id": TEAMS.nextTaskID,
		"title": req.query.title,
		"priority": req.query.priority,
		"dueDate": newDate,
		"dueTime": req.query.dueTime,
		"description": req.query.description,
		"assigned": [] // TODO
	};

	TEAMS.nextTaskID++;
	TEAMS[teamID].tasks.push(newTask);

  	res.redirect("/teamlist/" + teamID + "/tasks");
};

exports.editTask = function(req, res) { 
	console.log("Editing a task");
	
	var userID = req.session.userID;
	var teamID = req.params.teamid;

	var year = req.query.dueDate.substring(0,4);
	var month = req.query.dueDate.substring(5,7);
	var day = req.query.dueDate.substring(8);
	var newDate = month + "/" + day + "/" + year;

	var currTeam = TEAMS[teamID];
	var newTask = {
		"id": req.query.id,
		"title": req.query.title,
		"priority": req.query.priority,
		"dueDate": newDate,
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

  	res.redirect("/teamlist/" + teamID + "/tasks");
	
};