/*
 * GET login page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json');
var data = {};

exports.error404 = function(req, res)
{
	data.error = "404";
	res.render('error', data);
};

exports.error500 = function(req, res)
{
	data.error = "500";
	res.render('error', data);
};