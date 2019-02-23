'use strict';

$(document).ready(function() {
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

(function() {
    var response = `[
    {
        "id": 1,
        "name": "first",
        "category": "first-cat",
        "preview": "akdlfj adlfjlkj akfj aljf",
        "author": "Armin",
        "created": "30.11.18",
        "edited": "30.11.18",
        "active": true,
        "isMain": false
    },
    {
        "id": 2,
        "name": "second",
        "category": "second-cat",
        "preview": "rtut toiwut iour ruitru ritiru it iru dfg rtut toiwut iour ruitru ritiru it iru dfg rtut toiwut iour ruitru ritiru it iru dfg rtut toiwut iour ruitru ritiru it iru dfg ",
        "author": "Van",
        "created": "15.06.07",
        "edited": "25.06.07",
        "active": true,
        "isMain": true
    },
    {
        "id": 3,
        "name": "third",
        "category": "third-cat",
        "preview": ",mn m,   ,n ,mn m,n ,n,m   f",
        "author": "Buuren",
        "created": "10.02.13",
        "edited": "10.03.14",
        "active": false,
        "isMain": false
    },
    {
        "id": 4,
        "name": "third",
        "category": "third-cat",
        "preview": ",mn m,   ,n ,mn m,n ,n,m   f",
        "author": "Buuren",
        "created": "10.02.13",
        "edited": "10.03.14",
        "active": false,
        "isMain": false
    }
  ]`;
  var parsedResponse = JSON.parse(response);


  var addNewsTab = document.querySelector('.add-article-tab');
  var newsListTab = document.querySelector('.news-list-tab');
  var newsTable = document.querySelector('.news-table');
  var addNews = document.querySelector('.add-news-button');
  var backToNews = document.querySelector('.back-to-news');

  addNews.addEventListener("click", function (e) {
    e.preventDefault();
    addNewsTab.classList.toggle("hidden");
    newsListTab.classList.toggle("hidden");
  });

  backToNews.addEventListener("click", function (e) {
    e.preventDefault();
    addNewsTab.classList.toggle("hidden");
    newsListTab.classList.toggle("hidden");
  });

  newsTable.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("delete")) {
        console.log("delete", e.target.getAttribute("data-id"));
    };
    if (e.target.classList.contains("edit")) {
        console.log("edit", e.target.getAttribute("data-id"));
    };
    if (e.target.classList.contains("is-active")) {
      console.log("is-active", e.target.getAttribute("data-id"));
    };
    if (e.target.classList.contains("is-main")) {
      console.log("is-main", e.target.getAttribute("data-id"));
    };
  });

  function renderNews(tableToAppend) {
    var template = document.querySelector('.template');
    var tr = template.content.querySelector("tr");
    var id = tr.querySelector(".id");
    var newName = tr.querySelector(".name");
    var category = tr.querySelector(".category");
    var preview = tr.querySelector(".preview");
    var author = tr.querySelector(".author");
    var created = tr.querySelector(".created");
    var edited = tr.querySelector(".edited");
    var isActive = tr.querySelector(".is-active");
    var isMain = tr.querySelector(".is-main");
    var deleteArticle = tr.querySelector(".delete");
    var editArticle = tr.querySelector(".edit");

    for (var i = 0; i < parsedResponse.length; i++) {
        id.textContent = parsedResponse[i].id;
        newName.textContent = parsedResponse[i].name;
        category.textContent = parsedResponse[i].category;
        preview.textContent = parsedResponse[i].preview;
        author.textContent = parsedResponse[i].author;
        created.textContent = parsedResponse[i].created;
        edited.textContent = parsedResponse[i].edited;
        isActive.checked = parsedResponse[i].active;
        isMain.checked = parsedResponse[i].isMain;
        isMain.setAttribute("data-id", parsedResponse[i].id);
        isActive.setAttribute("data-id", parsedResponse[i].id);
        deleteArticle.setAttribute("data-id", parsedResponse[i].id);
        editArticle.setAttribute("data-id", parsedResponse[i].id);

        var clone = document.importNode(template.content, true);
        tableToAppend.appendChild(clone);
    }
  }

  renderNews(newsTable);

  axios.get('https://api.chucknorris.io/jokes/categories')
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    console.log('always');
    // always executed
  });
  console.log("log me");
}());
