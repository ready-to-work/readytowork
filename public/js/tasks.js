// JS for tasks.js

'use strict';
var flag = true;

$(document).ready(function() {
	console.log("Currently on Team List Page.");
});

$("#addButton").click(addClick);
function addClick(e){
	if(flag == true)
	{
		$(".hidden").show();
		flag = false;
	}
	else if(flag == false)
	{
		$(".hidden").hide();
		flag = true;
	}
}