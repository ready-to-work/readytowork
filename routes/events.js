/*
 * GET a events page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json')
var data = {};

exports.view = function(req, res){
	var userID = req.params.userid;
	data.userID = userID; // COPY PASTE FOR EVERY PAGE FOR NAVBAR

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
	console.log("Adding a new task");
	var userID = req.params.userid;
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

  	res.redirect("/" + userID + "/teamlist/" + teamID + "/events");
};

exports.editEvent = function(req, res) { 
	console.log("Editing a new task");
	
	var userid = req.params.userid;
	var teamid = req.params.teamid;

	var currTeam = TEAMS[teamid];
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

  	res.redirect("/" + userid + "/teamlist/" + teamid + "/events");
	
};