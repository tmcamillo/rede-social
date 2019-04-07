const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

function loadPosts(){
	database.ref("/post/" + USER_ID).once("value")
	.then(function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			let childkey = childSnapshot.key;
			let childData = childSnapshot.val();

			appendData(childData, childkey)
		})

	});
}
function writeUserData(email, password, uid) {

	database.ref("users/" + uid).set({
		name: nameInput.value,
		surname: lastNameInput.value,
		phone: phoneInput.value,
		email: email,
		pass: password
	});
}

function time() {
	let today = new Date();
	let hour = today.getHours();
	let min = today.getMinutes();
	let day = today.getUTCDate();
	let month = today.getUTCMonth();
	let year = today.getUTCFullYear();
	let timeNow = leftZeros(day) + "/" + leftZeros(month) + "/" + year + " - " + leftZeros(hour) + ":" + leftZeros(min);

	return timeNow;
}

function leftZeros(number) {
	if (number < 10) {
		newNumber = '0' + number;
		return newNumber
	} else {
		return number
	}
}

function appendData(childData, childKey) {
	$(".post-list").append(
		`
		<li>
		<div class="container-fluid col-md-6 bg-light rounded p-4 mb-3">
			<div class="d-flex">
				<!-- <img src=""> -->
				<a class="d-inline-flex mr-auto mb-3">
					<i class="fas fa-user-circle fa-2x purple align-self-center"></i>
					<div class="ml-2">
						<span class="purple">
							<strong class="f-14">Nome</strong>
							<br>
							<span class="small">${childData.postTime} - ${childData.privacy}</span>
						</span>
					</div>
				</a>
				<i class="edit far fa-edit bluish f-14 mx-1"></i>
				<i class="delete far fa-trash-alt bluish f-14 mx-1" data-id="${childKey}" data-toggle="modal"
					data-target="#modal-del"></i>

			</div>
			<div id="comment-review"">
				<h5><i class="DRINK" data-toggle="tooltip" data-placement="top"></i> ${childData.label}</h5>
				<p>${childData.review}</p>
			</div>
			<div class="d-flex purple">
				<div class="mr-auto">${childData.starScore}</div>
				<span><strong>${childData.alcohoolPer}%</strong><i class="DRINK" data-toggle="tooltip"
						data-placement="top"></i></span>
			</div>
		</div>
	</li>
	`);
}

$(document).ready(function () {
	loadPosts()
	ratingStar()
	// gettingDrinks()

	// database.ref("/post/" + USER_ID).once("value")
	// .then(function (snapshot) {
	// 	snapshot.forEach(function (childSnapshot) {
	// 		let childkey = childSnapshot.key;
	// 		let childData = childSnapshot.val();

	// 		appendData(childData, childkey)
	// 	})

	// });

});
$("#news-feed").click(function () {
	$('#post-list').html("");
	loadPosts()
})

$("#private-post").click(function () {
	$('#post-list').html("");
	database.ref("/post/" + USER_ID).orderByChild("privacy").equalTo('privado').once('value', function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			let childkey = childSnapshot.key;
			let childData = childSnapshot.val();
			appendData(childData, childkey)
		});
	});
})

$(".add-post").click(function (event) {
	event.preventDefault();
	// let drink = parseInt($('#listDrinks li.selected').last().data('value'), 10);
	// let iDrink = iconDrink(drink);
	// let ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);

	let data = {
		// drinkIcon: iconDrink(parseInt($('#listDrinks li.selected').last().data('value'), 10)),
		label: $("#label").val().toUpperCase(),
		review: $("#comment").val(),
		alcohoolPer: $("#alcohol").val(),
		postTime: time(),
		starScore: parseInt($('#stars li.selected').last().data('value'), 10),
		privacy: $("#selPrivacy option:selected").val(),
	};

	let postFromDb = database.ref("/post/" + USER_ID).push(data);

	appendData(data, postFromDb.key)
	$('#container-comment')[0].reset();
});

let selected_key = ''

$(document).on('click', '.trash-ic', function () {
	selected_key = $(this).attr('data-post-id');
})

$("#btnDelete").click(function () {
	database.ref("post/" + USER_ID + "/" + selected_key).remove();
	$(`a[data-post-id=${selected_key}]`).closest("li").remove();
	$('#deleteModal').modal('hide');
});

