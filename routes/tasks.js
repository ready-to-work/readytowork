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
		// Convert dates to readable format
		if (data.currTeam.tasks[i].hasOwnProperty('dueDate'))
		{
			var dateString = data.currTeam.tasks[i].dueDate;
			data.currTeam.tasks[i].parsedDueDate = dateString.substring(5,7) + "/" + dateString.substring(8) + "/" + dateString.substring(0,4);
		}
		if (data.currTeam.tasks[i].hasOwnProperty('dueTime'))
		{
			var timeString = data.currTeam.tasks[i].dueTime;
			var hr = timeString.substring(0,2);
			var useAM = true;
			if (hr > 11) useAM = false;
			if (hr == "00") hr = "12";
			if (hr > 12) hr = hr - 12;
			if (useAM) data.currTeam.tasks[i].parsedDueTime = hr + ":" + timeString.substring(3,5) + " AM";
			else data.currTeam.tasks[i].parsedDueTime = hr + ":" + timeString.substring(3,5) + " PM";
		}

		// Track who are assigned to this task (Potential TODO)
		data.currTeam.tasks[i].assignedNames = [];

		for (var j in data.currTeam.tasks[i].assigned)
		{
			data.currTeam.tasks[i].assignedNames.push(
				USERS[data.currTeam.tasks[i].assigned[j]].firstName + " " +
				USERS[data.currTeam.tasks[i].assigned[j]].lastName);
		}
	}

	// Get today's date and time for autofill during event creation
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd<10) dd = '0'+dd;
	if (mm<10) mm = '0'+mm;

	data.todaysDate = yyyy + '-' + mm + '-' + dd;

	var hr = today.getHours();
	var min = today.getMinutes();
	if (hr<10) hr = '0'+hr;
	if (min<10) min = '0'+min;

	data.todaysTime = hr + ':' + min + ':00';

  	res.render('tasks', data);
};

exports.addTask = function(req, res) { 
	console.log("Adding a new task");

	var userID = req.session.userID;
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

  	res.redirect("/teamlist/" + teamID + "/tasks");
};

exports.editTask = function(req, res) { 
	console.log("Editing a task");
	
	var userID = req.session.userID;
	var teamID = req.params.teamid;

	var currTeam = TEAMS[teamID];
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

  	res.redirect("/teamlist/" + teamID + "/tasks");
	
};