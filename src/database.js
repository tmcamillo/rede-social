const database = firebase.database();
// const userId = firebase.auth().currentUser.uid;
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
    database.ref('/post/').once('value')
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let childkey = childSnapshot.key;
            let childData = childSnapshot.val();
            $(".post-list").append(`<li>${childData.brand}<br>${childData.review}</li>`);
            
        })
    });
    
    $(".add-post").click(function(event) {
        event.preventDefault();
        let newBrand = $(".brand-input").val();
        let brandUpperCase = newBrand.toUpperCase();
        let newPost =  $(".review-input").val();
        
        database.ref("post").push({
            brand: brandUpperCase,
            review: newPost
        });
        
        $(".post-list").append(`<li>${brandUpperCase}<br>${newPost}</li>`);
    });

});