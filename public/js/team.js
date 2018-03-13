// JS for teamB.handlebars

'use strict';
var flag = true;

$(document).ready(function() {
	console.log("Currently on Team Page.");

	// Toggle invite user menu
	$("#inviteUserForm").hide();
	$("#inviteButton").click(function() {
		$("#inviteUserForm").slideToggle();
	});
});