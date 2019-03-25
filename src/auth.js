const authGitHubButton = document.getElementById("authGitHubButton");
const authFacebookButton = document.getElementById("authFacebookButton");
const authTwitterButton = document.getElementById("authTwitterButton");
const authGoogleButton = document.getElementById("authGoogleButton");
const authAnonymouslyButton = document.getElementById("authAnonymouslyButton");
const exampleInputPassword1 = document.getElementById("exampleInputPassword1");
const exampleInputEmail1 = document.getElementById("exampleInputEmail1");
const exampleEnterBtn =  document.getElementById("exampleEnterBtn");

function create(name, age) {
    var data = {
        name: name,
        age: age
    };

    return firebase.database().ref().child('users').push(data);
}

firebase.database().ref('users').on('value', function (snapshot) {
    usersList.innerHTML = '';
    snapshot.forEach(function (item) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(item.val().name + ': ' + item.val().age));
        usersList.appendChild(li);
    });
});
