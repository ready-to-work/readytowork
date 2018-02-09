// Universal JS, include as script in each HTML file.

'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	autoCollapseNav();
});

/*
 * Function that collapses the navbar menu if clicked outside
 */
function autoCollapseNav() {
	$(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggler")) {
            $(".navbar-toggler").click();
        }
    });
};