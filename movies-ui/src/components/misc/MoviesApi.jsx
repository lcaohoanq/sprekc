import axios from "axios";
import { config } from "../../Constants";

export const moviesApi = {
  getMovies,
  getMovie,
  saveMovie,
  deleteMovie,
  addMovieComment,
  getUserExtrasMe,
  saveUserExtrasMe,
};

function getMovies() {
  return instance.get("/movies");
}

function getMovie(imdbId) {
  return instance.get(`/movies/${imdbId}`);
}

function saveMovie(movie, token) {
  return instance.post("/movies", movie, {
    headers: { Authorization: bearerAuth(token) },
  });
}

function deleteMovie(imdbId, token) {
  return instance.delete(`/movies/${imdbId}`, {
    headers: { Authorization: bearerAuth(token) },
  });
}

function addMovieComment(imdbId, comment, token) {
  return instance.post(`/movies/${imdbId}/comments`, comment, {
    headers: { Authorization: bearerAuth(token) },
  });
}

function getUserExtrasMe(token) {
  return instance.get(`/userextras/me`, {
    headers: { Authorization: bearerAuth(token) },
  });
}

function saveUserExtrasMe(token, userExtra) {
  return instance.post(`/userextras/me`, userExtra, {
    headers: { Authorization: bearerAuth(token) },
  });
}

// -- Axios

const instance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    // Check if response exists before accessing its properties
    if (error.response && error.response.status === 404) {
      return { status: error.response.status };
    }
    // Return the error.response if it exists, otherwise return the error itself
    return Promise.reject(error.response || error);
  }
);
// -- Helper functions

function bearerAuth(token) {
  return `Bearer ${token}`;
}
