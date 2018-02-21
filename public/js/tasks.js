// JS for tasks.js

'use strict';
var flag = true;

$(document).ready(function() {
	console.log("Currently on Task List Page.");

	// Toggle add team
	$("#addTaskForm").hide();
	$("#addButton").click(function() {
		$("#addTaskForm").slideToggle();
	});
});