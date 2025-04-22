import React from 'react'
import MovieCard from './MovieCard'

function MovieList({ movies }) {
  const movieList = movies.map(movie => (
      <div key={movie.imdbId} className="movie-card-wrapper">
        <MovieCard movie={movie} link={true} />
      </div>
  ))

  return (
      movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movieList}
          </div>
      ) : (
          <div className="no-movies" style={{ padding: '2rem', border: '1px solid #2185d0', borderRadius: '8px', textAlign: 'center', color: '#2185d0' }}>
            <h4>No movies</h4>
          </div>
      )
  )
}

export default MovieList
