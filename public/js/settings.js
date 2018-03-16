// JS for settings.handlebars

'use strict';

$(document).ready(function() {
	console.log("Currently on Settings Page.");

	// Hide forms by default, unless redirected
	$("#changeNameBody").hide();
	$("#changePassBody").hide();
	
	if ($("#nameError").length ||
		$("#nameSuccess").length ) $("#changeNameBody").show();

	if ($("#passError").length ||
		$("#currPassError").length ||
		$("#newPassError").length ||
		$("#passSuccess").length ) $("#changePassBody").show();

	// Toggle change name
	$("#changeNameButton").click(function() {
		$("#changePassBody").slideUp();
		$("#changeNameBody").slideToggle();
	});

	// Toggle change pass
	$("#changePassButton").click(function() {
		$("#changeNameBody").slideUp();
		$("#changePassBody").slideToggle();
	});
});