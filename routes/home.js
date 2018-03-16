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

		// Check for events
		for (var k in currTeam.events)
		{
			var currEvent = currTeam.events[k];
			currEvent.teamName = currTeam.teamName;
			currEvent.teamID = currTeam.teamID;

			// Check if event happens within a week or has ended
			if (currEvent.hasOwnProperty('startDate') && currEvent.hasOwnProperty('endDate'))
			{
				var todaysDate = new Date();
				var weekDate = new Date();
				weekDate.setDate(todaysDate.getDate() + 7);
				var currStartDate = new Date(Date.parse(currEvent.startDate + " " + currEvent.startTime));
				var currEndDate = new Date(Date.parse(currEvent.endDate + " " + currEvent.endTime));
				if (currStartDate > weekDate || currEndDate < todaysDate) continue;
			}

			// Convert dates to readable format
			if (currEvent.hasOwnProperty('startDate'))
			{
				var dateString = currEvent.startDate;
				currEvent.parsedStartDate = dateString.substring(5,7) + "/" + dateString.substring(8) + "/" + dateString.substring(0,4);
			}
			if (currEvent.hasOwnProperty('endDate'))
			{
				dateString = currEvent.endDate;
				currEvent.parsedEndDate = dateString.substring(5,7) + "/" + dateString.substring(8) + "/" + dateString.substring(0,4);
			}
			if (currEvent.hasOwnProperty('startTime'))
			{
				var timeString = currEvent.startTime;
				var hr = timeString.substring(0,2);
				var useAM = true;
				if (hr > 11) useAM = false;
				if (hr == "00") hr = "12";
				if (hr > 12) hr = hr - 12;
				if (useAM) currEvent.parsedStartTime = hr + ":" + timeString.substring(3,5) + " AM";
				else currEvent.parsedStartTime = hr + ":" + timeString.substring(3,5) + " PM";
			}
			if (currEvent.hasOwnProperty('endTime'))
			{
				timeString = currEvent.endTime;
				hr = timeString.substring(0,2);
				useAM = true;
				if (hr > 11) useAM = false;
				if (hr == "00") hr = "12";
				if (hr > 12) hr = hr - 12;
				if (useAM) currEvent.parsedEndTime = hr + ":" + timeString.substring(3,5) + " AM";
				else currEvent.parsedEndTime = hr + ":" + timeString.substring(3,5) + " PM";
			}

			data.currEvents.push(currEvent);
		}

		// Check for tasks
		for (var l in currTeam.tasks)
		{
			var currTask = currTeam.tasks[l];
			currTask.teamName = currTeam.teamName;
			currTask.teamID = currTeam.teamID;

			// Check if task is complete
			if (currTask.completed) continue;

			// Convert dates to readable format
			if (currTask.hasOwnProperty('dueDate'))
			{
				var dateString = currTask.dueDate;
				currTask.parsedDueDate = dateString.substring(5,7) + "/" + dateString.substring(8) + "/" + dateString.substring(0,4);
			}
			if (currTask.hasOwnProperty('dueTime'))
			{
				var timeString = currTask.dueTime;
				var hr = timeString.substring(0,2);
				var useAM = true;
				if (hr > 11) useAM = false;
				if (hr == "00") hr = "12";
				if (hr > 12) hr = hr - 12;
				if (useAM) currTask.parsedDueTime = hr + ":" + timeString.substring(3,5) + " AM";
				else currTask.parsedDueTime = hr + ":" + timeString.substring(3,5) + " PM";
			}

			data.currTasks.push(currTask);
		}
	}

	// Combine alerts and tasks into one
	data.alerts = [];

	for (var i in data.currEvents)
	{
		data.currEvents[i].isEvent = true;
		data.currEvents[i].isTask = false;
		data.currEvents[i].sortDate = data.currEvents[i].startDate;
		data.currEvents[i].sortTime = data.currEvents[i].startTime;
		data.alerts.push(data.currEvents[i]);
	}
	for (var i in data.currTasks)
	{
		data.currTasks[i].isEvent = false;
		data.currTasks[i].isTask = true;
		data.currTasks[i].sortDate = data.currTasks[i].dueDate;
		data.currTasks[i].sortTime = data.currTasks[i].dueTime;
		data.alerts.push(data.currTasks[i]);
	}

	// Sort alerts by date
	data.alerts.sort(function(a, b) {
		var a_date = a.sortDate;
		var a_time = a.sortTime;
		var b_date = b.sortDate;
		var b_time = b.sortTime;

		a_date = new Date(Date.parse(a_date + " " + a_time));
		b_date = new Date(Date.parse(b_date + " " + b_time));

		return a_date - b_date;
	});

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