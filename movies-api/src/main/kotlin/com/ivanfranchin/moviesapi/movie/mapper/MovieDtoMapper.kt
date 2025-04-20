package com.ivanfranchin.moviesapi.movie.mapper

import com.ivanfranchin.moviesapi.movie.dto.MovieDto
import com.ivanfranchin.moviesapi.movie.dto.MovieDto.CommentDto
import com.ivanfranchin.moviesapi.movie.model.Comment
import com.ivanfranchin.moviesapi.movie.model.Movie
import com.ivanfranchin.moviesapi.userextra.UserExtraService
import com.ivanfranchin.moviesapi.userextra.model.UserExtra
import org.springframework.stereotype.Component

@Component
class MovieDtoMapper(
    private val userExtraService: UserExtraService
) {

    fun toMovieDto(movie: Movie): MovieDto {
        val comments = movie.comments.stream()
            .map { comment: Comment -> this.toMovieDtoCommentDto(comment) }
            .toList()

        return MovieDto(
            movie.imdbId,
            movie.title,
            movie.director,
            movie.year,
            movie.poster,
            comments
        )
    }

    fun toMovieDtoCommentDto(comment: Comment): CommentDto {
        val username = comment.username
        val avatar = getAvatarForUser(username)
        val text = comment.text
        val timestamp = comment.timestamp

        return CommentDto(username, avatar, text, timestamp)
    }

    private fun getAvatarForUser(username: String): String? {
        return userExtraService.getUserExtra(username)
            .map(UserExtra::avatar)
            .orElse(username)
    }
}
