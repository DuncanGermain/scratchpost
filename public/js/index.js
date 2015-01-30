$(document).ready(function() {
	var logins = 0; //Number of users who have entered the session
	var present = 0;  //Number of screens displayed on session leader's page
	var ref = new Firebase('https://resplendent-fire-4150.firebaseio.com');
	var usersRef = ref.child('users');
	var questRef = ref.child('questions');
	var checkRef = ref.child('checkboxes');
	var hasBeenAsked,
			resort;

	$('.sortable').sortable({
		cancel: ".answer"
	});

	//Creates Firebase objects for the various user checkboxes
	checkRef.set({
		noName: {
			name: "noName",
			value: "false"
		},
		noLate: {
			name: "noLate",
			value: "false",
		},
		noRedo: {
			name: "noRedo",
			value: "false"
		},
		reshuffle: {
			name: "reshuffle",
			value: "false"
		},
		holdNew: {
			name: "holdNew",
			value: "false"
		},
		lineView: {
			name: "lineView",
			value: "false"
		}
	});

	//Listens for a click on the "empty" button, and clears the Firebase.
	$('#nuke').on('click', function() {
		usersRef.set({});
		questRef.set({});
	});  //end of nuclear option

	//Listens for changes to the state of those checkboxes, and pushes that change up to Firebase so other elements can access/depend on them.
	$('.checkboxes').on('click', '.checkbox', function() {
	//when a checkbox is clicked
		var boxName = $(this).attr('id'); //identify which box it was
		var updateMe = checkRef.child(boxName); //then find it in Firebase
		if ($('#' + boxName).is(':checked')) {
		//and if it was getting checked (as opposed to getting unchecked)
			updateMe.update({
				"value": "true" //set the value in Firebase to "true"
			});
		}
		else {
			updateMe.update({
				"value": "false" //otherwise, set the value in Firebase to "false"
			});
		}
	});  //end of general checkbox listener
	//Listens for changes to noName particularly
	$('#noName').on('click', function() {
		if ($('#noName').is(':checked')) {
			$('.byline').hide();
		}
		else {
			$('.byline').show();
		}
	});  //end of noName listener
	$('#holdNew').on('click', function() {
		$('.answer').toggle();
	});  //end of holdNew listener


//-----------------------------MAIN FUNCTIONALITY-------------------------------

	//Listens for a new user, and creates an answer field on the main screen for that user's data to live in.
	//EVENT FLOW: 03 (prev in part.js, next in index.js)
	usersRef.on('child_added', function(snapshot) {
		if (($('#noLate').is(':checked')) && hasBeenAsked) {
			return
		}
		else {
			logins += 1;
			present = logins;
	  	var newUser = snapshot.val();
	 		$('#scratchpost').append(
		 			'<div class="user-window bounceIn" id="' + snapshot.key() + '">\
	 					<p class="byline">' + newUser.name + '</p>\
		 				<button class="delete"></button>\
		 				<p class="answer" contenteditable="true">Login successful.</p>\
					</div>');
	 		resort = function(logins) {
		 		if (logins === 1) {
		 			$('.user-window').attr('class', 'user-window bounceIn one-window');
		 		}
		 		else if (logins === 2) {
		 			$('.user-window').attr('class', 'user-window bounceIn two-windows');
		 		}
		 		else if (logins === 3) {
		 			$('.user-window').attr('class', 'user-window bounceIn three-windows');
		 		}
		 		else if (logins === 4) {
		 			$('.user-window').attr('class', 'user-window bounceIn four-windows');
		 		}
		 		else if (logins === 5) {
		 			$('.user-window').attr('class', 'user-window bounceIn five-windows');
		 		}
		 		else if (logins === 6) {
		 			$('.user-window').attr('class', 'user-window bounceIn six-windows');
		 		}
		 		else if (logins === 7) {
		 			$('.user-window').attr('class', 'user-window bounceIn seven-to-nine-windows');
		 		}
		 		//strange bug where saying e.g. (7 <= logins <= 9) doesn't work.  Lines 121 - 135 are a bandaid.
		 		else if (logins === 8) {
		 			$('.user-window').attr('class', 'user-window bounceIn seven-to-nine-windows');
		 		}
		 		else if (logins === 9) {
		 			$('.user-window').attr('class', 'user-window bounceIn seven-to-nine-windows');
		 		}
		 		else if (logins === 10) {
		 			$('.user-window').attr('class', 'user-window bounceIn ten-to-twelve-windows');
		 		}
		 		else if (logins === 11) {
		 			$('.user-window').attr('class', 'user-window bounceIn ten-to-twelve-windows');
		 		}
		 		else if (logins === 12) {
		 			$('.user-window').attr('class', 'user-window bounceIn ten-to-twelve-windows');
		 		}
		 		else if (13 <= logins) {
		 			$('.user-window').attr('class', 'user-window bounceIn thirteen-and-up-windows');
		 		}
		 	}
		 	resort(logins);
	 		$('.counter').text('Active participants:  ' + logins);
	 	}
	});  //end of main add-user function
	//Listens for users dropping from the session, and removes their answer fields from the main screen.
	usersRef.on('child_removed', function(snapshot) {
		logins -= 1;
		present = logins;
		resort(logins);
		var userGone = snapshot.val();
		$('#scratchpost').find('#' + snapshot.key()).remove();
		$('.counter').text('Active participants:  ' + logins);
	}); //end of EVENT FLOW 03

	//Listens for the session leader to push a question, and puts that question and a response field/submit button on each user's page.
	//EVENT FLOW: 04 (prev in index.js, next in part.js)
	$('.control-bar').on('click', '#ask', function() {
		hasBeenAsked = true;
		var myQuestion = $(this).prev().val(); //(this).prev is the question box.
		var newQuestRef = questRef.push({
			content: myQuestion
		})
		$('#currentq').text(myQuestion);
		$('.answer').text('');
		$('.user-window').show();
		$('.user-window').removeClass('bounceIn');
		if ($('#reshuffle').is(':checked')) {
			var count = logins;
			var chosen;
			while (count) {
				chosen = Math.floor(Math.random() * count);
				$('#scratchpost').append($('#scratchpost div:nth-child(' + chosen + ')'));
				count -= 1;
			}
		}
	}); //end of EVENT FLOW 04

	//Listens for user submissions in response to questions, and updates the content of their answer field.
	//EVENT FLOW: 07 (prev in part.js, next in index.js)
	usersRef.on('child_changed', function(snapshot) {
		var changedValue = snapshot.val();
		var userAnswering = snapshot.key();
		var newAnswer = changedValue.data;
		$('#scratchpost').find('#' + userAnswering).find('.answer').text(newAnswer);
	});  //end of EVENT FLOW 07

	//Listens for the session leader's interactions with the user's answer field, and allows movement, deletion, and (someday) editing.
	$('#scratchpost').on('click', '.delete', function() {
		$(this).parent().hide();
		present -= 1;
		resort(present);
	});
}); //end of document ready function