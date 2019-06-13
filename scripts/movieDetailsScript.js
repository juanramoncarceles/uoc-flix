const movieDetails = document.getElementById("movie-details");
const movieImagesContainer = document.getElementById("movie-images");

let movieId = getUrlParams(window.location.href).id;

// Aqui estaba antes la funcion getUrlParams()


loadMovieData();

function loadMovieData() {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=7e336dae74bbbbd4d507303225d6ed24`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      // container.innerHTML = `<p style="font-size: 5rem;">No picture found &#128533;</p>`;
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

loadMovieImages(10);

// Window size used to activate and deactivate the round pictures layout
// IMPORTANT: This value should match with the one in the css mediaQuery for the class .movie-images
//const mediaQuery769 = window.matchMedia("(min-width: 769px)");
const mediaQuery769 = window.matchMedia("(hover) and (min-width: 830px)");

// All images will be referenced here to access them later if the media state changes
let movieImages = undefined;

function loadMovieImages(amount) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=7e336dae74bbbbd4d507303225d6ed24`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      // container.innerHTML = `<p style="font-size: 5rem;">No picture found &#128533;</p>`;
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
      // if screen is bigger than 769 round layout is applied
      if (mediaQuery769.matches) {
        roundPicturesLayout(images);
      }
    })
    .catch(error => console.error(error));
}

// Round layout only if window is big
// Called when the media state changes
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