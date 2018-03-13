/*.
 * GET a team page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json');
var data = {};

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

	res.render('team', data);
};

exports.invite = function(req, res){
	var userID = req.session.userID;
	var teamID = req.params.teamid;
	var inviteEmail = req.query.email;
	var inviteID;
	var alreadyInvited = false;
	var prevRejected = false;

	// Find user ID of the email
	if(LOGINS.hasOwnProperty(inviteEmail)) inviteID = LOGINS[inviteEmail].userID;

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

	res.redirect("/teamlist/" + teamID + "/");
};