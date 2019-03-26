const photoFile = document.getElementById('photoFile');
const nameInput = document.getElementById('nameInput');
const lastNameInput = document.getElementById("lastNameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById('phoneInput');
const passwordInput = document.getElementById('passwordInput');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');
const btnRegister = document.getElementById('btnRegister');

// Ao clicar no botão
btnRegister.addEventListener('click', function () {
    create(nameInput.value, lastNameInput.value, emailInpunt.value, phoneInput.value, passwordInput.value, confirmPasswordInput.value);
});

// Função para criar um registro no Firebase
function create(photo, name, lastName, email, phone, password, confirmPassword) {
    let data = {
        photo: photo,
        name: name,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword
    };

    return firebase.database().ref().child('users').push(data);
}