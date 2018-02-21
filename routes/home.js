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

	for (var i in data.currUser.teams)
	{
		var currTeam = TEAMS[data.currUser.teams[i]];
		for (var j in currTeam.events)
		{
			var currEvent = currTeam.events[j];
			currEvent.teamName = currTeam.teamName;
			data.currEvents.push(currEvent);
		}
	}

  	res.render('home', data);
};