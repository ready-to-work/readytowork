/*
 * GET settings page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json')
var data = {};

data.nameFilled = true;
data.passFilled = true;
data.currPassMatch = true;
data.newPassMatch = true;
data.nameSuccess = false;
data.passSuccess = false;

exports.view = function(req, res)
{
	if (!req.session.userID) res.redirect('/');
	var userID = req.session.userID;
	var currUser = USERS[userID];

	data.firstName = currUser.firstName;
	data.lastName = currUser.lastName;

	res.render('settings', data);

	data.nameFilled = true;
	data.passFilled = true;
	data.currPassMatch = true;
	data.newPassMatch = true;
	data.nameSuccess = false;
	data.passSuccess = false;
};

exports.changeName = function(req, res)
{
	if (!req.session.userID) res.redirect('/');
	var userID = req.session.userID;
	var currUser = USERS[userID];

	if (!req.body.firstName || !req.body.lastName)
	{
		data.nameFilled = false;
		res.redirect('/settings');
	}
	else
	{
		currUser.firstName = req.body.firstName;
		currUser.lastName = req.body.lastName;

		data.nameSuccess = true;
		res.redirect('/settings');
	}
};

exports.changePassword = function(req, res)
{
	if (!req.session.userID) res.redirect('/');
	var userID = req.session.userID;
	var currUser = USERS[userID];

	if (!req.body.currPass || !req.body.newPass || !req.body.newPassConfirm)
	{
		data.passFilled = false;
		res.redirect('/settings');
	}
	else
	{
		var userLogin;
		for (var key in LOGINS)
		{
			if (LOGINS.hasOwnProperty(key)) {
				if (LOGINS[key].userID == userID)
				{
					userLogin = LOGINS[key];
				}
			}
		}
		if (req.body.currPass != userLogin.password)
		{
			data.currPassMatch = false;
			res.redirect('/settings');
		}
		else if (req.body.newPass != req.body.newPassConfirm)
		{
			data.newPassMatch = false;
			res.redirect('/settings');
		}
		else
		{
			for (var key in LOGINS)
			{
				if (LOGINS.hasOwnProperty(key)) {
					if (LOGINS[key].userID == userID)
					{
						LOGINS[key].password = req.body.newPass;
					}
				}
			}

			data.passSuccess = true;
			res.redirect('/settings');
		}
	}
};