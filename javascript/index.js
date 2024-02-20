
import { initializeUI, displaySearchResults, createFavouriteCard, removeFavouriteCard } from './ui.js';
import { fetchMovieData, fetchMovieDetails } from './api.js';

document.addEventListener("DOMContentLoaded", function () {
  const { searchBox, searchButton, searchedItemsList, favoriteMoviesContainer } = initializeUI();

  let likedMovies = [];

  //the local storage is not working
  /*
  if (localStorage.getItem("likedMovies")) {
    likedMovies = localStorage.getItem("likedMovies").split(';').map(movieString => {
      const [Title, Year, Plot] = movieString.split(',');
      return { Title, Year, Plot };
    });
    createFavouriteCard();
  }
  function saveToStorage() {
    const savedMovies = likedMovies.map(movie => `${movie.Title},${movie.Year},${movie.Plot}`).join(';');
    localStorage.setItem("likedMovies", savedMovies);
  }
  */

  searchButton.addEventListener("click", async function () {
    searchMovies();
  });

  searchBox.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
      searchMovies();
    }
  });

  async function searchMovies() {
    const searchTerm = searchBox.value.trim();
    if (searchTerm !== "") {
      try {
        const results = await fetchMovieData(searchTerm);
        displaySearchResults(results, searchedItemsList, addToFavorites);
      } catch (error) {
        alert(error.message || "An error occurred while fetching data.");
      }
    }
  }

  async function addToFavorites(event) {
    const clickedElement = event.target;
    const isLikeIcon = clickedElement.classList.contains("like-icon");

    if (isLikeIcon) {
      const selectedMovieId = clickedElement.getAttribute("data-imdb-id");

      const isAlreadyLiked = likedMovies.includes(selectedMovieId);

      if (!isAlreadyLiked) {
        clickedElement.classList.add("liked");
        likedMovies.push(selectedMovieId);

        try {
          const movieDetails = await fetchMovieDetails(selectedMovieId);
          createFavouriteCard(movieDetails, favoriteMoviesContainer);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      } else {
        console.log("Movie is already liked!");
      }
    }
  }
});