import React from 'react'

function MoviesForm({ form, handleChange, handleSaveMovie, clearForm }) {
  const inputClass = "w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  const errorClass = "text-sm text-red-500 mt-1"

  return (
      <form className="space-y-6">
        {/* ImdbID */}
        <div>
          <label htmlFor="imdbId" className="block font-medium mb-1">ImdbID *</label>
          <input
              id="imdbId"
              type="text"
              className={inputClass}
              value={form.imdbId}
              onChange={handleChange}
          />
          {form.imdbIdError && <div className={errorClass}>{form.imdbIdError}</div>}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">Title *</label>
          <input
              id="title"
              type="text"
              className={inputClass}
              value={form.title}
              onChange={handleChange}
          />
          {form.titleError && <div className={errorClass}>{form.titleError}</div>}
        </div>

        {/* Director */}
        <div>
          <label htmlFor="director" className="block font-medium mb-1">Director *</label>
          <input
              id="director"
              type="text"
              className={inputClass}
              value={form.director}
              onChange={handleChange}
          />
          {form.directorError && <div className={errorClass}>{form.directorError}</div>}
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block font-medium mb-1">Year *</label>
          <input
              id="year"
              type="text"
              className={inputClass}
              value={form.year}
              onChange={handleChange}
          />
          {form.yearError && <div className={errorClass}>{form.yearError}</div>}
        </div>

        {/* Poster */}
        <div>
          <label htmlFor="poster" className="block font-medium mb-1">Poster</label>
          <input
              id="poster"
              type="text"
              className={inputClass}
              value={form.poster}
              onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
              type="button"
              onClick={clearForm}
              className="w-1/2 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
              type="button"
              onClick={handleSaveMovie}
              className="w-1/2 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save
          </button>
        </div>
      </form>
  )
}

export default MoviesForm
