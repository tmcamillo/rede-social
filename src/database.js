const database = firebase.database();
// const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
const photoFile = document.getElementById('photoFile');
const nameInput = document.getElementById('nameInput');
const lastNameInput = document.getElementById("lastNameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById('phoneInput');
const passwordInput = document.getElementById('passwordInput');

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

$(document).ready(function(){

    database.ref("/post/").once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let childkey = childSnapshot.key;
            let childData = childSnapshot.val();
            $(".post-list").append(`<li>${childData.label}<br>${childData.review}</li>`);
            
        })
    });

    

    $(".add-post").click(function(event) {
        event.preventDefault();
        let newBrand = $("#label").val();
        let brandUpperCase = newBrand.toUpperCase();
        let newPost =  $("#comment").val();
        let alcohoolPer = $("#alcohol").val();

        
        database.ref("post/").push({
            label: brandUpperCase,
            review: newPost,
            alcohoolPer: alcohoolPer
        });
        
        $(".post-list").append(`<li>${brandUpperCase}<br>${newPost}<br>${alcohoolPer}%</li>`);
    });

});