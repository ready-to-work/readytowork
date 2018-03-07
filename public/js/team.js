// JS for team.handlebars

'use strict';
var flag = true;

$(document).ready(function() {
	console.log("Currently on Team Page.");

	// Toggle invite user menu
	$("#inviteUserForm").hide();
	$("#inviteButton").click(function() {
		$("#inviteUserForm").slideToggle();
	});

	// GA, Scroll
	$(window).scroll(function() {
		ga("send", "event", 'teampage', 'scroll');
	});

	// GA, Clicks
	$("#inviteButton").click(function() {
		ga("send", "event", 'teampage', 'clickInvite');
	});

	$("#task-box").click(function() {
		ga("send", "event", 'teampage', 'clickTasks');
	});

	$("#event-box").click(function() {
		ga("send", "event", 'teampage', 'clickEvents');
	});

	$("#backIcon").click(function() {
		ga("send", "event", 'teampage', 'clickBack');
	});
});