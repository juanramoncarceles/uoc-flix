const moviesContainer = document.getElementById("movies-container");

const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.querySelectorAll("#dropdown-content a");
const contentCover = document.getElementById("content-cover");

dropdownBtn.addEventListener('click', function () {
  this.classList.toggle('is-active');
  contentCover.classList.toggle('content-cover');
  dropdownContent.forEach(element => {
    element.classList.toggle('closed');
  });
});

loadMovieItems();

function loadMovieItems() {
  fetch(`https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=7e336dae74bbbbd4d507303225d6ed24`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      moviesContainer.innerHTML = `<p>An error happened. No movies were found.</p>`;
      throw new Error("Network response was not ok. No resource fetched.");
    })
    .then(objData => {
      //console.log(objData);
      moviesContainer.innerHTML = objData.results.map(movie => {
        return `<article>
                  <a href="movie-details.html?id=${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
                    <h3 class="item__title">${movie.title}</h3>
                    <p class="item__description">${movie.overview}</p>
                  </a>
                </article>`
      }).join('');
    })
    .catch(error => console.error(error));
}