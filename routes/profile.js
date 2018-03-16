/*
 * GET profile page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json')
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
			currEvent.past = false;

			// Check if event has ended
			if (currEvent.hasOwnProperty('startDate') && currEvent.hasOwnProperty('endDate'))
			{
				var todaysDate = new Date();
				var weekDate = new Date();
				weekDate.setDate(todaysDate.getDate() + 7);
				var currEndDate = new Date(currEvent.endDate.substring(0,4), currEvent.endDate.substring(5,7) - 1, currEvent.endDate.substring(8));
				if (currEndDate < todaysDate) currEvent.past = true;
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

			currEvent.sortDate = currEvent.startDate;
			currEvent.sortTime = currEvent.startTime;
			data.currEvents.push(currEvent);
		}

		// Check for tasks
		for (var l in currTeam.tasks)
		{
			var currTask = currTeam.tasks[l];
			currTask.teamName = currTeam.teamName;
			currTask.teamID = currTeam.teamID;
			currTask.complete = false;

			// Check if task is complete
			if (currTask.completed) currTask.complete = true;

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

			currTask.sortDate = currTask.dueDate;
			currTask.sortTime = currTask.dueTime;
			data.currTasks.push(currTask);
		}
	}

	// // Sort events by date
	// data.currEvents.sort(function(a, b) {
	// 	var a_date = a.sortDate;
	// 	var a_time = a.sortTime;
	// 	var b_date = b.sortDate;
	// 	var b_time = b.sortTime;

	// 	a_date = new Date(Date.parse(a_date + " " + a_time));
	// 	b_date = new Date(Date.parse(b_date + " " + b_time));

	// 	return a_date - b_date;
	// });

	// // Sort tasks by date
	// data.currTasks.sort(function(a, b) {
	// 	var a_date = a.sortDate;
	// 	var a_time = a.sortTime;
	// 	var b_date = b.sortDate;
	// 	var b_time = b.sortTime;

	// 	a_date = new Date(Date.parse(a_date + " " + a_time));
	// 	b_date = new Date(Date.parse(b_date + " " + b_time));

	// 	return a_date - b_date;
	// });
	
	res.render('profile', data);
};