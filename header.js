const header = document.getElementById('header');

header.innerHTML = `
  <a href="index.html">
    <picture>
      <source srcset="assets/logo2.svg" media="(min-width:769px)" />
      <source srcset="assets/imago.svg" />
      <img class="logo" src="assets/logo2.svg" alt="UOC Flix Logo">
    </picture>
  </a>
  <div class="dropdown-menu">
    <button id="dropdown-btn" class="dropdown-btn hamburger hamburger--collapse" type="button">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <nav class="dropdown-content closed" id="dropdown-content">
      <a href="#">Inicio</a>
      <a href="#">Más populares</a>
      <a href="#">Sobre nosotros</a>
    </nav>
  </div>
  <form class="search-form" action="/search" onsubmit="return validateSearchForm()" name="search-form">
    <label class="offscreen" for="search-input"><span>Buscar</span></label>
    <input id="search-input" type="search" value="" placeholder="Buscar" name="q">
    <button id="search-button" type="submit">
      <span class="offscreen">Buscar</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="28" viewBox="0 0 26 28">
        <path
          d="M18 13c0-3.859-3.141-7-7-7s-7 3.141-7 7 3.141 7 7 7 7-3.141 7-7zm8 13c0 1.094-.906 2-2 2a1.96 1.96 0 0 1-1.406-.594l-5.359-5.344a10.971 10.971 0 0 1-6.234 1.937c-6.078 0-11-4.922-11-11s4.922-11 11-11 11 4.922 11 11c0 2.219-.672 4.406-1.937 6.234l5.359 5.359c.359.359.578.875.578 1.406z">
        </path>
      </svg>
    </button>
  </form>
  <button id="install-btn" class="install-btn" aria-label="Install" hidden></button>`;