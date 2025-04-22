import React, { useState } from 'react'
import { handleLogError } from '../misc/Helpers'
import { moviesApi } from '../misc/MoviesApi'
import MovieCard from '../home/MovieCard'
import MovieComments from './MovieComments'
import MovieCommentForm from './MovieCommentForm'
import { useParams } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { useQuery, useQueryClient } from 'react-query'
import Loader from "../loading/LoadingScreen"

function MovieDetail() {
  const [commentText, setCommentText] = useState('')
  const { keycloak } = useKeycloak()
  const { id: imdbId } = useParams()
  const queryClient = useQueryClient()

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery(['movie', imdbId], () => moviesApi.getMovie(imdbId).then(res => res.data), {
    enabled: !!imdbId,
    onError: handleLogError,
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    if (id === 'commentText') {
      setCommentText(value)
    }
  }

  const handleAddComment = async () => {
    if (!commentText || !movie) return

    const comment = { text: commentText }
    try {
      await moviesApi.addMovieComment(movie.imdbId, comment, keycloak.token)
      setCommentText('')
      queryClient.invalidateQueries(['movie', imdbId])
    } catch (error) {
      handleLogError(error)
    }
  }

  if (isLoading) return <Loader />
  if (isError || !movie) return <p className="text-red-600">Error loading movie details.</p>

  return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Movie card on the left (1/3 width) */}
          <div className="md:col-span-1">
            <MovieCard movie={movie} link={false} />
          </div>

          {/* Comment form and comments on the right (2/3 width) */}
          <div className="md:col-span-2 space-y-6">
            <MovieCommentForm
                authenticated={keycloak.authenticated}
                commentText={commentText}
                handleAddComment={handleAddComment}
                handleChange={handleChange}
            />
            <MovieComments comments={movie.comments} />
          </div>
        </div>
      </div>
  )
}

export default MovieDetail
