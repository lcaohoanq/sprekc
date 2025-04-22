import React from 'react'

function SearchStep({
  searchText,
  isLoading,
  movies,
  selectedMovie,
  handleChange,
  handleSearchMovies,
  handleTableSelection,
}) {
  const movieList = movies
      ? movies.map((movie) => {
        const active = movie && selectedMovie && movie.imdbId === selectedMovie.imdbId
        return (
            <tr
                key={movie.imdbId}
                className={`cursor-pointer ${active ? 'bg-blue-100' : ''}`}
                onClick={() => handleTableSelection(movie)}
            >
              <td className="px-4 py-2">{movie.imdbId}</td>
              <td className="px-4 py-2">{movie.title}</td>
              <td className="px-4 py-2">{movie.director}</td>
              <td className="px-4 py-2">{movie.year}</td>
            </tr>
        )
      })
      : (
          <tr>
            <td className="px-4 py-2" colSpan="4"></td>
          </tr>
      )

  return (
      <div className={`p-6 rounded-lg shadow-md ${isLoading ? 'bg-gray-100' : ''}`}>
        <form onSubmit={handleSearchMovies} className="space-y-4">
          <div className="flex flex-wrap items-center space-x-4">
            <input
                type="text"
                id="searchText"
                value={searchText}
                onChange={handleChange}
                placeholder="Search for a movie title ..."
                className="w-full md:w-9/12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full md:w-3/12 p-3 bg-blue-500 text-white rounded-lg focus:outline-none disabled:bg-blue-300"
                disabled={searchText.trim() === ''}
            >
              Search
            </button>
          </div>
        </form>

        <table className="min-w-full table-auto mt-6 border-collapse">
          <thead>
          <tr>
            <th className="px-4 py-2 text-left border-b">ImdbID</th>
            <th className="px-4 py-2 text-left border-b">Title</th>
            <th className="px-4 py-2 text-left border-b">Director</th>
            <th className="px-4 py-2 text-left border-b">Year</th>
          </tr>
          </thead>
          <tbody>
          {movieList}
          </tbody>
        </table>
      </div>
  )
}

export default SearchStep
