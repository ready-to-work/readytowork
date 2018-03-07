// JS for teamB.handlebars

'use strict';
var flag = true;

$(document).ready(function() {
	console.log("Currently on Task List Page.");

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
	$("#events-tab").click(function() {
		ga("send", "event", 'teampage', 'clickEventsTab');
	});

	$("#tasks-tab").click(function() {
		ga("send", "event", 'teampage', 'clickTasksTab');
	});

	$("#members-tab").click(function() {
		ga("send", "event", 'teampage', 'clickMembersTab');
	});

	$("#inviteButton").click(function() {
		ga("send", "event", 'teampage', 'clickInvite');
	});

	$("#tasksButton").click(function() {
		ga("send", "event", 'teampage', 'clickTasks');
	});

	$("#eventsButton").click(function() {
		ga("send", "event", 'teampage', 'clickEvents');
	});

	$("#backIcon").click(function() {
		ga("send", "event", 'teampage', 'clickBack');
	});
});