const database = firebase.database();
// const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
const photoFile = document.getElementById('photoFile');
const nameInput = document.getElementById('nameInput');
const lastNameInput = document.getElementById("lastNameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById('phoneInput');
const passwordInput = document.getElementById('passwordInput');

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

function writeUserData(userId, imageUrl, name, lastName, email, phone, password) {
    database.ref('users/' + userId).set({
        profile_picture: imageUrl,
        username: name,
        userLastName: lastName,
        email: email,
        phone: phone,
        pass: password
    });
}

$(document).ready(function () {

    database.ref("/post/").once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                let childkey = childSnapshot.key;
                let childData = childSnapshot.val();
                $(".post-list").append(`
                
            <li>

           
            
            
            
            </li>
            `);

            })
        });



    $(".add-post").click(function (event) {
        event.preventDefault();
        let newBrand = $("#label").val();
        let brandUpperCase = newBrand.toUpperCase();
        let newPost = $("#comment").val();
        let alcohoolPer = $("#alcohol").val();
        let postTime = time();

        database.ref("post/").push({
            label: brandUpperCase,
            review: newPost,
            alcohoolPer: alcohoolPer,
            postTime: postTime
        });

        $(".post-list").append(`
        <li>
        <div class="container-fluid col-md-6 bg-light rounded p-3">
        ${brandUpperCase}
        ${newPost}
        ${alcohoolPer}%
        </div>
        </li>
        `);
    });
});