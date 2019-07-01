function badges() {
  let postCounter = $("#post-list").children().length;
  if (postCounter < 1) {
    $("#no-post").html("");
  } else {
    $(".badge-user").html(
      `<img src="assets/badgeAtivo 1.png" class="badge-user">`
    );
  }
}
