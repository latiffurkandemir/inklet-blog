package com.inklet.blog.blog_backend.configuration;

import com.inklet.blog.blog_backend.configuration.JwtAuthenticationFilter; // JWT filter import edilmeli
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // Constructor injection
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // disable csrf protection
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/signup",
                                "/api/auth/login",
                                "/api/blogs/create",
                                "/api/users/profile",
                                "/api/blogs/all",
                                "/api/blogs/delete/{id}",
                                "/api/users/update").permitAll() // permit these endpoints
                        .requestMatchers("/", "/error").permitAll()
                        .requestMatchers("/favicon.ico", "/actuator/mappings").permitAll()
                        .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll()
                        .anyRequest().authenticated() // authentication is needed for any other requests
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // added JWT filter

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
