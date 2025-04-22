import React, { useState } from 'react'
import { handleLogError } from '../misc/Helpers'
import { moviesApi } from '../misc/MoviesApi'
import MovieCard from '../home/MovieCard'
import MovieComments from './MovieComments'
import MovieCommentForm from './MovieCommentForm'
import { useParams } from 'react-router-dom'
import { useKeycloak } from '@react-keycloak/web'
import { useQuery, useQueryClient } from 'react-query'
import Loader from "../loading/LoadingScreen";

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
      // Refetch the movie to get updated comments
      queryClient.invalidateQueries(['movie', imdbId])
    } catch (error) {
      handleLogError(error)
    }
  }

  if (isLoading) return <Loader/>
  if (isError || !movie) return <p>Error loading movie details.</p>

  return (
      <Container>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <MovieCard movie={movie} link={false} />
            </Grid.Column>
            <Grid.Column width={11}>
              <MovieCommentForm
                  authenticated={keycloak.authenticated}
                  commentText={commentText}
                  handleAddComment={handleAddComment}
                  handleChange={handleChange}
              />
              <MovieComments comments={movie.comments} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
  )
}

export default MovieDetail
