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

axios.get('http://151.80.70.47/orange/public/api/comments')
  .then((res) => {
    res.data.map(item => {
      // console.log(item)
      $('#comments').append(`
        <div class="comment">
          <div class="comment__wrapper">
            <div class="comment__desc">
              <div class="comment__desc-avatar"></div>
              <div class="comment__desc-header">${item.user.name}</div>
            </div>
            <p class="comment__content">${item.comment}</p>
          </div>
        </div>
      `);
    })
  })
  .catch((err) => console.log(err))

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
        "active": false,
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
  var submitArticleButton = document.querySelector('.submit-article');
  var categoreisSelect = document.querySelector('.categories-select');
  var addCategoryButton = document.querySelector('.add-category');
  var newCategoryName = document.querySelector('.new-category-name');

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

  submitArticleButton.addEventListener("click", function(e) {
    e.preventDefault();
    axios.post('http://151.80.70.47/orange/public/api/create', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
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

  });

  newsTable.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        console.log("delete", e.target.getAttribute("data-id"));
        e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
    };
    if (e.target.classList.contains("edit")) {
        console.log("edit", e.target.getAttribute("data-id"));
    };
    if (e.target.classList.contains("is-active")) {
      console.log("is-active", e.target.getAttribute("data-id"));
    };
    if (e.target.classList.contains("is-main")) {
      console.log("is-main", e.target.getAttribute("data-id"));
      var exIsMain = newsTable.querySelector(".is-main-checkbox");
      exIsMain.checked = false;
      exIsMain.classList.remove("is-main-checkbox");
      e.target.classList.add("is-main-checkbox");
    };
  });

  addCategoryButton.addEventListener("click", function(e) {
    e.preventDefault();
    addCategory(newCategoryName.value)
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
        if(parsedResponse[i].isMain) {
          isMain.classList.add("is-main-checkbox");
        };
        isMain.setAttribute("data-id", parsedResponse[i].id);
        isActive.setAttribute("data-id", parsedResponse[i].id);
        deleteArticle.setAttribute("data-id", parsedResponse[i].id);
        editArticle.setAttribute("data-id", parsedResponse[i].id);

        var clone = document.importNode(template.content, true);
        tableToAppend.appendChild(clone);
    }
  }

  renderNews(newsTable);

  function updateCategories() {
    axios.get('http://151.80.70.47/orange/public/api/category/all')
    .then(function (response) {
      console.log(response.data);
      for(var i = 0; i < response.data.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", "bbb");
        option.textContent = response.data[i].name;
        categoreisSelect.appendChild(option);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  updateCategories();

  function addCategory(categoryName) {
    if (!categoryName) return;
    axios.post('http://151.80.70.47/orange/public/api/category/create', {name: categoryName})
    .then(function (response) {
      console.log("post category response: ", response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  // addCategory();

  // axios.get('http://151.80.70.47/orange/public/api/category/all')
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .then(function () {
  //   console.log('always');
  //   // always executed
  // });

  // var rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g);
  // var eng = "shh sh ch cz yu ya yo zh - i e a b v g d e z i j k l m n o p r s t u f x -".split(/ +/g);
  // var chars = {'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'YO', 'Ж': 'ZH', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SHCH', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA'};
  // function translit(text) {
  //   for (var i in chars) { text = text.replace(new RegExp(i, 'g'), chars[i]); }
  //   return text;
  // }

  $('.nPost-content').trumbowyg();

}());
