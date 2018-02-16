var data = require('../dummy_data/teams.json');

exports.addTeam = function(req, res) { 
	console.log("Adding a new team");

	var newTeam = {
	    "teamName": req.query.name,
	   	"members": [
	   				{
						"name": "John Smith",
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
	data.teams.push(newTeam);

  	res.render("teamlist", data);
};