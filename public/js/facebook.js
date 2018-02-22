function checkLoginState()
{
	FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	}, {scope: 'email'});
}

function statusChangeCallback(response)
{
	if(response.status === "connected")
	{
		console.log("Successfully logged in with Facebook");
		//FB.api('/me?fields=name,first_name,picture.width(480)', changeUser);
		FB.api('/me?fields=first_name,last_name,email', makeTeam);
		
	}
}

function makeTeam(response)
{
	var first_name = response.first_name;
	var last_name = response.last_name;
	var email = response.email;

	location.href = "/signupcomplete?email=" + email + "&password=fblogins&confirmPassword=fblogins&firstName=" + first_name + "&lastName=" + last_name + "";
}

