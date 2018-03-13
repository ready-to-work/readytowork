/*
 * GET profile page.
 */

var LOGINS = require('../dummy_data/logins.json');
var USERS = require('../dummy_data/users.json');
var TEAMS = require('../dummy_data/teams.json')
var data = {};

exports.view = function(req, res){
	if (!req.session.userID) res.redirect('/');
	
	res.render('profile', data);
};