// JS for events.handlebars

'use strict';
var flag = true;

$(document).ready(function() {
	console.log("Currently on Calendar/Event List Page.");

	// Toggle add event
	$("#addEventForm").hide();
	$("#addButton").click(function() {
		$("#addEventForm").slideToggle();
	});
});