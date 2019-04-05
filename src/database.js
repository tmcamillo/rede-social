const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
// console.log("w" + USER_ID);

// const photoFile = document.getElementById("photoFile");
// const nameInput = document.getElementById("nameInput");
// const lastNameInput = document.getElementById("lastNameInput");
// const emailInput = document.getElementById("emailInput");
// const phoneInput = document.getElementById("phoneInput");
// const passwordInput = document.getElementById("passwordInput");

function writeUserData(email, password, uid) {
	database.ref("users/" + uid).set({
		name: nameInput.value,
		surname: lastNameInput.value,
		phone: phoneInput.value,
		email: email,
		pass: password
	});
}

$(document).ready(function () {

	ratingStar()
	gettingDrinks()

	database.ref("/post/" + USER_ID).once("value")
		.then(function (snapshot) {
			snapshot.forEach(function (childSnapshot) {
				let childkey = childSnapshot.key;
				let childData = childSnapshot.val();
				$("#post-list").append(`
				<li>
					<div class="container-fluid col-md-6 bg-light rounded p-4 my-3">
						<div class="d-flex">
							<!-- <img src=""> -->
							<a class="d-inline-flex mr-auto mb-3">
								<i class="fas fa-user-circle fa-2x purple align-self-center"></i>
								<div class="ml-2">
									<span class="purple">
										<strong class="f-14">Nome</strong>
										<br>
										<span class="small">${childData.postTime}</span>
									</span>
								</div>
							</a>
							<i class="edit far fa-edit bluish f-14 mx-1"></i>
							<i class="delete far fa-trash-alt bluish f-14 mx-1" data-post-id=${childkey}></i>
						</div>
						<div id="comment-review"">
							<h5>${childData.drinkIcon} ${childData.drinkType} ${childData.label}</h5>
							<p>${childData.review}</p>
						</div>
						<div class="d-flex purple">
							<div class="mr-auto">${childData.starScore}</div>
							<span><strong>${childData.alcohoolPer}%</strong>${childData.drinkIcon}</span>
						</div>
					</div>
				</li>
            `);

			})
		});


	$("#add-post").click(function (event) {
		event.preventDefault();
		let drink = parseInt($('#listDrinks li.selected').last().data('value'), 10);
		let iDrink = iconDrink(drink);
		let newBrand = $("#label").val();
		let brandUpperCase = newBrand.toUpperCase();
		let newPost = $("#comment").val();
		let alcohoolPer = $("#alcohol").val();
		let date = time();
		let ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);

		database.ref("/post/" + USER_ID).push({
			drinkType: drink,
			drinkIcon: iDrink,
			label: brandUpperCase,
			review: newPost,
			alcohoolPer: alcohoolPer,
			postTime: date,
			starScore: ratingValue,
		});

		$("#post-list").append(
			`
			<li>
				<div class="container-fluid col-md-6 bg-light rounded p-4 my-3">
					<div class="d-flex">
						<!-- <img src=""> -->
						<a class="d-inline-flex mr-auto mb-3">
							<i class="fas fa-user-circle fa-2x purple align-self-center"></i>
							<div class="ml-2">
								<span class="purple">
									<strong class="f-14">Nome</strong>
									<br>
									<span class="small">${date}</span>
								</span>
							</div>
						</a>
						<i class="edit far fa-edit bluish f-14 mx-1"></i>
						<i class="delete far fa-trash-alt bluish f-14 mx-1"></i>
					</div>
					<div id="comment-review">
						<h5>${iDrink} ${drink} ${brandUpperCase}</h5>
						<p>${newPost}</p>
					</div>
					<div class="d-flex purple">
						<div class="mr-auto">${ratingValue}</div>
						<span><strong>${alcohoolPer}% </strong>${iDrink}</span>
					</div>
				</div>
			</li>
		`
		);

	})
})

function time() {
	let today = new Date();
	let hour = today.getHours();
	let min = today.getMinutes();
	let day = today.getDay();
	let month = today.getMonth();
	let year = today.getFullYear();
	let timeNow = leftZeros(hour) + ":" + leftZeros(min) + " - " + leftZeros(day) + "/" + leftZeros(month) + "/" + year;

	return timeNow;
}

function leftZeros(number) {
	if (number < 10) {
		newNumber = '0' + number
		return newNumber
	} else {
		return number
	}
}


