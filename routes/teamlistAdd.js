var logins = require('../dummy_data/logins.json');
var users = require('../dummy_data/users.json');
var teams = require('../dummy_data/teams.json');
var calendars = require('../dummy_data/calendars.json');
var data = {
	"logins": logins,
	"users": users,
	"teams": teams,
	"calendars": calendars
}

exports.addTeam = function(req, res) { 
	console.log("Adding a new team");

	var newTeam = {
	    "teamName": req.query.name,
	   	"members": [
	   				{
						"name": "tester", //this will have to be user id later on!
						"id": 1,
						"role": "admin"
					}
				],
	   	"nextID": 0,
	   	"calendar": 0,
	   	"tasks": [
				{
					"title": req.query.task,
					"priority": req.query.priority,
					"description": req.query.description,
					"assigned": [req.query.assigned]
				}
			]
	  };
	 console.log(newTeam);
	data.teams.teamlist.push(newTeam);

  	res.render("teamlist", data);
};