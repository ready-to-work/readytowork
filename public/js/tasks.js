// JS for tasks.js

'use strict';
var flag = true;

$(document).ready(function() {
	console.log("Currently on Task List Page.");

	// Toggle add task
	$("#addTaskForm").hide();
	$("#addButton").click(function() {
		$("#addTaskForm").slideToggle();
	});
});

/*
$('.datepicker').datepicker({
	uiLibrary: 'bootstrap4'
});

$('.timepicker').timepicker({
	uiLibrary: 'bootstrap4'
});*/

$('.datepicker').datepicker();

$('.timepicker').timepicker({
	modal: false,
	footer: false,
	header: false
});

