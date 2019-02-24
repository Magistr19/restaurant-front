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

function login(e) {
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
  var editArticleButton = document.querySelector('.edit-article');
  var articleName = document.querySelector('.atricle-name');
  var articlePicture = document.querySelector('.article-picture');
  var articleContent = document.querySelector('.article-content');
  // var articleContent = document.querySelector('.trumbowyg-editor');
  var articleImage = document.querySelector(".article-image");

  addNews.addEventListener("click", function (e) {
    e.preventDefault();
    articleName.value = "";
    articleContent.value = "";
    categoreisSelect.selectedIndex = 0;

    addNewsTab.classList.toggle("hidden");
    newsListTab.classList.toggle("hidden");

    editArticleButton.classList.add("hidden");
    editArticleButton.disabled = true;
  });

  backToNews.addEventListener("click", function (e) {
    e.preventDefault();
    addNewsTab.classList.toggle("hidden");
    newsListTab.classList.toggle("hidden");

    editArticleButton.classList.remove("hidden");
    editArticleButton.disabled = false;

    submitArticleButton.classList.remove("hidden");
    submitArticleButton.disabled = false;
  });

  newsTable.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        console.log("delete", e.target.getAttribute("data-id"));
        e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
        deleteArticle(e.target.getAttribute("data-id"));
    };
    if (e.target.classList.contains("edit")) {
        console.log("edit", e.target.getAttribute("data-id"));
        e.preventDefault();
        addNewsTab.classList.toggle("hidden");
        newsListTab.classList.toggle("hidden");

        axios.get('http://hackathon.xx.org.ua/api/news/' + e.target.getAttribute('data-url'))
          .then(function (response) {

            editArticleButton.setAttribute('data-url', e.target.getAttribute('data-url'));
            console.log(response.data[0]);
            articleName.value = response.data[0].name;
            articleContent.value = response.data[0].content;
            categoreisSelect.selectedIndex = response.data[0].category_id - 1;
          })
        .catch(function (error) {
          console.log(error);
        })

        submitArticleButton.classList.add("hidden");
        submitArticleButton.disabled = true;

    };
    if (e.target.classList.contains("is-active")) {
      toggleActive(e.target.getAttribute("data-id"));
      console.log("is-active", e.target.getAttribute("data-id"));
    };
    if (e.target.classList.contains("is-main")) {
      console.log("is-main", e.target.getAttribute("data-id"));
      var exIsMain = newsTable.querySelector(".is-main-checkbox");

      if (exIsMain === e.target) { return };
      e.target.classList.add("is-main-checkbox");
      makeMain(e.target.getAttribute("data-id"));
      if (!exIsMain) {return}
      exIsMain.checked = false;
      exIsMain.classList.remove("is-main-checkbox");
    };
  });

  function deleteArticle(id) {
    console.log(JSON.stringify({article_id: id}));
    // axios.delete('http://hackathon.xx.org.ua/api/admin/news/delete', { data: {article_id: id} })
    axios.delete('http://hackathon.xx.org.ua/api/admin/news/delete/' + id)
      .then(function (response) {
        console.log(response)
      })
    .catch(function (error) {
      console.log(error);
    })
  }

  addCategoryButton.addEventListener("click", function(e) {
    e.preventDefault();
    addCategory(newCategoryName.value)
  });

  addArticleButton.addEventListener("click", function(e) {
    e.preventDefault();
    addArticle();
  });

  editArticleButton.addEventListener("click", function(e) {
    e.preventDefault();
    editArticleFunc(editArticleButton.getAttribute('data-id'));
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

    axios.get('http://hackathon.xx.org.ua/api/admin/news?sort_field=name&sort_type=desc&limit=31')
    .then(function (response) {
      console.log("get response: ", response.data);
      var parsedResponse = response.data;

      // http://hackathon.xx.org.ua/api/news?sort_field=name&sort_type=desc&limit=31

    for (var i = 0; i < parsedResponse.length; i++) {
        id.textContent = parsedResponse[i].id;
        newName.textContent = parsedResponse[i].name;
        newName.href = "http://hackathon.xx.org.ua/api/news/" + parsedResponse[i].url;
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
        editArticle.setAttribute("data-url", parsedResponse[i].url);

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
    axios.get('http://hackathon.xx.org.ua/api/categories')
    .then(function (response) {
      // console.log(response.data);
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
    axios.post('http://hackathon.xx.org.ua/api/category', {name: categoryName})
    .then(function (response) {
      // console.log("post category response: ", response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  //
  function addArticle(){
    var url = translit(articleName.value);
    var data = {
      name: articleName.value,
      category_id: categoreisSelect.value,
      content: articleContent.value,
      image: pictureDataUrl,
      url: url
    }

    console.log(data);
    axios.post('http://hackathon.xx.org.ua/api/admin/news/create', data)
    .then(function (response) {
      console.log("post category response: ", response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function toggleActive(id) {
    console.log(id);
    axios.put('http://hackathon.xx.org.ua/api/admin/news/update/active-status/' + id)
    .then(function (response) {
      console.log("active response: ", response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function makeMain(id) {
    console.log(id);
    axios.post('http://hackathon.xx.org.ua/api/admin/news/update/main/' + id)
    .then(function (response) {
      console.log("active response: ", response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function editArticleFunc(id) {
    var data = {
      id: id,
      name: articleName.value,
      content: articleContent.value,
      category_id: categoreisSelect.value
    };
    axios.put('http://hackathon.xx.org.ua/api/admin/news/update', data)
    .then(function (response) {
      console.log("put category response: ", response);
    })
    .catch(function (error) {
      console.log(error);
    })
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

  // $('.article-content').trumbowyg();

  var chars = {'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya', 'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'YO', 'Ж': 'ZH', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SHCH', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'YU', 'Я': 'YA'};
  function translit(text) {
    for (var i in chars) {
      text = text.replace(new RegExp(i, 'g'), chars[i]);
    }
    return text;
  }

}());
