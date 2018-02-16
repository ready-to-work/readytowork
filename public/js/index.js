// JS for index.handlebars

'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("Currently on Login Page.");
});

function userLoginAuth(form)
{
<<<<<<< HEAD
	if(form.userid.value == "John Smith" && form.pass.value == "admin")
=======
	if(form.userid.value == "tester" && form.pass.value == "123")
>>>>>>> afc2acdacc1926b281057c4aa6b540a08748ae67
	{
		window.location.href = "/home";
		document.hide(document.getElementById("error"));
	}
	else
	{
		document.getElementById("error").innerHTML = "incorrect login, try again";
	}
}