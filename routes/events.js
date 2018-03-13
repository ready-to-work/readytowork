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
		data.currTeam.events[i].goingNames = [];

		for (var j in data.currTeam.events[i].going)
		{
			data.currTeam.events[i].goingNames.push(
				USERS[data.currTeam.events[i].going[j]].firstName + " " +
				USERS[data.currTeam.events[i].going[j]].lastName);
		}
	}

  	res.render('events', data);
};

exports.addEvent = function(req, res) { 
	console.log("Adding a new event");

	var userID = req.session.userID;
	var teamID = req.params.teamid;

	//date value is: YYYY-MM-DD
	var newStartDate = req.query.startDate.substring(5,7) + "/" + req.query.startDate.substring(8) + "/" + req.query.startDate.substring(0,4);
	var newEndDate = req.query.endDate.substring(5,7) + "/" + req.query.endDate.substring(8) + "/" + req.query.endDate.substring(0,4);

	var newEvent = {
		"id": TEAMS.nextEventID,
		"title": req.query.title,
		"startDate": newStartDate,
		"startTime": req.query.startTime,
		"endDate": newEndDate,
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
	
	var userID = req.session.userID;
	var teamID = req.params.teamid;

	//date value is: YYYY-MM-DD
	var newStartDate = req.query.startDate.substring(5,7) + "/" + req.query.startDate.substring(8) + "/" + req.query.startDate.substring(0,4);
	var newEndDate = req.query.endDate.substring(5,7) + "/" + req.query.endDate.substring(8) + "/" + req.query.endDate.substring(0,4);

	var currTeam = TEAMS[teamID];
	var newEvent = {
		"id": req.query.id,
		"title": req.query.title,
		"startDate": newStartDate,
		"startTime": req.query.startTime,
		"endDate": newEndDate,
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