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
	data.signup = false;
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

exports.signup = function(req, res)
{
	data.signup = true;
	data.usernameTaken = false;
	res.render('index', data);
};

exports.signupcomplete = function(req, res)
{
	var username = req.query.username;
	var password = req.query.password;
	var firstName = req.query.firstName;
	var lastName = req.query.lastName;

	var usernameIsTaken = false;
	if (LOGINS.hasOwnProperty(username)) usernameIsTaken = true;

	if (usernameIsTaken)
	{
		data.signup = true;
		data.usernameTaken = true;
		data.username = username;
		data.firstName = firstName;
		data.lastName = lastName;
		res.render('index', data);
	}
	else
	{
		var newLogin = {
			"password": password,
			"userID": USERS.nextUserID
		}

		LOGINS[username] = newLogin;

		var newUser = {
			"firstName": firstName,
			"lastName": lastName,
			"userID": USERS.nextUserID,
			"teams": [],
			"settings": {}
		}

		USERS[newUser.userID] = newUser;
		USERS.nextUserID++;

		res.redirect('/' + newUser.userID + '/home');
	}
};