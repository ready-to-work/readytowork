/*
 * GET login page.
 */

// Pass in login dummy data
var logins = require('../dummy_data/logins.json');

exports.view = function(req, res){
	res.render('index', logins);
};