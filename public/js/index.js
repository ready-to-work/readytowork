// JS for index.handlebars

'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Currently on Home Page.");
});

function userLoginAuth(form)
{
	if(form.userid.value == "BestTA" && form.pass.value == "BestStudent")
	{
		window.location.href = "/home";
		document.hide(document.getElementById("error"));
	}
	else
	{
		console.log("YREEEEe");
		document.getElementById("error").innerHTML = "Incorrect Username or Password.";
	}
}