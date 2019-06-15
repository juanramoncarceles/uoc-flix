///// SPECIFIC FOR THE SEARCH PAGE /////
////////////////////////////////////////

// Get the DOM Elements
const searchTitle = document.getElementById("search-title");
const moviesContainer = document.getElementById("movies-container");

// Get the URL params which corresponds to the query string
let queryValue = getUrlParams(window.location.href).q;

// Set the title with the query string
searchTitle.innerText = `Resultado de búsqueda por: "${queryValue}"`;

/**
 * Function to search movies.
 * @param {*} queryString The string with the keywords to search
 */
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
      moviesContainer.innerHTML = movieObjsToHTML(moviesArray, 20);
    })
    .catch(error => console.error(error));
}