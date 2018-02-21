/*
 * GET home page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json');
var data = {};

exports.view = function(req, res){
	var userID = req.params.userid;
	data.userID = userID; // COPY PASTE FOR EVERY PAGE FOR NAVBAR

	data.currUser = USERS[userID];
	data.currEvents = [];
	data.currTasks = [];

	for (var i in data.currUser.teams)
	{
		var currTeam = TEAMS[data.currUser.teams[i]];
		for (var j in currTeam.events)
		{
			var currEvent = currTeam.events[j];
			currEvent.teamName = currTeam.teamName;
			data.currEvents.push(currEvent);
		}
		for (var j in currTeam.tasks)
		{
			var currTask = currTeam.tasks[j];
			currTask.teamName = currTeam.teamName;
			data.currTasks.push(currTask);
		}
	}

  	res.render('home', data);
};