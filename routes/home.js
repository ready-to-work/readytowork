/*
 * GET home page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json');
var data = {};

exports.view = function(req, res){
	if (!req.session.userID) res.redirect('/');
	var userID = req.session.userID;

	data.currUser = USERS[userID];
	data.currEvents = [];
	data.currTasks = [];
	data.currInvites = [];

	for (var i in data.currUser.teams)
	{
		var currTeam = TEAMS[data.currUser.teams[i]];

		// Check if invite
		var isInvited = false;
		for (var j in currTeam.members)
		{
			var currMember = currTeam.members[j];
			if (currMember.userID == userID)
			{
				if (currMember.role == "invited")
				{
					data.currInvites.push(currTeam);
					isInvited = true;
				}
			}
		}
		if (isInvited) continue;

		// Check for events and tasks
		for (var k in currTeam.events)
		{
			var currEvent = currTeam.events[k];
			currEvent.teamName = currTeam.teamName;
			data.currEvents.push(currEvent);
		}
		for (var l in currTeam.tasks)
		{
			var currTask = currTeam.tasks[l];
			currTask.teamName = currTeam.teamName;
			data.currTasks.push(currTask);
		}
	}

  	res.render('home', data);
};

exports.accept = function(req, res){
	var userID = req.session.userID;
	var teamID = req.params.teamid;

	for (var i in TEAMS[teamID].members)
	{
		if (TEAMS[teamID].members[i].userID == userID)
		{
			if (TEAMS[teamID].members[i].role == "invited")
			{
				TEAMS[teamID].members[i].role = "member";
			}
		}
	}

	res.redirect('/home');
}

exports.reject = function(req, res){
	var userID = req.session.userID;
	var teamID = req.params.teamid;

	// Remove from user
	var teamArray = USERS[userID].teams;
	var index = teamArray.indexOf(teamID);
	if (index > -1) teamArray.splice(index, 1);

	// Remove from team
	for (var i in TEAMS[teamID].members)
	{
		if (TEAMS[teamID].members[i].userID == userID)
		{
			// TODO, since it's technically not needed
		}
	}

	res.redirect('/home');
}