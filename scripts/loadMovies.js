////// SPECIFIC FOR THE HOME PAGE //////
////////////////////////////////////////

// Get the DOM Elements
const moviesContainer = document.getElementById("movies-container");

// Run loadMovies() when the page is loaded
window.addEventListener('load', loadMovies);

/**
 * Function to load movies.
 */
function loadMovies() {
  fetch(`https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=${API_KEY}`)
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