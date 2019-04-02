$(document).ready(function () {

    $("#exampleEnterBtn").click(function(event) {
        event.preventDefault();

        let email = $("#exampleInputEmail1").val();
        let password = $("#exampleInputPassword1").val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(response){
                window.location = "home.html?id=" + response.user.uid;
                writeUserData(userId, imageUrl, name, lastName, email, phone, password);
            })
        
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert (errorCode, errorMessage);
            
            })
    });

    $("#btnRegister").click(function(event) {
        event.preventDefault();
        
        let email = $("#emailInput").val();
        let password = $("#passwordInput").val();

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(response) {
                window.location = "home.html?id=" + response.user.uid;
            })
            .catch(function (error){

                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode)
                console.log(errorMessage)
            })
    });

})