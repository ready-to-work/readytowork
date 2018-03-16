
/*
 * GET teamlist page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json');
var data = {};

data.teamFilled = true;
data.teamSuccess = false;

exports.view = function(req, res){
	if (!req.session.userID) res.redirect('/');
	var userID = req.session.userID;

	var currUser = USERS[userID];
	data.teamlist = [];

	for (var i in currUser.teams)
	{
		var currTeam = TEAMS[currUser.teams[i]];

		// Add on member names
		for (var j in currTeam.members)
		{
			if (currTeam.members[j].role == "admin") currTeam.members[j].isAdmin = true;
			currTeam.members[j].firstName = USERS[currTeam.members[j].userID].firstName;
			currTeam.members[j].lastName = USERS[currTeam.members[j].userID].lastName;
		}

		data.teamlist.push( currTeam );
	}
 	
 	res.render('teamlist', data);

 	data.teamFilled = true;
	data.teamSuccess = false;
};

exports.addTeam = function(req, res) { 
	console.log("Adding a new team");
	var userID = req.session.userID;

	if (!req.query.name || !req.query.description)
	{
		data.teamFilled = false;
		res.redirect("/teamlist");
	}
	else
	{
		var newTeam = {
			"teamName": req.query.name,
			"teamID": TEAMS.nextTeamID,
			"members": [
		   		{
					"userID": userID,
					"role": "admin"
				}
			],
			"events": [],
		   	"tasks": [],
		   	"description": req.query.description
		};

		USERS[userID].teams.push(newTeam.teamID);

		TEAMS[TEAMS.nextTeamID] = newTeam;
		TEAMS.nextTeamID++;
		
		data.teamSuccess = true;
		res.redirect("/teamlist");
	}
};