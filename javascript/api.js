
export async function fetchMovieData(search) {
  const apiUrl = `https://www.omdbapi.com/?s=${search}&apikey=c22bbab0`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Search) {
      return data.Search;
    } else {
      throw new Error("No results found!");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchMovieDetails(imdbID) {
  const apiUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=c22bbab0`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Title) {
      return data;
    } else {
      throw new Error("No details found for the movie!");
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
} KeyboardEvent
