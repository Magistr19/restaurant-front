'use strict';

$(document).ready(function() {
<<<<<<< HEAD
    $(".link--dropdown").click(function() {
      $(".link-categories").slideToggle();
    });
});

//Комменты

let comments = document.querySelectorAll('.comment');

for (let i = 0; i < comments.length; i++) {
  let elem = comments[i];
  let parentEl = elem.parentNode;

  if (parentEl.classList.contains('comment')) { // Если коммент вложен в другой коммент

    let wrapperEl = elem.firstElementChild;

   wrapperEl.style.marginTop = '0px';
   wrapperEl.style.marginLeft = '40px';

    if (parentEl.parentNode.classList.contains('comment')) {// И там еще выше есть коммент  
      wrapperEl.style.marginLeft = '80px'; //3-ий уровень вложености 
    }
  }
}
=======
  $(".link--dropdown").click(function() {
    $(".link-categories").slideToggle();
  });

  $("#login").click(function() {
    $("#modal-login").toggle();
  });

  $("#register").click(function() {
    $("#modal-login").toggle();
    $("#modal-register").toggle();
  });

  $("#haveacc").click(function() {
    $("#modal-login").toggle();
    $("#modal-register").toggle();
  });

  $("#close1").click(function() {
    $("#modal-login").toggle();;
  });

  $("#close2").click(function() {
    $("#modal-register").toggle();
  });

});
>>>>>>> 7854eb4f00f56bcfa886a48b02200e9e8bafbd33
