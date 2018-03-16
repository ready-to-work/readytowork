/*
 * GET a events page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json')
var data = {};

exports.view = function(req, res){
	if (!req.session.userID) res.redirect('/');
	var userID = req.session.userID;
	data.userID = userID;

	data.pastEvents = [];
	data.presentEvents = [];

	// Check if they are actually a member of this team
	var isMember = false;
	for (var i in TEAMS[req.params.teamid].members)
	{
		if (TEAMS[req.params.teamid].members[i].userID == userID) isMember = true;
	}
	if (!isMember) res.redirect('/teamlist');

	data.currTeam = TEAMS[req.params.teamid];

	for (var i in data.currTeam.events)
	{
		// Convert dates to readable format
		if (data.currTeam.events[i].hasOwnProperty('startDate'))
		{
			var dateString = data.currTeam.events[i].startDate;
			data.currTeam.events[i].parsedStartDate = dateString.substring(5,7) + "/" + dateString.substring(8) + "/" + dateString.substring(0,4);
		}
		if (data.currTeam.events[i].hasOwnProperty('endDate'))
		{
			dateString = data.currTeam.events[i].endDate;
			data.currTeam.events[i].parsedEndDate = dateString.substring(5,7) + "/" + dateString.substring(8) + "/" + dateString.substring(0,4);
		}
		if (data.currTeam.events[i].hasOwnProperty('startTime'))
		{
			var timeString = data.currTeam.events[i].startTime;
			var hr = timeString.substring(0,2);
			var useAM = true;
			if (hr > 11) useAM = false;
			if (hr == "00") hr = "12";
			if (hr > 12) hr = hr - 12;
			if (useAM) data.currTeam.events[i].parsedStartTime = hr + ":" + timeString.substring(3,5) + " AM";
			else data.currTeam.events[i].parsedStartTime = hr + ":" + timeString.substring(3,5) + " PM";
		}
		if (data.currTeam.events[i].hasOwnProperty('endTime'))
		{
			timeString = data.currTeam.events[i].endTime;
			hr = timeString.substring(0,2);
			useAM = true;
			if (hr > 11) useAM = false;
			if (hr == "00") hr = "12";
			if (hr > 12) hr = hr - 12;
			if (useAM) data.currTeam.events[i].parsedEndTime = hr + ":" + timeString.substring(3,5) + " AM";
			else data.currTeam.events[i].parsedEndTime = hr + ":" + timeString.substring(3,5) + " PM";
		}

		// Track people who are going to the event
		data.currTeam.events[i].goingNames = [];

		for (var j in data.currTeam.events[i].going)
		{
			data.currTeam.events[i].goingNames.push(
				USERS[data.currTeam.events[i].going[j]].firstName + " " +
				USERS[data.currTeam.events[i].going[j]].lastName);
		}

		// Separate past and present events
		var currEvent = data.currTeam.events[i];
		var isPast = false;

		if (currEvent.hasOwnProperty('startDate') && currEvent.hasOwnProperty('endDate'))
		{
			var todaysDate = new Date();
			var currEndDate = new Date(Date.parse(currEvent.endDate + " " + currEvent.endTime));
			if (currEndDate < todaysDate) isPast = true;
		}

		if (isPast)
		{
			data.pastEvents.push(data.currTeam.events[i]);
		}
		else
		{
			data.presentEvents.push(data.currTeam.events[i]);
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

  	res.render('events', data);
};

exports.addEvent = function(req, res) { 
	console.log("Adding a new event");
	if (!req.session.userID) res.redirect('/');

	var userID = req.session.userID;
	var teamID = req.params.teamid;

	var newEvent = {
		"id": TEAMS.nextEventID,
		"title": req.query.title,
		"startDate": req.query.startDate,
		"startTime": req.query.startTime,
		"endDate": req.query.endDate,
		"endTime": req.query.endTime,
		"location": req.query.location,
		"description": req.query.description,
		"going": [] // TODO
	};

	TEAMS.nextEventID++;
	TEAMS[teamID].events.push(newEvent);

  	res.redirect("/teamlist/" + teamID + "/events");
};

exports.editEvent = function(req, res) { 
	console.log("Editing an event");
	if (!req.session.userID) res.redirect('/');
	
	var userID = req.session.userID;
	var teamID = req.params.teamid;

	var currTeam = TEAMS[teamID];
	var newEvent = {
		"id": req.query.id,
		"title": req.query.title,
		"startDate": req.query.startDate,
		"startTime": req.query.startTime,
		"endDate": req.query.endDate,
		"endTime": req.query.endTime,
		"location": req.query.location,
		"description": req.query.description,
		"going": [] // TODO
	};
	for (var i in currTeam.events)
	{
		if(req.query.id == currTeam.events[i].id)
		{
			currTeam.events[i] = newEvent;
		}
	}

  	res.redirect("/teamlist/" + teamID + "/events");	
};

exports.deleteEvent = function(req, res)
{
	if (!req.session.userID) res.redirect('/');
	
	var userID = req.session.userID;
	var teamID = req.params.teamid;
	var eventID = req.params.eventid;
	var currTeam = TEAMS[teamID];

	for (var i in currTeam.events)
	{
		if (currTeam.events[i].id == eventID)
		{
			currTeam.events.splice(i, 1);
		}
	}

	res.redirect("/teamlist/" + teamID + "/events");
};