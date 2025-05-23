package com.ivanfranchin.moviesapi.movie

import com.ivanfranchin.moviesapi.movie.model.Movie
import org.springframework.data.jpa.repository.JpaRepository

interface MovieRepository : JpaRepository<Movie, String>
