// JS for teamB.handlebars

'use strict';
var flag = true;

$(document).ready(function() {
	console.log("Currently on Team Page.");

	// Toggle invite user menu
	$("#inviteUserForm").hide();
	if ($("#emptyInvite").length ||
		$("#invalidInvite").length ||
		$("#inviteSuccess").length )
	{
		$("#members-tab").trigger('click');
		$("#inviteUserForm").show();
	}
	$("#inviteButton").click(function() {
		$("#inviteUserForm").slideToggle();
	});

	// Toggle leave menu
	$("#leaveBody").hide();
	$("#leaveConfirmBody").hide();
	$("#leaveButton").click(function() {
		$("#leaveBody").slideToggle();
		$("#leaveConfirmBody").slideUp();
	});
	$("#leaveConfirmButton").click(function() {
		$("#leaveConfirmBody").slideToggle();
	});
});