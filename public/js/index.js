// JS for index.handlebars

'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Currently on Login Page.");

	$("#signup-button").click(function() {
		location.href = "/signup";
	});

	$(".title").click(function() {
		location.href = "/";
	});
});