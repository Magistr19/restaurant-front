'use strict';

$(document).ready(function() {
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