// JS for teamlist.handlebars

'use strict';

$(document).ready(function() {
	console.log("Currently on Team List Page.");

	// Toggle add team
	$("#addTeamForm").hide();
	$("#addButton").click(function() {
		$("#addTeamForm").slideToggle();
	});
});
