let badges = () => {
  let postCounter = $("#post-list").children().length;

  let badges = ''

  if (postCounter > 1) {
    $("#no-post").empty();
    badges += '<img src="assets/badgeAtivo 1.png" class="badge-user">'
  }

  if (postCounter > 4) {
    badges += '<img src="assets/badgeAtivo 2.png" class="badge-user">'
  }

  $(".badge-user").html(badges);
}