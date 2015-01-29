$(document).ready(function() {


var logins = 0;
var userID = "";
var userContent = "";


var userClasses = ["one-window", "two-windows", "three-windows", "four-windows", "five-windows",
									 "six-windows", "seven-to-nine-windows", "ten-to-twelve-windows",
									 "thirteen-to-fifteen-windows"];

	usersRef.on('child_changed', function() {
			if (logins >= 0 && logins <= 5) {
				$(".user-window")
					.removeClass(userClasses[logins-2])
					.addClass(userClasses[logins-1]);
			}
			else if (logins >= 6 && logins <= 8){
				$(".user-window")
					.removeClass(userClasses[logins-2])
					.addClass(userClasses[6]);
			}

			else if (logins >= 9 && logins <= 11){
				$(".user-window")
					.removeClass(userClasses[logins-2])
					.addClass(userClasses[7]);
			}

			else if (logins >=12 && logins <=14) {
				$(".user-window")
					.removeClass(userClasses[logins-2])
					.addClass(userClasses[8]);
			}

		});
});
