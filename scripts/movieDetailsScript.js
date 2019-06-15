// Get DOM Elements
const movieDetails = document.getElementById("movie-details");
const movieImagesContainer = document.getElementById("movie-images");

// Get the URL params which corresponds to the movie id
let movieId = getUrlParams(window.location.href).id;

// Run at start
loadMovieData();

/**
 * Loads the information of a movie: Poster, title, vote, date, overview and genres.
 */
function loadMovieData() {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7e336dae74bbbbd4d507303225d6ed24`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok. No resource fetched.");
    })
    .then(objData => {
      document.title = `${objData.title} | UOC Flix`;
      const genres = objData.genres.map(genre => `<span>${genre.name}</span>`).join('');
      movieDetails.innerHTML = `
        <div class="movie-poster"><img src="https://image.tmdb.org/t/p/w500${objData.poster_path}"></div>
        <h1 class="movie-title">${objData.title}</h1>
        <p class="movie-vote">${objData.vote_average}</p>
        <p class="release-date">${objData.release_date}</p>
        <p class="movie-description">${objData.overview}</p>
        <p class="movie-genres">${genres}</p>
      `;
    })
    .catch(error => console.error(error));
}

// Run at start
loadMovieImages(10);

// Window size used to activate and deactivate the round pictures layout
// IMPORTANT: This value should match with the one in the css mediaQuery for the class .movie-images
const mediaQuery769 = window.matchMedia("(hover) and (min-width: 830px)");

// All images will be referenced here to access them later if the media state changes
let movieImages = undefined;

/**
 * Loads the images of a movie and creates the img elements.
 * @param {Number} amount Limit the amount of images to create in case there were more.
 */
function loadMovieImages(amount) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=7e336dae74bbbbd4d507303225d6ed24`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok. No resource fetched.");
    })
    .then(objData => {
      const images = [];
      let i = 0;
      while (i < objData.backdrops.length && i < amount) {
        images.push(`<img src="https://image.tmdb.org/t/p/w500${objData.backdrops[i].file_path}">`);
        i++;
      }
      movieImagesContainer.innerHTML = images.join('');
      movieImages = document.querySelectorAll('#movie-images > img');
      return movieImages;
    })
    .then(images => {
      // If screen is bigger than 769 Round Layout is applied
      if (mediaQuery769.matches) {
        roundPicturesLayout(images);
      }
    })
    .catch(error => console.error(error));
}


/**
 * Checks the mediaQuery state to decide weather to use the Round Layout or not
 * @param {mediaQuery} mediaQuery 
 */
function checkMediaQuery(mediaQuery) {
  if (mediaQuery.matches) {
    movieImages.forEach(image => {
      image.dataset.roundLayout = "true"; // value to allow transformations on mouseenter and mouseleave
    });
    roundPicturesLayout(movieImages);
  } else {
    movieImages.forEach(image => {
      image.style.transform = "unset";
      image.dataset.roundLayout = "false"; // value to avoid transformations on mouseenter and mouseleave
    });
  }
}

// Attach listener function on state changes
mediaQuery769.addListener(checkMediaQuery)