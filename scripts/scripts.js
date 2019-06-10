// Get DOM Elements

const moviesContainer = document.getElementById("movies-container");

const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");
const contentCover = document.getElementById("content-cover");

// Variables

const API_KEY = '7e336dae74bbbbd4d507303225d6ed24';

// Navbar interactivity

dropdownBtn.addEventListener('click', function () {
  this.classList.toggle('is-active');
  contentCover.classList.toggle('content-cover');
  dropdownContent.classList.toggle('closed');
});

// Load movies

loadMovieItems();

function loadMovieItems() {
  fetch(`https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=${API_KEY}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      moviesContainer.innerHTML = `<p class="error-msg">En estos momentos no se puede mostrar ninguna película.<br>Vuelva a intentarlo más tarde.</p>`;
      throw new Error("Network response was not ok. No resource fetched.");
    })
    .then(objData => {
      // ahora results contiene 20 pero lo tendria que limitar por si lo cambian
      moviesArray = objData.results;
      moviesContainer.innerHTML = addMoviesToDOM(moviesArray, 20);
      // moviesContainer.innerHTML = objData.results.map(movie => {
      //   return `<article>
      //             <a href="movie-details.html?id=${movie.id}">
      //               <div class="item__img">
      //                 <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
      //               </div>
      //               <h3 class="item__title">${movie.title}</h3>
      //               <p class="item__description">${movie.overview}</p>
      //             </a>
      //           </article>`
      // }).join('');
    })
    .catch(error => console.error(error));
}

// Search movies

const searchForm = document.forms["search-form"];
const searchInput = searchForm["q"];

function submitSearchForm(e) {
  e.preventDefault();
  const queryValue = searchInput.value;
  // Check if the string is not empty and not only white spaces
  if (queryValue.length > 0 && /[\S]/.test(queryValue)) {
    console.log(queryValue);
    searchMovies(queryValue);
  }
}

function searchMovies(queryString) {
  const encodedQuery = encodeURI(queryString);
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodedQuery}&include_adult=false`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      moviesContainer.innerHTML = `<p class="error-msg">En estos momentos no se puede mostrar ninguna película.<br>Vuelva a intentarlo más tarde.</p>`;
      throw new Error("Network response was not ok. No resource fetched.");
    })
    .then(objData => {
      moviesArray = objData.results;
      moviesContainer.innerHTML = addMoviesToDOM(moviesArray, 20);
    })
}



/**
 * Returns the HTML representing a list of movie items as a string. Structure of the movie item is:
 * <article><a><div><img></div><h3 'title'><p 'description'></a></article>
 * @param {Object} dataArray array with all the data objects
 * @param {Number} limit (optional) limit in the amount of movie items to be created
 */
function addMoviesToDOM(dataArray, limit) {
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