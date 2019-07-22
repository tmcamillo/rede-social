$(document).ready(() => {
	const database = firebase.database();
	$('[data-toggle="tooltip"]').tooltip()

	$('#sign-in-btn').click((event) => {
		event.preventDefault();

		let email = $('#email-input').val();
		let password = $('#password-input').val();

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((response) => {
				window.location = 'feed.html?id=' + response.user.uid;
			})

			.catch((error) => {
				let errorCode = error.code;
				let errorMessage = error.message;
				alert('Ocorreu um erro, tente novamente.');
			})
	});


	$('#sign-up-btn').click((event) => {
		event.preventDefault();

		let email = $('#emailInput').val();
		let password = $('#passwordInput').val();

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((response) => {
				writeUserData(email, password, response.user.uid);
			})
			.catch((error) => {
				let errorCode = error.code;
				let errorMessage = error.message;
				console.log(errorCode, errorMessage)
				alert('Ocorreu um erro, tente novamente.');
			})
	});


	$('#logout-btn').click(() => {
		firebase.auth().signOut().then(() => {
			window.location = 'index.html'
		}).catch(function (error) {
			alert('Ocorreu um erro, tente novamente.')
		});
	})

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			console.log(user.uid, "user is signed");
			return user.uid
		} else {
			console.log("No user is signed")
		}
	});

	let writeUserData = (email, password, uid) => {
		database.ref('users/' + uid).set({
			name: nameInput.value,
			surname: lastNameInput.value,
			phone: phoneInput.value,
			email: email,
			pass: password
		})
			.then(() => {
				window.location = 'feed.html?id=' + uid;
			})
	}
});