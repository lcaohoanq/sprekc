import React from 'react'
import MovieCard from '../home/MovieCard'

function CompleteStep({ movie }) {
  return (
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-6">
          <MovieCard movie={movie} link={false} />
        </div>
      </div>
  )
}

export default CompleteStep
