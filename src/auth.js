$(document).ready(function () {

    $("#exampleEnterBtn").click(function(event) {
        event.preventDefault();

        let email = $("#exampleInputEmail1").val();
        let password = $("#exampleInputPassword1").val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function() {
                window.location = "home.html";
            })
            .catch(function (error) {

                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode)
                console.log(errorMessage)
            })
    });

    $("#btnRegister").click(function(event) {
        event.preventDefault();
        
        let email = $("#emailInput").val();
        let password = $("#passwordInput").val();

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function() {
                window.location = "home.html";
            })
            .catch(function (error){

                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode)
                console.log(errorMessage)
            })
    });

})