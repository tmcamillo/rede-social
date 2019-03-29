$(document).ready(function () {

    $("#exampleEnterBtn").click(function(event) {
        event.preventDefault();

        let email = $("#exampleInputEmail1").val();
        let password = $("#exampleInputPassword1").val();

        firebase.auth().createUserWithEmailAndPassword(txtEmail, txtPassword)
            .then(function(){
            window.location = "home.html";
            writeUserData(userId, imageUrl, name, lastName, email, phone, password);
            })
        
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                
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