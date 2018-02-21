
/*
 * GET teamlist page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json');
var data = {};

exports.view = function(req, res){
	var userID = req.params.userid;
	data.userID = userID; // COPY PASTE FOR EVERY PAGE FOR NAVBAR

	var currUser = USERS[userID];
	data.teamlist = [];

	for (var i in currUser.teams)
	{
		var currTeam = TEAMS[currUser.teams[i]];

		// Add on member names
		for (var j in currTeam.members)
		{
			currTeam.members[j].firstName = USERS[currTeam.members[j].userID].firstName;
			currTeam.members[j].lastName = USERS[currTeam.members[j].userID].lastName;
		}

		data.teamlist.push( currTeam );
	}
 	
 	res.render('teamlist', data);
};

exports.addTeam = function(req, res) { 
	console.log("Adding a new team");
	var userID = req.params.userid;

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
  	res.redirect("/" + userID + "/teamlist");
};