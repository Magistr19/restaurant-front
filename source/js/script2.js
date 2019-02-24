axios.get('http://hackathon.xx.org.ua/api/news?sort_field=name&sort_type=desc&limit=8')
  .then((res) => {
    res.data.map(item => {
      console.log(item)
      $('.posts__list').append(`
        <li class="news posts__items">
        <div class="news__image">
          <img src="${item.image}" alt="Header">
        </div>
        <div class="news__wrapper">
          <h3 class="news__header">
            <a href="/post.html/${item.id}">${item.name}</a>
          </h3>
          <p class="news__description">${item.content}</p>
          <a class="news__more" href="#">read more..</a>
        </div>
      </li>
      `);
    })
  })
  .catch((err) => console.log('err'))

  axios.get('http://hackathon.xx.org.ua/api/news/get/main')
    .then(res => {
        $('.posts__list').prepend(`
        <li class="news news--main posts__items">
        <div class="news__image">
          <img src="${res.data[0].image}" alt="Header">
        </div>
        <div class="news__wrapper">
          <h3 class="news__header">
            <a href="#">${res.data[0].name}</a>
          </h3>
          <p class="news__description">${res.data[0].content}</p>
        </div>
      </li>
      `);
    })

// function loadPost(id) {
//  axios.get('http://hackathon.xx.org.ua/api/news/get/main')
//     .then(res => console.log(res))

// }
