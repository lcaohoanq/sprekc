import React, {useEffect, useState} from 'react'
import {handleLogError} from '../misc/Helpers'
import {moviesApi} from '../misc/MoviesApi'
import MovieList from './MovieList'
import Loader from "../loading/LoadingScreen";
import {useQuery} from "react-query";

function Home() {
  const {data: movies, isLoading, error} = useQuery({
    queryKey: "movies",
    queryFn: async () => {
      const response = await moviesApi.getMovies()
      return response.data
    },
  })

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    handleLogError(error)
    return (
        <Container>
          <h1>No movies found</h1>
        </Container>
    )
  }

  return (
      <Container>
        <MovieList movies={movies}/>
      </Container>
  )
}

export default Home
