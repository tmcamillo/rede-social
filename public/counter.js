function badges(){
  let postCounter = $('#post-list').children().length;
if(postCounter < 2){
    $("#no-post").html("");
    $(".badge-user").html("");
} else{
  $(".badge-user").html(`<img src="./assets/badgeAtivo 1.png" class="badge-user">`);
}
}