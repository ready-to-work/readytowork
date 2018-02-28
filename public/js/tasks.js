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


/*
$('.datepicker').datepicker({
	uiLibrary: 'bootstrap4'
});

$('.timepicker').timepicker({
	uiLibrary: 'bootstrap4'
});*/

$('.datepicker').datepicker();

$('.timepicker').timepicker({
	modal: false
});

/*
$(".modal-footer button#submitChange").click(function(e){
	e.preventDefault();
	//console.log("its pressing changes");
	var newTitle = document.getElementById('taskTitle').value;
	var newPriority = document.getElementById('taskPriority').value;
	var newDueDate = document.getElementById('taskDueDate').value;
	var newDueTime = document.getElementById('taskDueTime').value;
	var newDescription = document.getElementById('taskDescription').value;
	var teamId = document.getElementById("currTeamId").value;
	var userId = document.getElementById("currUserId").value;
	var taskId = document.getElementById("taskid").value;
	console.log(newTitle);
	console.log(newPriority);
	console.log(newDueDate);
	console.log(newDueTime);
	console.log(newDescription);
	console.log(userId);
	console.log(teamId);
	console.log(taskId);
	//todo
	//either do it like FB or do it like AJAX
	var url = "/" + userId + "/teamlist/" + teamId + "/tasks/edit";
	url = url + "?id=" + taskId + "&userid=" + userId + "&teamid=" + teamId + "&title=" + newTitle+ "&priority=" + newPriority + "&dueDate=" + newDueDate + "&dueTime=" + newDueTime + "&description=" + newDescription + "";
	//console.log(url); 
	location.href = url;
	//$.post(url, { userid: userId, teamid: teamId, title: newTitle, priority: newPriority, dueDate: newDueDate, dueTime: newDueTime, description: newDescription});
});*/