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

// function gettingDrinks() {

//   $('#listDrinks li').on('click', function () {
//     let stars = $(this).parent().children('li.drinks');

//       $(stars).addClass('selected');
//       console.log(iconDrink(parseInt($('#listDrinks li.selected').last().data('value'), 10)))
//       console.log (parseInt($('#listDrinks li.selected').last().data('value'), 10))
//     })
// }

// function iconDrink(number){
//   if(number === 1){
//     return "fas fa-cocktail fa-2x mx-2";
//   }if(number === 2){
//     return "fas fa-wine-glass-alt fa-2x mx-2"; 
//   }if(number === 3){
//     return "fas fa-beer fa-2x mx-2";
//   } else {
//     return "fas fa-wine-bottle";
//   }
// }