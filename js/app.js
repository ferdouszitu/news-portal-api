// load all news category
const loadAllNewsCategory = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url)
        const data = await res.json()
        displayAllCategory(data.data.news_category)
    }
    catch {

    }

}

// display all news category
const displayAllCategory = (newses) => {
    const allNewsCategoryContainer = document.getElementById('all-news-category')
    allNewsCategoryContainer.textContent = '';

    newses.forEach(news => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="mx-auto text-center font-bold">
            <button
                onclick="loadAllNews('${news.category_id}')"
                >${news.category_name}
            </button>
        </div>
        `
        allNewsCategoryContainer.appendChild(div)
    })
}

// load individual category all news

const loadAllNews = async category_id => {
    toggleSpinner('block');
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        const res = await fetch(url)
        const data = await res.json()
        displayAllNews(data.data);
    }
    catch {

    }
}

//spinner
const toggleSpinner = displayStyle => {
    document.getElementById('toggle_spinner').style.display = displayStyle;
}

// display individual category all news
const displayAllNews = allNews => {

    //error handle
    document.getElementById('error_messsage').innerText = '';
    if (allNews.length === 0) {
        document.getElementById('error_messsage').innerText = 'No news found';
        toggleSpinner('none');
    }
    const lengthContainer = document.getElementById('length')
    const newsContainer = document.getElementById('news-details')
    const p = document.createElement('p')
    lengthContainer.textContent = ''
    p.innerHTML = `
         ${allNews.length} items found for the category
    `
    lengthContainer.appendChild(p)
    newsContainer.textContent = ''

    allNews.forEach(newsAll => {
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="card lg:card-side bg-base-100 shadow-xl mx-auto my-5">
                <figure><img class='' src=${newsAll.thumbnail_url} alt="Album"></figure>
                <div class="card-body">
                    <h2 class="card-title">${newsAll.title}</h2>
                    <p>${newsAll.details.slice(0, 400)}...</p>
                    <div class="flex justify-evenly items-center">
                        <div class="flex items-center">
                            <figure><img class='w-12  px-2' src=${newsAll.author.img} alt="Album"></figure>
                            <p>${newsAll.author.name ? newsAll.author.name : 'No Data Found'}</p>
                        </div>
                        <div>
                        <p><img class="float-left pt-1" src="image/carbon_view.png" alt="">${newsAll.total_view ? newsAll.total_view : 'No Data Found'}</p>
                        </div>
                        <div>
                            <p>${newsAll.rating.number}</p>
                        </div>
                        <div class="card-actions">
                            <label for="my-modal-6" 
                            onclick="loadNewsDetails('${newsAll._id}')" class="btn btn-primary" modal-button">Details</label>
                        </div>
                    </div>
                </div>
          </div>
    `
        newsContainer.appendChild(div)
    })
    toggleSpinner('none');
}
// load news details
const loadNewsDetails = async news_id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`
        const res = await fetch(url)
        const data = await res.json()
        displayNewsDetails(data.data);
    }
    catch {

    }
}
// display news details modal
const displayNewsDetails = newsDetails => {
    console.log();
    const modalContainer = document.getElementById('modal')
    modalContainer.textContent = ''

    const div = document.createElement('div')
    div.innerHTML = `
    <h1 class="font-bold"> ${newsDetails[0].title}<h1>
        <div class='flex justify-evenly items-center mt-7'>
            <div>
                <img class='pr-5 w-80' src=${newsDetails[0].thumbnail_url} alt="">
            </div>

            <div> 
                <p class="font-medium"><span class='text-purple-600'>  Author : </span> <span>${newsDetails[0].author.name ? newsDetails[0].author.name : 'Not Found'} </span> </p>
                <p class="font-medium"><span class='text-purple-600'>  Details : </span> <span>${newsDetails[0].details.slice(0, 100) ? newsDetails[0].details.slice(0, 100) : 'Not Found'}.... </span> </p>
                <p class="font-medium"><small><span class='text-purple-600'>  Published Date: </span> <span> ${newsDetails[0].author.published_date ? newsDetails[0].author.published_date : 'Not Found'}</small> </span> </p>

                <p class="font-medium">
                    <small> 
                        <span class='text-purple-600'>  Ratting: </span> <span> ${newsDetails[0].rating.number ? newsDetails[0].rating.number : 'No data available'} </span>,,
                        <span class='text-purple-600'>  Badge:</span> <span> ${newsDetails[0].rating.badge ? newsDetails[0].rating.badge : 'No data available'} </span>,,
                        <span class='text-purple-600'>Total-View :</span> <span> ${newsDetails[0].total_view ? newsDetails[0].total_view : 'No data available'}   </span>
                    </small>
                </p> 
                
            </div>
        </div>           
  `
    modalContainer.appendChild(div)
}


loadAllNewsCategory()