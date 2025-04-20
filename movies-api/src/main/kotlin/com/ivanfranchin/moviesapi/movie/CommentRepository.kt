package com.ivanfranchin.moviesapi.movie

import com.ivanfranchin.moviesapi.movie.model.Comment
import org.springframework.data.jpa.repository.JpaRepository
import kotlin.jvm.internal.Ref.LongRef

interface CommentRepository: JpaRepository<Comment, Long> {
    fun findByMovieImdbId(imdbId: String): List<Comment>
}
