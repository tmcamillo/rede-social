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
    console.log(nameInput);
    console.log(nameInput.value);
    console.log(lastNameInput);
    database.ref("users/" + uid).set({
        name: nameInput.value,
        surname: lastNameInput.value,
        phone: phoneInput.value,
        email: email,
        pass: password
    });
}

$(document).ready(function(){

    database.ref("/post/" + USER_ID).once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let childkey = childSnapshot.key;
            let childData = childSnapshot.val();
            $(".post-list").append(`<li>${childData.label}<br>${childData.review}<br>${childData.alcohoolPer}%</li>`);
            
        })
    });

    $(".add-post").click(function(event) {
        event.preventDefault();
        let newBrand = $("#label").val();
        let brandUpperCase = newBrand.toUpperCase();
        let newPost =  $("#comment").val();
        let alcohoolPer = $("#alcohol").val();

        database.ref("/post/" + USER_ID).push({
            label: brandUpperCase,
            review: newPost,
            alcohoolPer: alcohoolPer
        });
        
        $(".post-list").append(`<li>${brandUpperCase}<br>${newPost}<br>${alcohoolPer}%</li>`);
    });
});

// $(document).ready(function () {

//     database.ref("/post/" + USER_ID).once("value")
//         .then(function (snapshot) {
//             snapshot.forEach(function (childSnapshot) {
//                 let childkey = childSnapshot.key;
//                 let childData = childSnapshot.val();
//                 $("#post-list").append(`
// 				<li>
// 					<div class="container-fluid col-md-6 bg-light rounded p-4 my-3">
// 						<div class="d-flex">
// 							<!-- <img src=""> -->
// 							<a class="d-inline-flex mr-auto mb-3">
// 								<i class="fas fa-user-circle fa-2x purple align-self-center"></i>
// 								<div class="ml-2">
// 									<span class="purple">
// 										<strong class="f-14">Nome</strong>
// 										<br>
// 										<span class="small">${childData.time}</span>
// 									</span>
// 								</div>
// 							</a>
// 							<i class="edit far fa-edit bluish f-14 mx-1"></i>
// 							<i class="delete far fa-trash-alt bluish f-14 mx-1"></i>
// 						</div>
// 						<div class="comment">
// 							<h5>${childData.label}</h5>
// 							<p>${childData.review}</p>
// 						</div>
// 						<div class="d-flex purple">
// 							<div class="mr-auto">nota estrelas</div>
// 							<span><strong>${childData.alcohoolPer}%</strong> icone</span>
// 						</div>
// 					</div>
// 				</li>
//             `);

//             })
//         });

//     $(".add-post").click(function(event) {

//         event.preventDefault();
//         let newBrand = $("#label").val();
//         let brandUpperCase = newBrand.toUpperCase();
//         let newPost = $("#comment").val();
//         let alcohoolPer = $("#alcohol").val();
//         let postTime = time();

//         database.ref("/post/" + USER_ID).push({

//             label: brandUpperCase,
//             review: newPost,
//             alcohoolPer: alcohoolPer,
//             postTime: postTime
//         });

//         $("#post-list").append(`
//         <li>
//             <div class="container-fluid col-md-6 bg-light rounded p-4 my-3">
//                 <div class="d-flex">
//                     <!-- <img src=""> -->
//                     <a class="d-inline-flex mr-auto mb-3">
//                         <i class="fas fa-user-circle fa-2x purple align-self-center"></i>
//                         <div class="ml-2">
//                             <span class="purple">
//                                 <strong class="f-14">Nome</strong>
//                                 <br>
//                                 <span class="small">${childData.time}</span>
//                             </span>
//                         </div>
//                     </a>
//                     <i class="edit far fa-edit bluish f-14 mx-1"></i>
//                     <i class="delete far fa-trash-alt bluish f-14 mx-1"></i>
//                 </div>
//                 <div class="comment">
//                     <h5>${childData.label}</h5>
//                     <p>${childData.review}</p>
//                 </div>
//                 <div class="d-flex purple">
//                     <div class="mr-auto">nota estrelas</div>
//                     <span><strong>${childData.alcohoolPer}%</strong> icone</span>
//                 </div>
//             </div>
//         </li>
//     `);
//     });


//     $('#stars li').on('click', functionDasEstrelas);
// })

// function time() {
//     let today = new Date();
//     let hour = today.getHours();
//     let min = today.getMinutes();
//     let day = today.getDay();
//     let month = today.getMonth();
//     let year = today.getFullYear();
//     let timeNow = leftZeros(hour) + ":" + leftZeros(min) + " - " + leftZeros(day) + "/" + leftZeros(month) + "/" + year;
//     return timeNow;
// }

// function leftZeros(number) {
// 	if (number < 10) {
// 		newNumber = '0' + number
// 		return newNumber
// 	} else {
// 		return number
// 	}
// }

// function writeUserData(userId, imageUrl, name, lastName, email, phone, password) {
//     database.ref('users/' + userId).set({
//         profile_picture: imageUrl,
//         username: name,
//         userLastName: lastName,
//         email: email,
//         phone: phone,
//         pass: password
//     });
// }

