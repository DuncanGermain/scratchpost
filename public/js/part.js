$(document).ready(function() {
	var logins = 0; //number of users who have entered the session
	var ref = new Firebase('https://resplendent-fire-4150.firebaseio.com');
	var usersRef = ref.child('users');
	var questRef = ref.child('questions');
	var checkRef = ref.child('checkboxes');
	var myName,
			myID,
			question,
			currentQ,
			qID,
			hasBeenAsked,
			noRedo,
			noLate;

	//Notices when the noRedo and noLate buttons have been checked or unchecked by responding to the correlated Firebase update, and warns the participant.  Only those buttons, since only they are relevant to the functioning of the participant screen.
	checkRef.on('child_changed', function(snapshot) {
		var changedValue = snapshot.val();
		if ((changedValue.name === "noRedo") && (changedValue.value === "true")) {
			$('#playerscreen').append('<p class="sysmsg">Warning! You may only submit ONE answer.</p>');
			noRedo = changedValue.value;
		}
		else if ((changedValue.name === "noRedo") && (changedValue.value === "false")) {
			$('#playerscreen').find('.sysmsg').remove();
			noRedo = changedValue.value;
		}
		else if (changedValue.name === "noLate") {
			noLate = changedValue.value;
		}
	});


	//Begins the sign-in process by prompting the user to enter a name.
	//EVENT FLOW: 01 (start of chain, next in part.js)
	$('#join').on('click', function() {
		$('#playerscreen').empty();
		$(this).remove();
		if (noLate) {
			$('#playerscreen').append('<p class="sysmsg">Sorry; your session leader is not allowing late entries and re-entries.</p>');
		}
		else {
			$('#playerscreen').append(
				'<p>Please enter your name as you want it to appear at the end of your posts.</p>\
				<input class="name">\
				<button class="submitname buttons" autofocus="true">Submit</button>'
				);
		}
	}); //end of EVENT FLOW 01

	//Adds a user to the session when they enter their name.
	//EVENT FLOW: 02 (prev in part.js, next in index.js)
	$('#playerscreen').on('click', '.submitname', function() {
		myName = $('#playerscreen').find('.name').val();
		var newUserRef = usersRef.push({
			name: myName,
			data: 'New user!',
		});
		myID = newUserRef.key();
		//since submitname disappears, this sets myID permanently from a user's perspective.
		$('#playerscreen').attr('class', myID);
		var disconnectMe = usersRef.child(myID);
		disconnectMe.onDisconnect().remove();
		$('#usertitle').text(myName + "'s Scratchpad");
		$('#playerscreen').empty();
		if (hasBeenAsked) {	//this code allows a late or re-entering user to see the current question.
			$('#playerscreen').append(
				'<p class="control-bar"><strong>Prompt: </strong>' + question.content + '</p>\
				<textarea placeholder="Type your response here."></textarea>\
				<button class="submit">Submit your response</button>'
				);
			if (noRedo) {
				$('#playerscreen').append('<p class="sysmsg">Warning! You may only submit ONE answer.</p>');
			}
		}
		else {  //otherwise, if we're at the beginning of the session ...
		$('#playerscreen').append(
			'<p>Welcome, <strong>' + myName + '</strong>. Please wait for your session leader to submit a prompt.</p>'
			);
		}
	}); //end of EVENT FLOW 02

	//Publishes the most recent question and provides an answer field for the user.
	//EVENT FLOW: 05 (prev in index.js, next in part.js)
	questRef.on('child_added', function(snapshot) {
		hasBeenAsked = true;
		question = snapshot.val();
		currentQ = question.content;
		qID = snapshot.key();
		if (myID) {
			$('#playerscreen').empty();
			$('#playerscreen').append(
					'<p class="control-bar"><strong>Prompt: </strong>' + currentQ + '</p>\
					<textarea placeholder="Type your response here." class="answerbox"></textarea>\
					<button class="submit">Submit your response</button>\
					<p class="sysmsg">Awaiting answer.</p>'
				);
		}
	}); //end of EVENT FLOW 05

	//Pushes a user's answer to a question up to the Firebase.
	//EVENT FLOW: 06 (prev in part.js, next in index.js)
	$('#playerscreen').on('click', '.submit', function() {
		var myAnswer = $(this).prev().val(); //the text in the answer box.
		var updateMe = usersRef.child(myID); //prepare to update the Firebase object whose ID is identical to the user's ID
		updateMe.update({
			"data": myAnswer
		});
		$('.sysmsg').text('You have submitted an answer.');
		if (noRedo) {
			$('#playerscreen').empty();
			$('#playerscreen').append(
				'<p><strong>No resubmissions allowed.</strong></p>\
				<textarea class="answerbox"></textarea>\
				<p id="sysmsg">You have submitted an answer.</p>');
		}
		$('#playerhistory:empty').append(
			'<p class="control-bar"><strong>History </strong></p>\
			<div id="submitted" class="user-history"></div>');
		$('#submitted').append("<p>&#13" + myAnswer + "</p>" +
			'<p class="light-italic font-point-8">(submitted in response to ' + currentQ + ') </p>');
	}); //end of EVENT FLOW 06

//add session title to user header
	//$("#current-session-in-user-header").on("load", function() {
	//	$(this).text("Current Session: " + )
	//}

}); //end of document ready function





