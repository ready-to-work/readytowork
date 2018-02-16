// JS for index.handlebars

'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Currently on Home Page.");
});

function userLoginAuth(form)
{
	if(form.userid.value == "tester" && form.pass.value == "123")
	{
		window.location.href = "/home";
		document.hide(document.getElementById("error"));
	}
	else
	{
		document.getElementById("error").innerHTML = "incorrect login, try again";
	}
}