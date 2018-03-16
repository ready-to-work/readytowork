// JS for tasks.handlebars

'use strict';
var flag = true;

$(document).ready(function() {
	console.log("Currently on Task List Page.");

	// Toggle add task
	$("#addTaskForm").hide();
	$("#addButton").click(function() {
		$("#addTaskForm").slideToggle();
	});

	// Toggle completed tasks
	$("#completeBody").hide();
	$("#completeButton").click(function() {
		$("#completeBody").slideToggle();
	});
});