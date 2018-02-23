// JS for team.js

'use strict';
var flag = true;

$(document).ready(function() {
	console.log("Currently on Task List Page.");

	// Swap between tabs
	$("#addTaskForm").hide();
	$("#addButton").click(function() {
		$("#addTaskForm").slideToggle();
	});
});