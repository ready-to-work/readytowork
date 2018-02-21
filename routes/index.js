/*
 * GET login page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json');
var data = {};

exports.view = function(req, res)
{
	data.loginIncorrect = false;
	res.render('index', data);
};

exports.login = function(req, res)
{
	var username = req.query.username;
	var password = req.query.password;

	var userID = -1;

	for (var key in LOGINS)
	{
		if (key === username)
		{
			if (LOGINS[key].password === password)
			{
				userID = LOGINS[key].userID;
				break;
			}
		}
	}

	// Match not found
	if (userID === -1)
	{
		data.loginIncorrect = true;
		res.render('index', data);
		data.loginIncorrect = false;
	}
	// Match found
	else
	{
		res.redirect('/' + userID + '/home');
	}
};