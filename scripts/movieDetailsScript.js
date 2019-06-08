const movieDetails = document.getElementById("movie-details");
const movieImages = document.getElementById("movie-images");

let movieId = getUrlParams(window.location.href).id;

/**
* Get the URL parameters
* source: https://css-tricks.com/snippets/javascript/get-url-variables/
* @param  {String} url The URL
* @return {Object}     The URL parameters
*/
function getUrlParams(url) {
  const params = {};
  const parser = document.createElement('a');
  parser.href = url;
  // const query = parser.search.substring(1);
  // const vars = query.split('&');
  const vars = parser.search.substring(1).split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};


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
      console.log(objData);
      document.title = `${objData.title} | UOC Flix`;
      const genres = objData.genres.map(genre => `<span>${genre.name}</span>`).join('');
      movieDetails.innerHTML = `
        <p>${objData.title}</p>
        <p>${objData.release_date}</p>
        <img src="https://image.tmdb.org/t/p/w500${objData.poster_path}">
        <p>${objData.overview}</p>
        <p>${genres}</p>
        <p>${objData.vote_average}</p>
      `;
    })
    .catch(error => console.error(error));
}

loadMovieImages(10);

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
        console.log(i);
        i++;
      }
      movieImages.innerHTML = images.join('');
    })
    .catch(error => console.error(error));
}