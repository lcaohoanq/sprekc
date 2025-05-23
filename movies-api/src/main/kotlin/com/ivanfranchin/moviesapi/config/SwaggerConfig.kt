package com.ivanfranchin.moviesapi.config

import io.swagger.v3.oas.models.Components
import io.swagger.v3.oas.models.ExternalDocumentation
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Contact
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.info.License
import io.swagger.v3.oas.models.security.SecurityScheme
import org.springdoc.core.models.GroupedOpenApi
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SwaggerConfig {

    @Value("\${spring.application.name}")
    private lateinit var applicationName: String

    @Bean
    fun customOpenAPI(): OpenAPI {
        return OpenAPI()
            .components(
                Components().addSecuritySchemes(
                    BEARER_KEY_SECURITY_SCHEME,
                    SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                )
            )
            .info(
                Info()
                    .title("Movies API Services")
                    .version("1.0.0")
                    .description("REST API documentation for My services")
                    .contact(
                        Contact()
                            .name("lcaohoanq")
                            .email("hoangclw@gmail.com")
                    )
                    .license(
                        License()
                            .name("Private License")
                    )
            )
            .externalDocs(
                ExternalDocumentation()
                    .description("API Documentation")
                    .url("https://your-docs-url.com")
            )
    }

    @Bean
    fun customApi(): GroupedOpenApi {
        return GroupedOpenApi.builder()
            .group("api")
            .pathsToMatch("/api/**")
            .build()
    }

    companion object {
        const val BEARER_KEY_SECURITY_SCHEME = "bearer-key"
    }
}
