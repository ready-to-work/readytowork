/*.
 * GET a team page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json');
var data = {};

data.emptyInvite = false;
data.invalidInvite = false;
data.inviteSuccess = false;

exports.view = function(req, res){
	if (!req.session.userID) res.redirect('/');
	var userID = req.session.userID;

	// Check if they are actually a member of this team
	var isMember = false;
	for (var i in TEAMS[req.params.teamid].members)
	{
		if (TEAMS[req.params.teamid].members[i].userID == userID) isMember = true;
	}
	if (!isMember) res.redirect('/teamlist');

	data.currTeam = TEAMS[req.params.teamid];

	var currTeam = data.currTeam;
	data.currUser = USERS[userID];
	data.currEvents = [];
	data.currTasks = [];

	// Check for events
	for (var k in currTeam.events)
	{
		var currEvent = currTeam.events[k];
		currEvent.teamName = currTeam.teamName;
		currEvent.teamID = currTeam.teamID;
		//currEvent.past = false;

		// Check if event has ended
		if (currEvent.hasOwnProperty('startDate') && currEvent.hasOwnProperty('endDate'))
		{
			var todaysDate = new Date();
			var currEndDate = new Date(Date.parse(currEvent.endDate + " " + currEvent.endTime));
			//if (currEndDate < todaysDate) currEvent.past = true;
			if (currEndDate < todaysDate) continue;
		}

		data.currEvents.push(currEvent);
	}

	// Check for tasks
	for (var l in currTeam.tasks)
	{
		var currTask = currTeam.tasks[l];
		currTask.teamName = currTeam.teamName;
		currTask.teamID = currTeam.teamID;
		//currTask.complete = false;

		// Check if task is complete
		//if (currTask.completed) currTask.complete = true;
		if (currTask.completed) continue;

		data.currTasks.push(currTask);
	}

	// Add on member names
	data.currTeam.adminList = [];
	data.currTeam.memberList = [];
	for (var j in data.currTeam.members)
	{
		if (data.currTeam.members[j].role == "admin")
		{
			data.currTeam.adminList.push({
				"firstName": USERS[data.currTeam.members[j].userID].firstName,
				"lastName": USERS[data.currTeam.members[j].userID].lastName,
				"role": "admin"
			});
		}
		else if (data.currTeam.members[j].role == "member")
		{
			data.currTeam.memberList.push({
				"firstName": USERS[data.currTeam.members[j].userID].firstName,
				"lastName": USERS[data.currTeam.members[j].userID].lastName,
				"role": "member"
			});
		}
	}

	console.log(data.currTeam.adminList);
	console.log(data.currTeam.memberList);

	res.render('team', data);

	data.emptyInvite = false;
	data.invalidInvite = false;
	data.inviteSuccess = false;
};

exports.invite = function(req, res){
	if (!req.session.userID) res.redirect('/');
	
	var userID = req.session.userID;
	var teamID = req.params.teamid;
	var inviteEmail = req.query.email;
	var inviteID;
	var alreadyInvited = false;
	var prevRejected = false;

	if (!req.query.email)
	{
		data.emptyInvite = true;
		res.redirect("/teamlist/" + teamID + "/");
		return;
	}

	// Find user ID of the email
	if(LOGINS.hasOwnProperty(inviteEmail)) inviteID = LOGINS[inviteEmail].userID;
	else
	{
		data.invalidInvite = true;
		res.redirect("/teamlist/" + teamID + "/");
		return;
	}

	// Add member to the team
	if (inviteID)
	{
		for (var i in USERS[inviteID].teams)
		{
			if (USERS[inviteID].teams[i] == teamID)
			{
				alreadyInvited = true;
			}
		}

		for (var j in TEAMS[teamID].members)
		{
			if (TEAMS[teamID].members[j].userID == inviteID)
			{
				prevRejected = true;
			}
		}

		if (!prevRejected)
		{
			// Add to team's member list
			TEAMS[teamID].members.push({
				"userID": inviteID,
				"role": "invited"
			});
		}

		if (!alreadyInvited)
		{
			// Add to the user's teamlist
			USERS[inviteID].teams.push(teamID);
		}
	}

	data.inviteSuccess = true;
	res.redirect("/teamlist/" + teamID + "/");
};

exports.leave = function(req, res)
{
	if (!req.session.userID) res.redirect('/');
	var userID = req.session.userID;

	// Check if they are actually a member of this team
	var isMember = false;
	for (var i in TEAMS[req.params.teamid].members)
	{
		if (TEAMS[req.params.teamid].members[i].userID == userID) isMember = true;
	}
	if (!isMember) res.redirect('/teamlist');

	var currTeam = TEAMS[req.params.teamid];
	var currUser = USERS[userID];

	// Remove user from team
	for (var i = 0; i < currTeam.members.length; i++)
	{
		if (currTeam.members[i].userID == userID)
		{
			currTeam.members.splice(i, 1);
		}
	}

	// Remove team from user
	for (var i = 0; i < currUser.teams.length; i++)
	{
		if (currUser.teams[i] == req.params.teamid)
		{
			currUser.teams.splice(i, 1);
		}
	}

	res.redirect("/teamlist");
};