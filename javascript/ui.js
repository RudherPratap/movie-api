export function initializeUI() {
  const searchBox = document.getElementById("mov_search");
  const searchButton = document.querySelector(".search-button");
  const searchedItemsList = document.getElementById("searched_items");
  const favoriteMoviesContainer = document.getElementById("fav_movies");

  return { searchBox, searchButton, searchedItemsList, favoriteMoviesContainer };
}

export function displaySearchResults(results, searchedItemsList, addToFavorites) {
  searchedItemsList.innerHTML = "";

  results.forEach(result => {
    const card = createMovieCard(result, addToFavorites);
    searchedItemsList.appendChild(card);
  });
}
export function createMovieCard(movie, addToFavorites) {
  const card = document.createElement("div");
  card.classList.add("movie-card");
  card.style.border = "1px solid #ccc"
  card.innerHTML = `
  <div class="card-content">
  <h2>${movie.Title}</h2>
  <p>${movie.Year}<p>
  <i class="fas fa-heart like-icon" data-imdb-id="${movie.imdbID}"></i>
    </div>`;
  card.addEventListener("click", addToFavorites);
  return card;
}

export function createFavouriteCard(movie, favoriteMoviesContainer) {
  const favouriteCard = document.createElement("div");
  favouriteCard.classList.add("favourite-card");
  favouriteCard.innerHTML = `
    <h2>${movie.Title}</h2>
    <div class="card-content">
      <h3>${movie.Year}</h3>
      <p>${movie.Plot}</p>
    </div>`;
  favoriteMoviesContainer.appendChild(favouriteCard);
  // saveToStorage();
}

export function removeFavouriteCard(movieId, favoriteMoviesContainer) {
  const cardToRemove = document.querySelector(`.favourite-card[data-imdb-id="${movieId}"]`);
  if (cardToRemove) {
    favoriteMoviesContainer.removeChild(cardToRemove);
  }
}
