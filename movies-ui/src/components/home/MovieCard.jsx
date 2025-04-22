import React from 'react'
import { Link } from 'react-router-dom'

function MovieCard({ movie, link }) {
  const content = (
      <>
        <img
            src={movie.poster || '/images/movie-poster.jpg'}
            alt={movie.title}
            className="w-full h-auto object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
          <p className="text-sm mb-1">imdbID: <strong>{movie.imdbId}</strong></p>
          <p className="text-sm mb-1">Author: <strong>{movie.director}</strong></p>
          <p className="text-sm">Year: <strong>{movie.year}</strong></p>
        </div>
      </>
  )

  const Wrapper = link ? Link : 'div'
  const wrapperProps = link ? { to: `/movies/${movie.imdbId}` } : {}

  return (
      <Wrapper
          className="block border rounded-lg overflow-hidden text-center shadow-sm hover:shadow-md transition duration-200 bg-white text-black"
          {...wrapperProps}
      >
        {content}
      </Wrapper>
  )
}

export default MovieCard
