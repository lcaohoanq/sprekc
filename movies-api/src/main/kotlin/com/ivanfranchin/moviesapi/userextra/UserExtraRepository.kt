package com.ivanfranchin.moviesapi.userextra

import com.ivanfranchin.moviesapi.userextra.model.UserExtra
import org.springframework.data.jpa.repository.JpaRepository

interface UserExtraRepository : JpaRepository<UserExtra, String>
