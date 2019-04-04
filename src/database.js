const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
// console.log("w" + USER_ID);

const photoFile = document.getElementById("photoFile");
const nameInput = document.getElementById("nameInput");
const lastNameInput = document.getElementById("lastNameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const passwordInput = document.getElementById("passwordInput");

function writeUserData(email, password, uid) {
    database.ref("users/" + uid).set({
        name: nameInput.value,
        surname: lastNameInput.value,
        phone: phoneInput.value,
        email: email,
        pass: password
    });     
}

<<<<<<< HEAD
function time() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let day = today.getDay();
    let month = today.getMonth();
    let year = today.getFullYear();
    let timeNow = leftZeros(hour) + ":" + leftZeros(min) + " - " + leftZeros(day) + "/" + leftZeros(month) + "/" + year;
    return timeNow;
};

function leftZeros(number) {
    if (number < 10) {
        newNumber = '0' + number
        return newNumber
    } else {
        return number
    }
};

$(document).ready(function () {

    database.ref("/post/" + USER_ID).once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childkey = childSnapshot.key;
                let childData = childSnapshot.val();
                $(".post-list").append(`
=======
$(document).ready(function(){
    loadReview()

function loadReview(){
    database.ref("/post/" + USER_ID).once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let childkey = childSnapshot.key;
            let childData = childSnapshot.val();
            $(".post-list").append(
                `
>>>>>>> 22b6d53f0d505364049c5f43e37450c40dd03470
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
							<i class="delete far fa-trash-alt bluish f-14 mx-1"></i>
						</div>
						<div id="comment-review"">
							<h5>${childData.label}</h5>
							<p>${childData.review}</p>
						</div>
						<div class="d-flex purple">
							<div class="mr-auto">nota estrelas</div>
							<span><strong>${childData.alcohoolPer}%</strong> icone</span>
						</div>
					</div>
				</li>
<<<<<<< HEAD
            `);

            })
        });
=======
            `
            );
            
        })
    });
}
>>>>>>> 22b6d53f0d505364049c5f43e37450c40dd03470


    $(".add-post").click(function(event) {
        event.preventDefault();

        let newBrand = $("#label").val();
        let brandUpperCase = newBrand.toUpperCase();
        let newPost =  $("#comment").val();
        let alcohoolPer = $("#alcohol").val();
        let postTime = time();

        database.ref("/post/" + USER_ID).push({
            label: brandUpperCase,
            review: newPost,
            alcohoolPer: alcohoolPer,
            postTime: postTime
        });

<<<<<<< HEAD
        $(".post-list").append(`<li>
        <div class="container-fluid col-md-6 bg-light rounded p-3">
        ${brandUpperCase}
        ${newPost}
        ${alcohoolPer}%</div></li>`);
    });

    $('#stars li').on('click', functionDasEstrelas);
});

=======
        $(".post-list").append(
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
										<span class="small">${postTime}</span>
									</span>
								</div>
							</a>
							<i class="edit far fa-edit bluish f-14 mx-1"></i>
							<i class="delete far fa-trash-alt bluish f-14 mx-1"></i>
						</div>
						<div id="comment-review">
							<h5>${brandUpperCase}</h5>
							<p>${newPost}</p>
						</div>
						<div class="d-flex purple">
							<div class="mr-auto">nota estrelas</div>
							<span><strong>${alcohoolPer}%</strong> icone</span>
						</div>
					</div>
				</li>
            `
        );
    });
    $('#stars li').on('click', functionDasEstrelas);
});

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
>>>>>>> 22b6d53f0d505364049c5f43e37450c40dd03470
