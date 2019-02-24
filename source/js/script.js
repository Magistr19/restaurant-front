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

function login() {
  var data = {
    login: $('#login-email').val(),
    password: $('#login-password').val()
  };

  console.log(data);
}

function register() {
  var data = {
    login: $('#reg-login').val(),
    email: $('#reg-email').val(),
    password: $('#reg-password').val(),
    confPassword: $('#reg-confPassword').val()
  };

  console.log(data);
}

axios.get('http://hackathon.xx.org.ua/api/comments')
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

  axios.get('http://hackathon.xx.org.ua/api/categories')
  .then((res) => {
    res.data.map(item => {
      // console.log(item)
      $('.link-categories').append(`
        <li><a href="#">${item.name}</a></li>
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
  //   var response = `[
  //   {
  //       "id": 1,
  //       "name": "first",
  //       "category": "first-cat",
  //       "preview": "akdlfj adlfjlkj akfj aljf",
  //       "author": "Armin",
  //       "created": "30.11.18",
  //       "edited": "30.11.18",
  //       "active": false,
  //       "isMain": false
  //   },
  //   {
  //       "id": 2,
  //       "name": "second",
  //       "category": "second-cat",
  //       "preview": "rtut toiwut iour ruitru ritiru it iru dfg rtut toiwut iour ruitru ritiru it iru dfg rtut toiwut iour ruitru ritiru it iru dfg rtut toiwut iour ruitru ritiru it iru dfg ",
  //       "author": "Van",
  //       "created": "15.06.07",
  //       "edited": "25.06.07",
  //       "active": true,
  //       "isMain": true
  //   },
  //   {
  //       "id": 3,
  //       "name": "third",
  //       "category": "third-cat",
  //       "preview": ",mn m,   ,n ,mn m,n ,n,m   f",
  //       "author": "Buuren",
  //       "created": "10.02.13",
  //       "edited": "10.03.14",
  //       "active": false,
  //       "isMain": false
  //   },
  //   {
  //       "id": 4,
  //       "name": "third",
  //       "category": "third-cat",
  //       "preview": ",mn m,   ,n ,mn m,n ,n,m   f",
  //       "author": "Buuren",
  //       "created": "10.02.13",
  //       "edited": "10.03.14",
  //       "active": false,
  //       "isMain": false
  //   }
  // ]`;
  // var parsedResponse = JSON.parse(response);

  var pictureDataUrl;
  var addNewsTab = document.querySelector('.add-article-tab');
  var newsListTab = document.querySelector('.news-list-tab');
  var newsTable = document.querySelector('.news-table');
  var addNews = document.querySelector('.add-news-button');
  var backToNews = document.querySelector('.back-to-news');
  var submitArticleButton = document.querySelector('.submit-article');
  var categoreisSelect = document.querySelector('.categories-select');
  var addCategoryButton = document.querySelector('.add-category');
  var newCategoryName = document.querySelector('.new-category-name');
  var addArticleButton = document.querySelector('.submit-article');
  var articleName = document.querySelector('.atricle-name');
  var articlePicture = document.querySelector('.article-picture');
  var articleContent = document.querySelector('.article-content');
  var articleImage = document.querySelector(".article-image");

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
    if (e.target.classList.contains("delete")) {
        console.log("delete", e.target.getAttribute("data-id"));
        e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
    };
    if (e.target.classList.contains("edit")) {
        console.log("edit", e.target.getAttribute("data-id"));
        e.preventDefault();
        addNewsTab.classList.toggle("hidden");
        newsListTab.classList.toggle("hidden");

        axios.get('http://151.80.70.47/orange/public/api/news/' + articleURL)
          .then(function (response) {
            console.log(response.data);
          })
        .catch(function (error) {
          console.log(error);
        })
        articleName.value = "x";
        articleContent.value = "xx";
        // categoreisSelect.selectedIndex = 4; //categoreisSelect.value
        articleImage.src = "";


    };
    if (e.target.classList.contains("is-active")) {
      console.log("is-active", e.target.getAttribute("data-id"));
    };
    if (e.target.classList.contains("is-main")) {
      console.log("is-main", e.target.getAttribute("data-id"));
      var exIsMain = newsTable.querySelector(".is-main-checkbox");

      if (exIsMain === e.target) { return };
      e.target.classList.add("is-main-checkbox");
      if (!exIsMain) {return}
      exIsMain.checked = false;
      exIsMain.classList.remove("is-main-checkbox");
    };
  });

  addCategoryButton.addEventListener("click", function(e) {
    e.preventDefault();
    addCategory(newCategoryName.value)
  });

  addArticleButton.addEventListener("click", function(e) {
    e.preventDefault();
    addArticle();
  });

  articlePicture.addEventListener("change", function(e) {
    addArticleImage();
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

    axios.get('http://151.80.70.47/orange/public/api/news?sort_field=name&sort_type=desc&limit=15')
    .then(function (response) {
      console.log("get response: ", response.data);
      var parsedResponse = response.data;



    for (var i = 0; i < parsedResponse.length; i++) {
        id.textContent = parsedResponse[i].id;
        newName.textContent = parsedResponse[i].name;
        newName.href = "http://151.80.70.47/orange/public/api/news/" + parsedResponse[i].url;
        category.textContent = parsedResponse[i].category_id;
        preview.textContent = parsedResponse[i].preview;
        author.textContent = parsedResponse[i].user_create_id;
        created.textContent = parsedResponse[i].created_at;
        edited.textContent = parsedResponse[i].updated_at;
        isActive.checked = parsedResponse[i].is_active;
        isMain.checked = parsedResponse[i].is_main;
        if(parsedResponse[i].is_main) {
          isMain.classList.add("is-main-checkbox");
        };
        isMain.setAttribute("data-id", parsedResponse[i].id);
        isActive.setAttribute("data-id", parsedResponse[i].id);
        deleteArticle.setAttribute("data-id", parsedResponse[i].id);
        editArticle.setAttribute("data-id", parsedResponse[i].id);

        var clone = document.importNode(template.content, true);
        tableToAppend.appendChild(clone);
    }

    })
    .catch(function (error) {
      console.log(error);
    })

  }

  renderNews(newsTable);

  function updateCategories() {
    axios.get('http://151.80.70.47/orange/public/api/categories')
    .then(function (response) {
      console.log(response.data);
      for(var i = 0; i < response.data.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", response.data[i].id);
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
    axios.post('http://151.80.70.47/orange/public/api/category', {name: categoryName})
    .then(function (response) {
      console.log("post category response: ", response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function addArticle(){
    var data = {
      name: articleName.value,
      category: categoreisSelect.value,
      content: articleContent.value,
      picture: pictureDataUrl
    }

    console.log(data);
    // axios.post('http://151.80.70.47/orange/public/api/...', data)
    // .then(function (response) {
    //   console.log("post category response: ", response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })
  }

  function addArticleImage() {
      var reader  = new FileReader();
      reader.onloadend = function () {
      pictureDataUrl = reader.result;
      articleImage.src = reader.result;
    }
    if (articlePicture.files[0]) {
      reader.readAsDataURL(articlePicture.files[0]);
    }
  }

  $('.article-content').trumbowyg();

}());
