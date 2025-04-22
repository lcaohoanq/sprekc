import React from 'react'

function FormStep({
  imdbId,
  title,
  director,
  year,
  poster,
  imdbIdError,
  titleError,
  directorError,
  yearError,
  handleChange,
}) {
  return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form>
          <div className="mb-4">
            <label htmlFor="imdbId" className="block text-sm font-medium text-gray-700">
              IMDB ID
            </label>
            <input
                type="text"
                id="imdbId"
                value={imdbId}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                    imdbIdError ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {imdbIdError && <p className="text-sm text-red-500 mt-1">{imdbIdError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                    titleError ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {titleError && <p className="text-sm text-red-500 mt-1">{titleError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="director" className="block text-sm font-medium text-gray-700">
              Director
            </label>
            <input
                type="text"
                id="director"
                value={director}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                    directorError ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {directorError && <p className="text-sm text-red-500 mt-1">{directorError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
                type="text"
                id="year"
                value={year}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                    yearError ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {yearError && <p className="text-sm text-red-500 mt-1">{yearError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="poster" className="block text-sm font-medium text-gray-700">
              Poster
            </label>
            <input
                type="text"
                id="poster"
                value={poster}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
  )
}

export default FormStep
