import React from 'react'

function MoviesTable({ movies, handleDeleteMovie, handleEditMovie }) {
  const height = window.innerHeight - 100
  const style = {
    height: height,
    maxHeight: height,
    overflowY: 'auto',
    overflowX: 'hidden'
  }

  const movieList = movies && movies.map(movie => {
    return (
        <tr key={movie.imdbId} className="border-b">
          <td className="px-2 py-3">
            <button
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                onClick={() => handleDeleteMovie(movie)}
            >
              <i className="fas fa-trash"></i>
            </button>
            <button
                className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 ml-2"
                onClick={() => handleEditMovie(movie)}
            >
              <i className="fas fa-edit"></i>
            </button>
          </td>
          <td className="px-4 py-3">{movie.imdbId}</td>
          <td className="px-4 py-3">{movie.title}</td>
          <td className="px-4 py-3">{movie.director}</td>
          <td className="px-4 py-3">{movie.year}</td>
          <td className="px-4 py-3">
            <img
                className="w-16 h-16 object-cover rounded"
                src={movie.poster ? movie.poster : '/images/movie-poster.jpg'}
                alt="Movie Poster"
            />
          </td>
        </tr>
    )
  })

  return (
      <div style={style}>
        <table className="min-w-full bg-white border-collapse">
          <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Actions</th>
            <th className="px-4 py-2">ImdbID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Director</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">Poster</th>
          </tr>
          </thead>
          <tbody>
          {movieList}
          </tbody>
        </table>
      </div>
  )
}

export default MoviesTable
