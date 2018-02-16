
/*
 * GET teamlist page.
 */
var data = require('../dummy_data/teams.json');

exports.view = function(req, res){
  res.render('teamlist', data);
};