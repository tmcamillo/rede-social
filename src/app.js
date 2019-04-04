$(document).ready(function () {
    $("#profile-photo").hover(function(){

    $(this).find("i").fadeOut();

}, function() {

    $(this).find("i").fadeIn();

});
})