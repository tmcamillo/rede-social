function ratingStar() {

  $('#stars li').on('mouseover', function () {
    let onStar = parseInt($(this).data('value'), 10);

    $(this).parent().children('li.star').each(function (e) {
      if (e < onStar) {
        $(this).addClass('hover');
      }
      else {
        $(this).removeClass('hover');
      }
    });

  }).on('mouseout', function () {
    $(this).parent().children('li.star').each(function (e) {
      $(this).removeClass('hover');
    });
  });
  
  $('#stars li').on('click', function () {
    let onStar = parseInt($(this).data('value'), 10);
    let stars = $(this).parent().children('li.star');

    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('selected');
    }

    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass('selected');
    }
  })
}

function getingDrinks() {

  // $('#drinks li').on('mouseover', function () {
  //   let onIcon = $(this).data('value');

  //   $(this).parent().children('li.drinks').each(function (e) {
  //     if (e < onIcon) {
  //       $(this).addClass('hover');
  //     }
  //     else {
  //       $(this).removeClass('hover');
  //     }
  //   });

  // }).on('mouseout', function () {
  //   $(this).parent().children('li.star').each(function (e) {
  //     $(this).removeClass('hover');
  //   });
  // });
  
  $('#drinks li').on('click', function () {
    let onIcon = $(this).data('value');
    let icon = $(this).parent().children('li.drinks');

    for (i = 0; i < stars.length; i++) {
      $(icon[i]).removeClass('selected');
    }

    for (i = 0; i < onIcon; i++) {
      $(icon[i]).addClass('selected');
    }
  })
}