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