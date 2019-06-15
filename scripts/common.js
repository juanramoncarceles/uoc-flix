////////// GLOBAL VARIABLES ////////////
////////////////////////////////////////

const API_KEY = '7e336dae74bbbbd4d507303225d6ed24';


///////////// NAVBAR MENU  /////////////
////////////////////////////////////////

// Get the DOM Elements
const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");
const contentCover = document.getElementById("content-cover");

// The action
function navbarMenuCollapsable() {
  dropdownBtn.classList.toggle('is-active');
  contentCover.classList.toggle('content-cover');
  dropdownContent.classList.toggle('closed');
}
// Call on click the menu button (hamburger)
dropdownBtn.addEventListener('click', navbarMenuCollapsable);
// Call on click the container that darkens the main content
contentCover.addEventListener('click', navbarMenuCollapsable);


////////// SEARCH MOVIES FORM ////////// 
////////////////////////////////////////

// Get the DOM Elements
const searchForm = document.forms["search-form"];
const searchInput = searchForm["q"];

/**
 * Validates the search form. Returns true if it's not empty an not only white spaces.
 * @return {Boolean}
 */
function validateSearchForm() {
  const queryValue = searchInput.value;
  return (queryValue.length > 0 && /[\S]/.test(queryValue)) ? true : false;
}


/////////// UTILITY FUNCTIONS ////////// 
////////////////////////////////////////

/**
* Get the URL parameters.
* source: https://css-tricks.com/snippets/javascript/get-url-variables/
* @param  {String} url The URL
* @return {Object}     The URL parameters
*/
function getUrlParams(url) {
  const params = {};
  const parser = document.createElement('a');
  parser.href = url;
  const vars = parser.search.substring(1).split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};


/**
 * Returns the HTML representing a list of movie items as a string.
 * @param {Object} dataArray Array with all the data objects
 * @param {Number} limit     (optional) Limit in the amount of movie items to be created
 * @return {String}
 */
function movieObjsToHTML(dataArray, limit) {
  let finalLimit;
  if (limit && limit < dataArray.length) {
    finalLimit = limit;
  } else {
    finalLimit = dataArray.length;
  }
  const moviesArray = [];
  for (let i = 0; i < finalLimit; i++) {
    moviesArray.push(`<article>
    <a href="movie-details.html?id=${dataArray[i].id}">
      <div class="item__img">
        <img src="https://image.tmdb.org/t/p/w500${dataArray[i].poster_path}" alt="${dataArray[i].title} poster">
      </div>
      <h3 class="item__title">${dataArray[i].title}</h3>
      <p class="item__description">${dataArray[i].overview}</p>
    </a>
  </article>`);
  }
  return moviesArray.join('');
}