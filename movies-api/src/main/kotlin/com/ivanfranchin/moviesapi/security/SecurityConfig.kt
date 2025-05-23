package com.ivanfranchin.moviesapi.security

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
class SecurityConfig(
    private val jwtAuthConverter: JwtAuthConverter,
    @Value("\${app.cors.allowed-origins}") private val listAllowedOrigins: List<String>
) {

    @Bean
    @Throws(Exception::class)
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        return http
            .cors { cors ->
                cors.configurationSource(corsConfigurationSource())
            }
            .authorizeHttpRequests {
                it
                    .requestMatchers(HttpMethod.GET, "/api/movies", "/api/movies/**").permitAll()
                    .requestMatchers("/api/movies/*/comments").hasAnyRole(MOVIES_ADMIN, MOVIES_USER)
                    .requestMatchers("/api/movies", "/api/movies/**").hasRole(MOVIES_ADMIN)
                    .requestMatchers("/api/userextras/me").hasAnyRole(MOVIES_ADMIN, MOVIES_USER)
                    .requestMatchers(
                        "/swagger-ui.html",
                        "/swagger-ui/**",
                        "/v3/api-docs",
                        "/v3/api-docs/**",
                        "/api/auth/**"
                    ).permitAll()
                    .anyRequest().authenticated()
            }
            .oauth2ResourceServer {
                it.jwt { jwt ->
                    jwt.jwtAuthenticationConverter(jwtAuthConverter)
                }
            }
            .sessionManagement {
                it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .csrf { it.disable() }
            .build()
    }

    companion object {
        const val MOVIES_ADMIN = "MOVIES_ADMIN"
        const val MOVIES_USER = "MOVIES_USER"
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {

        val configuration = CorsConfiguration().apply {
            allowCredentials = true
            this.allowedOrigins = listAllowedOrigins
            addAllowedMethod("*")
            addAllowedHeader("*")
            maxAge = 3600
        }

        return UrlBasedCorsConfigurationSource().apply {
            registerCorsConfiguration("/**", configuration)
        }
    }

}
